import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { QnaSliceStateType, QnaType } from "features/types/qnaSliceType";

const init = {
  id: "1",
  userId: 1,
  content: "",
  imgUrl: [],
  status: "pending",
  timestamp: "2021-12-29",
  title: "",
  type: "user-info",
  comment: null
} as QnaType;

const initialState: QnaSliceStateType = {
  list: [],
  qna: init,
  answerList: [],
  answer: init,
  tab: 0
};

export const qnaSlice = createSlice({
  name: "qna",
  initialState,
  reducers: {
    resetQnaList: state => {
      state.list = [];
      console.log(state.list);
    },
    getQnaList: (state, action: PayloadAction<QnaType[]>) => {
      state.list = action.payload;
    },
    setQna: (state, action: PayloadAction<QnaType>) => {
      state.qna = action.payload;
    },
    getAnswerList: (state, action: PayloadAction<QnaType[]>) => {
      state.answerList = action.payload;
    },
    setTab: (state, action: PayloadAction<number>) => {
      state.tab = action.payload;
    }
  }
});

export const { resetQnaList, getQnaList, setQna, getAnswerList, setTab } =
  qnaSlice.actions;

export default qnaSlice.reducer;
