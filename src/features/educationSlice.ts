import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IEductionSlice } from "features/types/educationSliceType";

const initialState: IEductionSlice = {
  currentStep: 0
};

export const educationSlice = createSlice({
  name: "education",
  initialState,
  reducers: {
    resetStore: state => {
      state.currentStep = 0;
    },
    setCurrentStep: (state, action: PayloadAction<number>) => {
      state.currentStep = action.payload;
    }
  }
});

export const { setCurrentStep, resetStore } = educationSlice.actions;

export default educationSlice.reducer;
