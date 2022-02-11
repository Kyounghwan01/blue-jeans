export type fontSizeType = "smail" | "middle" | "large";

export interface ICommonSlice {
  kakao: any;
  naver: any;
  fontSizeType: fontSizeType;
  currentDate: string;
  currentTime: string;
}

export interface IComponentRoute {
  back: (backComponent?: string) => Promise<boolean>;
  next: (nextComponent?: string) => Promise<boolean>;
}
