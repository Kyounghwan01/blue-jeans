import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  ITransportation,
  ITicket,
  busSeatType
} from "features/types/transportationKioskSliceType";
import dayjs from "dayjs";

const initialState: ITransportation = {
  currentStep: 0,
  currentDate: "",
  location: "",
  startTime: "",
  selectedSeats: [],
  currentSeat: { seat: 0, personType: "adult", price: 10000 },
  totalPrice: 0,
  ticket: {
    id: 0,
    grade: "common",
    company: "",
    lastSeat: 0,
    startAt: "",
    type: "직",
    time: 0
  },
  seats: []
};

export const transportationKioskSlice = createSlice({
  name: "transportationKiosk",
  initialState,
  reducers: {
    resetStore: state => {
      state.currentStep = 0;
    },
    setCurrentStep: (state, action: PayloadAction<number>) => {
      state.currentStep = action.payload;
    },
    setData: (
      state,
      action: PayloadAction<{
        key: "location" | "startTime";
        value: string;
      }>
    ) => {
      state[action.payload.key] = action.payload.value;
    },
    setCurrentDate: (
      state,
      action: PayloadAction<{ type: "current" | "prev" | "next" }>
    ) => {
      let curDate = state.currentDate;
      const dateFormat = "YYYY-MM-DD (ddd) HH:mm";
      const nowDate = dayjs().format(dateFormat);

      if (action.payload.type === "current") {
        curDate = nowDate;
      } else if (action.payload.type === "prev") {
        curDate = dayjs(state.currentDate, dateFormat)
          .subtract(1, "day")
          .format("YYYY-MM-DD (ddd) 00:00");

        const diffDate = curDate.split(" ")[0] < nowDate.split(" ")[0];

        if (diffDate) {
          return;
        } else if (curDate.split(" ")[0] === nowDate.split(" ")[0]) {
          curDate = nowDate;
        }
      } else {
        curDate = dayjs(state.currentDate, dateFormat)
          .add(1, "day")
          .format("YYYY-MM-DD (ddd) 00:00");
      }

      state.currentDate = curDate;
    },
    setBusTime: (state, action: PayloadAction<ITicket>) => {
      state.ticket = action.payload;
    },
    setSeats: (state, action: PayloadAction<busSeatType[]>) => {
      state.seats = action.payload;
    },
    setCurrentSeat: (
      state,
      action: PayloadAction<{
        type: "seat" | "personType" | "price";
        value: string | number;
      }>
    ) => {
      state.currentSeat = {
        ...state.currentSeat,
        [action.payload.type]: action.payload.value
      };

      if (action.payload.type === "price") {
        const index = state.seats.findIndex(
          seat => seat.value === state.currentSeat.seat
        );
        state.seats[index].type = "selected";
        state.selectedSeats.push(state.currentSeat);
        state.totalPrice += Number(action.payload.value);
      }
    },
    resetSelectedSeats: state => {
      state.currentSeat = { seat: 0, personType: "adult", price: 10000 };
      state.totalPrice = 0;
      state.selectedSeats = [];
    }
  }
});

export const {
  resetStore,
  setCurrentStep,
  setData,
  setCurrentDate,
  setBusTime,
  setCurrentSeat,
  setSeats,
  resetSelectedSeats
} = transportationKioskSlice.actions;

export default transportationKioskSlice.reducer;
