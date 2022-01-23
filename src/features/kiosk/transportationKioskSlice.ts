import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITransportation } from "features/types/transportationKioskSliceType";

const initialState: ITransportation = {
  currentStep: 0,
  currentDate: ""
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
    setCurrentDate: (state, action: PayloadAction<string>) => {
      state.currentDate = action.payload;
    }
  }
});

export const { resetStore, setCurrentStep, setCurrentDate } =
  transportationKioskSlice.actions;

export default transportationKioskSlice.reducer;
