import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICommonSlice, fontSizeType } from "features/types/commonSliceType";

const initialState: ICommonSlice = {
  kakao: null,
  fontSizeType: "middle",
  naver: null,
  currentDate: "",
  currentTime: ""
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
    },
    setCurrentDate: (
      state,
      action: PayloadAction<
        {
          type: "currentDate" | "currentTime";
          value: string;
        }[]
      >
    ) => {
      action.payload.forEach(payload => {
        console.log(payload);
        state[payload.type] = payload.value;
      });
    }
  }
});

export const { setKakao, setFontSizeType, setCurrentDate } =
  commonSlice.actions;

export default commonSlice.reducer;
