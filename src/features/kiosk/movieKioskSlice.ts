import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IMovie } from "features/types/movieSliceType";

const initialState: IMovie = {
  currentStep: 0,
  seats: []
};

export const movieKioskSlice = createSlice({
  name: "movieSlice",
  initialState,
  reducers: {
    setCurrentStep: (state, action: PayloadAction<number>) => {
      state.currentStep = action.payload;
    }
  }
});

export const { setCurrentStep } = movieKioskSlice.actions;

export default movieKioskSlice.reducer;
