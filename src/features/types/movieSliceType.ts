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
  seat: string;
}
export interface IMovie {
  currentStep: number;
  isViewTotalMovie: boolean;
  movie: ICurrentMovie;
  seatsInfo: IMovieSeats[];
  totalPrice: number;
}
