import { useEffect, useMemo, useCallback } from "react";
import { useDispatch } from "react-redux";
import { IComponentRoute } from "features/types/commonSliceType";
import {
  setSeatInfo,
  setSeats,
  resetSeats
} from "features/kiosk/movieKioskSlice";
import usePopup from "hooks/usePopup";
import { IMovieSeats } from "features/types/movieSliceType";
import useSelectorTyped from "features/useSelectorTyped";

const useSelectSeat = ({ back }: IComponentRoute) => {
  const { handleDomainPopup } = usePopup();
  const dispatch = useDispatch();
  const { seats, totalPrice, seatsInfo } = useSelectorTyped(state => ({
    seats: state.movieKiosk.seats,
    totalPrice: state.movieKiosk.totalPrice,
    seatsInfo: state.movieKiosk.seatsInfo
  }));

  useEffect(() => {
    dispatch(setSeatInfo([]));
    dispatch(resetSeats());

    handleDomainPopup(
      `kiosk/movie/components/SelectSeat/pop/SelectSeatsNumPop`,
      "",
      {
        onClose: {
          cancel: back,
          confirm: (seat: IMovieSeats[]) => dispatch(setSeatInfo(seat))
        }
      }
    );
  }, []);

  const mapOnlySeatNumber = useMemo(() => {
    return seats.filter(seat => seat.isSelected).length;
  }, [seats]);

  const disabledNextBtn = useMemo(() => {
    return mapOnlySeatNumber === seatsInfo.length;
  }, [seats, seatsInfo]);

  const handleSetSeat = useCallback(
    (seatNumber: number | string) => {
      if (!seatNumber) return;

      const res = seats.findIndex(el => el.value === seatNumber);

      if (disabledNextBtn && !seats[res].isSelected) {
        return;
      }
      dispatch(setSeats(res));
    },
    [seats, disabledNextBtn]
  );

  return {
    seats,
    handleSetSeat,
    totalPrice,
    disabledNextBtn
  };
};

export default useSelectSeat;
