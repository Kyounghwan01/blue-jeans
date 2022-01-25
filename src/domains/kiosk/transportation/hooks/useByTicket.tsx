import { ChangeEvent, useEffect, useState, useCallback, useMemo } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { RootState } from "app/store";
import { setData } from "features/kiosk/transportationKioskSlice";
import { terminals, locations, word } from "utils/constants";
import dayjs from "dayjs";

const useByTicket = ({ next }: { next: () => Promise<boolean> }) => {
  const dispatch = useDispatch();
  const { currentStep, currentDate } = useSelector(
    (state: RootState) => ({
      currentDate: state.transportationKiosk.currentDate,
      currentStep: state.transportationKiosk.currentStep
    }),
    shallowEqual
  );

  const [locationCondition, setLocationCondition] = useState<{
    [index: string]: string;
  }>({
    word: "",
    location: "",
    keyword: ""
  });

  const handleSearch = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const keyword = e.currentTarget.value;
    setLocationCondition(prev => {
      return { ...prev, keyword };
    });
  }, []);

  const handleCurrentDate = useCallback(
    ({ type }: { type: "current" | "prev" | "next" }) => {
      let curDate = currentDate;
      const dateFormat = "YYYY-MM-DD (ddd) HH:mm";
      const nowDate = dayjs().format(dateFormat);

      if (type === "current") {
        curDate = nowDate;
      } else if (type === "prev") {
        curDate = dayjs(currentDate, dateFormat)
          .subtract(1, "day")
          .format("YYYY-MM-DD (ddd) 00:00");

        const diffDate = curDate.split(" ")[0] < nowDate.split(" ")[0];

        if (diffDate) {
          return;
        } else if (curDate.split(" ")[0] === nowDate.split(" ")[0]) {
          curDate = nowDate;
        }
      } else {
        curDate = dayjs(currentDate, dateFormat)
          .add(1, "day")
          .format("YYYY-MM-DD (ddd) 00:00");
      }

      dispatch(
        setData({
          key: "currentDate",
          value: curDate
        })
      );
    },
    [currentDate]
  );

  const searchLocation = useMemo(() => {
    const allLocationConditionCheck = ["", "전체"].includes(
      locationCondition.location
    );

    if (
      allLocationConditionCheck &&
      !locationCondition.keyword &&
      !locationCondition.word
    ) {
      return terminals;
    }

    const conditions = {
      location: !allLocationConditionCheck,
      word: !!locationCondition.word,
      keyword: !!locationCondition.keyword
    };

    return terminals.filter(terminal => {
      const result: boolean[] = [];
      Object.entries(conditions).forEach(([k, v]) => {
        if (v) {
          if (k === "keyword") {
            result.push(terminal.label.includes(locationCondition.keyword));
          } else {
            result.push(
              locationCondition[k] === terminal[k as "location" | "word"]
            );
          }

          // if (k === "location") {
          //   result.push(locationCondition[k] === terminal.location);
          // } else if (k === "word") {
          //   result.push(locationCondition[k] === terminal.word);
          // } else {
          //   result.push(terminal.label.includes(locationCondition.keyword));
          // }
        } else {
          result.push(true);
        }
      });
      return result.every(res => res);
    });
  }, [locationCondition]);

  const handleCondition = useCallback((type, word) => {
    if (type === "location" && word === "전체") {
      return setLocationCondition({ word: "", location: "", keyword: "" });
    }

    // if (type === "location" && word === "전체") {
    //   return setLocationCondition({ word: "", location: "", keyword: "" });
    // }
    if (word === "양양") {
      dispatch(setData({ key: "location", value: word }));
      next();
    }
    // todo: 양양 누르면 다음 스텝 이동, 뒤돌아오면 location 초기화

    setLocationCondition(prev => {
      return { ...prev, [type]: word };
    });
  }, []);

  return {
    currentStep,
    currentDate,
    handleCurrentDate,
    locationCondition,
    searchLocation,
    handleCondition,
    handleSearch
  };
};

export default useByTicket;
