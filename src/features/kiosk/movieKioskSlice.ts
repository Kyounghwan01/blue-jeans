import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  IMovie,
  ICurrentMovie,
  IMovieSeats
} from "features/types/movieSliceType";

const initialState: IMovie = {
  currentStep: 0,
  isViewTotalMovie: false,
  seatsInfo: [],
  totalPrice: 0,
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
    setSeatInfo: (state, action: PayloadAction<IMovieSeats[]>) => {
      if (!action.payload.length) {
        state.seatsInfo = [];
        state.totalPrice = 0;
        return;
      }

      state.seatsInfo = action.payload;
      state.totalPrice =
        switchMoviePrice(action.payload[0].type) * action.payload.length;
    }
  }
});

const switchMoviePrice = (type: string) => {
  switch (type) {
    case "adult":
      return 14000;
    case "children":
      return 10000;
    case "disabled":
      return 5000;
    default:
      return 6000;
  }
};

export const {
  setCurrentStep,
  setIsViewTotalMovie,
  setSelectMovie,
  setSeatInfo
} = movieKioskSlice.actions;

export default movieKioskSlice.reducer;
