export interface IEductionSlice {
  currentStep: number;
  orderList: {
    type: string;
    count: number;
    name: string;
    price: number;
    totalPrice: number;
    side?: {
      count: number;
      name: string;
      price: number;
      totalPrice: number;
    }[];
  }[];
}
