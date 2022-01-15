export interface IOrderList {
  type: string;
  count: number;
  name: string;
  price: number;
  totalPrice: number;
  desc?: string;
  side?: {
    name: string;
    price: number;
    img?: string;
    checked?: boolean;
  }[];
}
export interface IEductionSlice {
  currentStep: number;
  orderList: IOrderList[];
  currentOrder: IOrderList | null;
}
