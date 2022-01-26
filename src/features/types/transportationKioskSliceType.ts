export interface ITicket {
  id: number;
  grade: "common" | "top";
  company: string;
  lastSeat: number;
  startAt: string;
  type: "직" | "경";
  time: number;
}

export interface ITransportation {
  currentStep: number;
  currentDate: string;
  location: string;
  startTime: string;
  seats: { number: number; person: string }[];
  price: number;
  ticket: ITicket;
}
