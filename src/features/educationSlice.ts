import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IEductionSlice, IOrderList } from "features/types/educationSliceType";

const initialState: IEductionSlice = {
  orderList: [],
  currentOrder: null,
  currentHintStep: 0,
  kioskTutorialHint: [
    { desc: "무공 돈까스를 클릭해주세요!", done: false },
    { desc: "무공 돈까스에 공깃밥을 추가해주세요!", done: false },
    { desc: "무공 돈까스를 하나 더 추가해주세요!", done: false },
    { desc: "결제 버튼을 클릭해주세요!", done: false },
    { desc: "", done: false }
  ]
};

export const educationSlice = createSlice({
  name: "education",
  initialState,
  reducers: {
    resetStore: state => {
      state.orderList = [];
      state.kioskTutorialHint = state.kioskTutorialHint.map(hint => {
        return { ...hint, done: false };
      });
      state.currentHintStep = 0;
    },
    setCurrentOrder: (state, action: PayloadAction<IOrderList>) => {
      state.currentOrder = action.payload;
    },
    addOrderList: (
      state,
      action: PayloadAction<{
        type: string;
        name: string;
        price: number;
        count: number;
        side?: { name: string; price: number }[];
      }>
    ) => {
      const index = state.orderList.findIndex(
        order => order.name === action.payload.name
      );

      if (index !== -1) {
        state.orderList[index].count++;
        state.orderList[index].totalPrice =
          state.orderList[index].count * state.orderList[index].price;
        return;
      }

      state.orderList.push({
        type: action.payload.type,
        count: 1,
        name: action.payload.name,
        totalPrice: action.payload.price,
        price: action.payload.price
      });
    },
    removeOrderList: (state, action: PayloadAction<string>) => {
      state.orderList = state.orderList.filter(
        order => order.name !== action.payload
      );
    },
    handleOrderCount: (
      state,
      action: PayloadAction<{ type: string; product: string }>
    ) => {
      const index = state.orderList.findIndex(
        order => order.name === action.payload.product
      );

      const currentOrder = state.orderList[index];

      if (!currentOrder.count && action.payload.type !== "add") return;
      currentOrder.count += action.payload.type === "add" ? 1 : -1;
      currentOrder.totalPrice = currentOrder.count * currentOrder.price;
    },
    resetOrderList: state => {
      state.orderList = [];
    },
    setKioskTutotialHint: (state, action: PayloadAction<number>) => {
      state.currentHintStep = action.payload;
      state.kioskTutorialHint[action.payload].done =
        !state.kioskTutorialHint[action.payload].done;
    }
  }
});

export const {
  resetStore,
  addOrderList,
  removeOrderList,
  handleOrderCount,
  resetOrderList,
  setCurrentOrder,
  setKioskTutotialHint
} = educationSlice.actions;

export default educationSlice.reducer;
