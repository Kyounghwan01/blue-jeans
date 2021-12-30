export type QnaType = {
  id: number;
  content: string;
  imgUrl: string[];
  statue: "pending" | "finish" | "doing";
  timestamp: string;
  title: string;
  type: string;
  comment: number[];
};

export type QnaSliceStateType = {
  list: QnaType[];
};
