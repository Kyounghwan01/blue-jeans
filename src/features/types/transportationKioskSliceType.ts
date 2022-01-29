export interface ITicket {
  id: number;
  grade: "common" | "top";
  company: string;
  lastSeat: number;
  startAt: string;
  type: "직" | "경";
  time: number;
}

export type busSeatType = {
  type: "active" | "inactive" | "empty" | "selected";
  value: string | number;
};

export interface ITransportation {
  currentStep: number;
  currentDate: string;
  location: string;
  selectedSeats: { seat: number; personType: string; price: number }[];
  totalPrice: number;
  ticket: ITicket;
  currentSeat: { seat: number; personType: string; price: number };
  seats: busSeatType[];
}
