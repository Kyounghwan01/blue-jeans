export type QnaType = {
  id: string;
  userId: number;
  content: string;
  imgUrl: string[];
  status: "pending" | "finish" | "doing";
  timestamp: string;
  title: string;
  type: string;
  comment: { data: string; timestamp: string } | null;
};

export type QnaSliceStateType = {
  list: QnaType[];
  qna: QnaType;
  answerList: QnaType[];
  answer: QnaType;
  tab: number;
};
