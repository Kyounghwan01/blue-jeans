import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  IMovie,
  ICurrentMovie,
  IMovieSeats,
} from "features/types/movieSliceType";
import { MovieSeats } from "utils/constants";

const initialState: IMovie = {
  currentStep: 0,
  isViewTotalMovie: false,
  isReservation: false,
  seatsInfo: [],
  totalPrice: 0,
  seats: MovieSeats || [],
  movie: {
    id: 16,
    title: "청춘을 사랑합니다",
    startAt: "24:00",
    endAt: "26:00",
    img: "",
    lastSeats: 80,
    grade: 19,
  },
};

export const movieKioskSlice = createSlice({
  name: "movieSlice",
  initialState,
  reducers: {
    setCurrentStep: (state, action: PayloadAction<number>) => {
      state.currentStep = action.payload;
    },
    setIsViewTotalMovie: (
      state,
      action: PayloadAction<{
        type: "isViewTotalMovie" | "isReservation";
        value: boolean;
      }>
    ) => {
      state[action.payload.type] = action.payload.value;
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
    },
    setSeats: (state, action: PayloadAction<number>) => {
      state.seats[action.payload].isSelected =
        !state.seats[action.payload].isSelected;
    },
    resetSeats: (state) => {
      state.seats = MovieSeats;
    },
  },
});

const switchMoviePrice = (
  type: "adult" | "children" | "disabled" | "older"
) => {
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
  setSeatInfo,
  setSeats,
  resetSeats,
} = movieKioskSlice.actions;

export default movieKioskSlice.reducer;
