import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { RootState } from "app/store";
import { setCurrentDate } from "features/kiosk/transportationKioskSlice";
import dayjs from "dayjs";

const useByTicket = () => {
  const dispatch = useDispatch();
  const { currentStep, currentDate } = useSelector(
    (state: RootState) => ({
      currentDate: state.transportationKiosk.currentDate,
      currentStep: state.transportationKiosk.currentStep
    }),
    shallowEqual
  );

  const handleCurrentDate = () => {
    dispatch(setCurrentDate(dayjs().format("YYYY-MM-DD (ddd) HH:mm")));
  };

  return {
    currentStep,
    currentDate,
    handleCurrentDate
  };
};

export default useByTicket;
