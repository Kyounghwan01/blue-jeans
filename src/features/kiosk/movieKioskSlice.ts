import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  IMovie,
  ICurrentMovie,
  IMovieSeats
} from "features/types/movieSliceType";

const initialState: IMovie = {
  currentStep: 0,
  isViewTotalMovie: false,
  isReservation: false,
  seatsInfo: [],
  totalInfo: { price: 0, seat: 0 },
  seats: [],
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
        state.totalInfo = { price: 0, seat: 0 };
        return;
      }

      state.seatsInfo = action.payload;
      state.totalInfo = action.payload.reduce(
        (acc, cur) => {
          return {
            price: acc.price + switchMoviePrice(cur.type) * cur.count,
            seat: acc.seat + cur.count
          };
        },
        { price: 0, seat: 0 }
      );
    },
    setSeats: (state, action: PayloadAction<number>) => {
      state.seats[action.payload].isSelected =
        !state.seats[action.payload].isSelected;
    },
    setLastedSeats: (state, action) => {
      state.seats = action.payload;
    }
  }
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
  setLastedSeats
} = movieKioskSlice.actions;

export default movieKioskSlice.reducer;
