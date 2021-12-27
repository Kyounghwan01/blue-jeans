import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICommonSlice } from "features/types/commonSliceType";

const initialState: ICommonSlice = {
  kakao: null,
};

export const boardSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    setKakao: (state, action: PayloadAction<any>) => {
      state.kakao = action.payload;
    },
  },
});

export const { setKakao } = boardSlice.actions;

export default boardSlice.reducer;
