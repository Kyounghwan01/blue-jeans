export interface ICurrentMovie {
  id: number;
  title: string;
  startAt: string;
  endAt: string;
  img: string;
  lastSeats: number;
  grade: number;
}

export interface IMovieSeats {
  type: "adult" | "children" | "disabled" | "older";
  label: string;
  count: number;
}
export interface IMovie {
  currentStep: number;
  isViewTotalMovie: boolean;
  isReservation: boolean;
  movie: ICurrentMovie;
  seatsInfo: IMovieSeats[];
  totalInfo: { price: number; seat: number };
  seats: {
    label: number | string;
    value: string;
    isSelected: boolean;
    alerdySeated: boolean;
  }[];
}
