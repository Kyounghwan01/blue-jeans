import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IMovie, ICurrentMovie } from "features/types/movieSliceType";

const initialState: IMovie = {
  currentStep: 0,
  isViewTotalMovie: false,
  seatsInfo: [],
  movie: {
    id: 16,
    title: "청춘을 사랑합니다",
    startAt: "24:00",
    endAt: "26:00",
    img: "",
    lastSeats: 80,
    grade: 19
  }
};

export const movieKioskSlice = createSlice({
  name: "movieSlice",
  initialState,
  reducers: {
    setCurrentStep: (state, action: PayloadAction<number>) => {
      state.currentStep = action.payload;
    },
    setIsViewTotalMovie: (state, action: PayloadAction<boolean>) => {
      state.isViewTotalMovie = action.payload;
    },
    setSelectMovie: (state, action: PayloadAction<ICurrentMovie>) => {
      state.movie = action.payload;
    },
    setSeatInfo: (state, action) => {
      state.seatsInfo = action.payload;
    }
  }
});

export const {
  setCurrentStep,
  setIsViewTotalMovie,
  setSelectMovie,
  setSeatInfo
} = movieKioskSlice.actions;

export default movieKioskSlice.reducer;
