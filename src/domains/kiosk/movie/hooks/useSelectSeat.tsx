import { useEffect, useMemo, useCallback } from "react";
import { useDispatch } from "react-redux";
import { IComponentRoute } from "features/types/commonSliceType";
import {
  setSeatInfo,
  setSeats,
  setLastedSeats
} from "features/kiosk/movieKioskSlice";
import usePopup from "hooks/usePopup";
import { IMovieSeats } from "features/types/movieSliceType";
import useSelectorTyped from "features/useSelectorTyped";
import { MovieSeats } from "utils/constants";
import { cloneDeep } from "lodash";

const useSelectSeat = ({ back }: IComponentRoute) => {
  const { handleDomainPopup } = usePopup();
  const dispatch = useDispatch();
  const { seats, totalInfo, movie } = useSelectorTyped(state => ({
    seats: state.movieKiosk.seats,
    totalInfo: state.movieKiosk.totalInfo,
    movie: state.movieKiosk.movie
  }));

  const handleRandomSeat = () => {
    const randomIndexArray = [];
    const totalSeats = 40;
    for (let i = 0; i < totalSeats - movie.lastSeats; i++) {
      const randomNum = Math.floor(Math.random() * (MovieSeats.length - 1) + 1);
      if (
        randomIndexArray.indexOf(randomNum) === -1 &&
        !MovieSeats[randomNum].alerdySeated
      ) {
        randomIndexArray.push(randomNum);
      } else {
        i--;
      }
    }
    const newSeats = cloneDeep(MovieSeats);
    randomIndexArray.forEach(randomSeated => {
      newSeats[randomSeated].alerdySeated = true;
    });
    dispatch(setLastedSeats(newSeats));
  };

  useEffect(() => {
    handleRandomSeat();
    dispatch(setSeatInfo([]));

    handleDomainPopup(
      `kiosk/movie/components/SelectSeat/pop/SelectSeatsNumPop`,
      "",
      {
        onClose: {
          cancel: back,
          confirm: (seat: IMovieSeats[]) => dispatch(setSeatInfo(seat)),
          lastSeats: movie.lastSeats
        }
      }
    );
  }, []);

  const mapOnlySeatNumber = useMemo(() => {
    return seats.filter(seat => seat.isSelected).length;
  }, [seats]);

  const disabledNextBtn = useMemo(() => {
    return mapOnlySeatNumber === totalInfo.seat;
  }, [mapOnlySeatNumber, totalInfo]);

  const handleSetSeat = useCallback(
    (seatNumber: number | string, alerdySeated: boolean) => {
      if (!seatNumber || alerdySeated) return;

      const res = seats.findIndex(el => el.value === seatNumber);

      if (disabledNextBtn && !seats[res].isSelected) {
        return;
      }
      dispatch(setSeats(res));
    },
    [seats, disabledNextBtn]
  );

  const handleSeatColor = useCallback(
    seat => {
      return {
        border: typeof seat.label === "number" ? "1px solid gray" : "none",
        background:
          typeof seat.label === "number" && seat.alerdySeated
            ? "gray"
            : seat.isSelected
            ? "red"
            : typeof seat.label === "number" && disabledNextBtn
            ? "gray"
            : "white"
      };
    },
    [disabledNextBtn]
  );

  return {
    seats,
    handleSetSeat,
    totalInfo,
    disabledNextBtn,
    handleSeatColor
  };
};

export default useSelectSeat;
