export type BoardType = {
  registered_at: string;
  name: string;
  title: string;
  description: string;
  isScret: boolean;
  password?: number;
};

export type QnaSearchType = {
  option: "title" | "name";
  keyword: string;
};

export type BoardSliceStateType = {
  data: BoardType;
  qnaList: BoardType[];
  page: {
    page: number;
    totalElement: number;
  };
};
