import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  ITransportation,
  ITicket
} from "features/types/transportationKioskSliceType";
import dayjs from "dayjs";

const initialState: ITransportation = {
  currentStep: 0,
  currentDate: "",
  location: "",
  startTime: "",
  seats: [],
  price: 0,
  ticket: {
    id: 0,
    grade: "common",
    company: "",
    lastSeat: 0,
    startAt: "",
    type: "직",
    time: 0
  }
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
    }
  }
});

export const {
  resetStore,
  setCurrentStep,
  setData,
  setCurrentDate,
  setBusTime
} = transportationKioskSlice.actions;

export default transportationKioskSlice.reducer;
