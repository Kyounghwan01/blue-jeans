export interface ITransportation {
  currentStep: number;
  currentDate: string;
  location: string;
  startTime: string;
  seats: { number: number; person: string }[];
  price: number;
}
