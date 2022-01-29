import { useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { RootState } from "app/store";
import {
  setCurrentSeat,
  setSeats,
  resetSelectedSeats
} from "features/kiosk/transportationKioskSlice";
import { busSeatType } from "features/types/transportationKioskSliceType";

const busSeats = [
  "empty",
  "운전",
  "empty",
  "출입",
  1,
  2,
  "empty",
  3,
  4,
  5,
  "empty",
  6,
  7,
  8,
  "empty",
  9,
  10,
  11,
  "empty",
  12,
  13,
  14,
  "empty",
  15,
  16,
  17,
  18,
  19
];

const useSeats = ({ next }: { next: () => Promise<boolean> }) => {
  const dispatch = useDispatch();
  const { currentStep, ticket, seats, totalPrice } = useSelector(
    (state: RootState) => ({
      currentStep: state.transportationKiosk.currentStep,
      ticket: state.transportationKiosk.ticket,
      seats: state.transportationKiosk.seats,
      totalPrice: state.transportationKiosk.totalPrice
    }),
    shallowEqual
  );
  const [isSelected, setIsSelected] = useState<boolean>(false);

  useEffect(() => {
    dispatch(resetSelectedSeats());

    const randomSeatArr = getRamdomSeat(ticket.lastSeat - 1);
    const seat = [] as busSeatType[];

    busSeats.forEach(seatArr => {
      seat.push({
        type:
          seatArr === "empty"
            ? "empty"
            : typeof seatArr !== "number"
            ? "inactive"
            : randomSeatArr.includes(seatArr)
            ? "active"
            : "inactive",
        value: seatArr
      });
    });

    dispatch(setSeats(seat));
  }, []);

  const clickSeat = (seat: busSeatType) => {
    if (seat.type !== "active") {
      return;
    }
    dispatch(setCurrentSeat({ type: "seat", value: seat.value }));
    setIsSelected(true);
  };

  const clickPersonType = (type: string) => {
    dispatch(setCurrentSeat({ type: "personType", value: type }));
    dispatch(
      setCurrentSeat({
        type: "price",
        value:
          type === "adult"
            ? 10000
            : type === "child"
            ? 8000
            : type === "kid"
            ? 6000
            : 3000
      })
    );
    setIsSelected(false);
  };

  const getRamdomSeat = useCallback((selectingNumber: number) => {
    const randomIndexArray = [12];
    for (let i = 0; i < selectingNumber; i++) {
      const randomNum = Math.floor(Math.random() * (19 - 1) + 1);
      if (randomIndexArray.indexOf(randomNum) === -1) {
        randomIndexArray.push(randomNum);
      } else {
        i--;
      }
    }
    return randomIndexArray;
  }, []);

  return {
    ticket,
    seats,
    clickSeat,
    isSelected,
    setIsSelected,
    clickPersonType,
    totalPrice
  };
};

export default useSeats;
