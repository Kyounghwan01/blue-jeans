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
  orderList: IOrderList[];
  currentOrder: IOrderList | null;
  currentHintStep: number;
}

export interface IMenu {
  type: string;
  name: string;
  price: number;
  desc: string;
  img: string;
  side?: {
    name: string;
    price: number;
    img?: string;
  }[];
}
