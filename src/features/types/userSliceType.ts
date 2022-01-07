export type AuthSliceStateType = {
  id: string;
  password: string;
  errorMessage: string | null;
  isLogin: boolean;
};

export type LoginPayloadType = {
  id: string;
  password: string;
};

export type UserSliceStateType = {
  isLogin?: boolean;
  email: string | null;
  gender: string | null;
  id: number | string | null;
  name: string | null;
  profileImage: string;
  token: string | null;
  nickName?: string;
  birth?: string;
  admin: boolean;
  loginType: string | null;
};
