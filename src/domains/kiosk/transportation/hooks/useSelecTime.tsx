import { useCallback, useMemo } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { RootState } from "app/store";
import { busTimeList } from "utils/constants";
import {
  setCurrentDate,
  setBusTime
} from "features/kiosk/transportationKioskSlice";
import dayjs from "dayjs";

const useSelectTime = ({ next }: { next: () => Promise<boolean> }) => {
  const dispatch = useDispatch();
  const { currentStep, currentDate } = useSelector(
    (state: RootState) => ({
      currentDate: state.transportationKiosk.currentDate,
      currentStep: state.transportationKiosk.currentStep
    }),
    shallowEqual
  );

  const handleCurrentDate = useCallback(
    ({ type }: { type: "current" | "prev" | "next" }) => {
      dispatch(setCurrentDate({ type }));
    },
    []
  );

  const handleStartTime = useCallback((timeId: number) => {
    dispatch(setBusTime(busTimeList[timeId]));
    next();
  }, []);

  const timeList = useMemo(() => {
    const currentTime = dayjs(currentDate, "YYYY-MM-DD (ddd) HH:mm").format(
      "HH:mm"
    );
    return busTimeList.filter(list => list.startAt > currentTime);
  }, [currentDate]);

  return {
    currentStep,
    currentDate,
    handleCurrentDate,
    handleStartTime,
    timeList
  };
};

export default useSelectTime;
