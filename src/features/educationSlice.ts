import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IEductionSlice } from "features/types/educationSliceType";

const initialState: IEductionSlice = {
  currentStep: 0,
  orderList: [],
};

export const educationSlice = createSlice({
  name: "education",
  initialState,
  reducers: {
    resetStore: (state) => {
      state.currentStep = 0;
    },
    setCurrentStep: (state, action: PayloadAction<number>) => {
      state.currentStep = action.payload;
    },
    addOrderList: (
      state,
      action: PayloadAction<{
        type: string;
        name: string;
        price: number;
        count: number;
      }>
    ) => {
      if (
        state.orderList.findIndex(
          (order) => order.name === action.payload.name
        ) !== -1
      ) {
        return;
      }

      state.orderList.push({
        type: action.payload.type,
        count: 1,
        name: action.payload.name,
        totalPrice: action.payload.price,
        price: action.payload.price,
      });
    },
    removeOrderList: (state, action: PayloadAction<string>) => {
      state.orderList = state.orderList.filter(
        (order) => order.name !== action.payload
      );
    },
    handleOrderCount: (
      state,
      action: PayloadAction<{ type: string; product: string }>
    ) => {
      const index = state.orderList.findIndex(
        (order) => order.name === action.payload.product
      );

      const currentOrder = state.orderList[index];

      if (!currentOrder.count && action.payload.type !== "add") return;
      currentOrder.count += action.payload.type === "add" ? 1 : -1;
      currentOrder.totalPrice = currentOrder.count * currentOrder.price;
    },
  },
});

export const {
  setCurrentStep,
  resetStore,
  addOrderList,
  removeOrderList,
  handleOrderCount,
} = educationSlice.actions;

export default educationSlice.reducer;
