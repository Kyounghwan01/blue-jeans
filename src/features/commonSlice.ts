import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICommonSlice, fontSizeType } from "features/types/commonSliceType";

const initialState: ICommonSlice = {
  kakao: null,
  fontSizeType: "middle"
};

export const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    setKakao: (state, action: PayloadAction<any>) => {
      state.kakao = action.payload;
    },
    setFontSizeType: (state, action: PayloadAction<fontSizeType>) => {
      state.fontSizeType = action.payload;
      window.localStorage.setItem("font-size", action.payload);
    }
  }
});

export const { setKakao, setFontSizeType } = commonSlice.actions;

export default commonSlice.reducer;
