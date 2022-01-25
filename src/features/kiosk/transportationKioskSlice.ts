import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITransportation } from "features/types/transportationKioskSliceType";

const initialState: ITransportation = {
  currentStep: 0,
  currentDate: "",
  location: "",
  startTime: "",
  seats: [],
  price: 0
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
        key: "currentDate" | "location" | "startTime";
        value: string;
      }>
    ) => {
      state[action.payload.key] = action.payload.value;
    }
  }
});

export const { resetStore, setCurrentStep, setData } =
  transportationKioskSlice.actions;

export default transportationKioskSlice.reducer;
