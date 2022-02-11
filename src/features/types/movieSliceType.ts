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
  type: "active" | "inactive" | "empty" | "selected";
  value: string | number;
}
export interface IMovie {
  currentStep: number;
  isViewTotalMovie: boolean;
  movie: ICurrentMovie;
  seats: IMovieSeats[];
}
