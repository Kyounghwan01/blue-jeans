import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IEductionSlice, IOrderList } from "features/types/educationSliceType";

const initialState: IEductionSlice = {
  orderList: [],
  currentOrder: null,
  currentHintStep: 0
};

export const educationSlice = createSlice({
  name: "education",
  initialState,
  reducers: {
    resetStore: state => {
      state.orderList = [];
      state.currentHintStep = 0;
    },
    setCurrentHintStep: (state, action: PayloadAction<number>) => {
      state.currentHintStep = action.payload;
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
    }
  }
});

export const {
  resetStore,
  addOrderList,
  removeOrderList,
  handleOrderCount,
  resetOrderList,
  setCurrentHintStep,
  setCurrentOrder
} = educationSlice.actions;

export default educationSlice.reducer;
