import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { QnaSliceStateType, QnaType } from "features/types/qnaSliceType";

const initialState: QnaSliceStateType = {
  list: [
    // {
    //   id: 1,
    //   content: "",
    //   imgUrl: [],
    //   statue: "pending",
    //   timestamp: "2021-12-29",
    //   title: "",
    //   type: "user-info",
    //   comment: []
    // }
  ]
};

export const qnaSlice = createSlice({
  name: "qna",
  initialState,
  reducers: {
    getQnaList: (state, action: PayloadAction<QnaType[]>) => {
      state.list = action.payload;
    }
  }
});

export const { getQnaList } = qnaSlice.actions;

export default qnaSlice.reducer;
