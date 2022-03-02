import { useCallback, useMemo } from "react";
import { useDispatch } from "react-redux";
import useSelectorTyped from "features/useSelectorTyped";
import { busTimeList } from "utils/constants";
import {
  setCurrentDate,
  setBusTime,
} from "features/kiosk/transportationKioskSlice";
import dayjs from "dayjs";

const useSelectTime = ({ next }: { next: () => Promise<boolean> }) => {
  const dispatch = useDispatch();
  const { currentStep, currentDate } = useSelectorTyped((state) => ({
    currentDate: state.transportationKiosk.currentDate,
    currentStep: state.transportationKiosk.currentStep,
  }));

  const handleCurrentDate = useCallback(
    ({ type }: { type: "current" | "prev" | "next" }) => {
      dispatch(setCurrentDate({ type }));
    },
    []
  );

  const handleStartTime = useCallback((timeId: number) => {
    dispatch(setBusTime(busTimeList[timeId - 1]));
    next();
  }, []);

  const timeList = useMemo(() => {
    const currentTime = dayjs(currentDate, "YYYY-MM-DD (ddd) HH:mm").format(
      "HH:mm"
    );
    return busTimeList.filter((list) => list.startAt > currentTime);
  }, [currentDate]);

  return {
    currentStep,
    currentDate,
    handleCurrentDate,
    handleStartTime,
    timeList,
  };
};

export default useSelectTime;
