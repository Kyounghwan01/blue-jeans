import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import * as Sentry from "@sentry/react";
import { UserSliceStateType } from "features/types/userSliceType";

const initialState: UserSliceStateType = {
  isLogin: false,
  email: null,
  gender: null,
  id: null,
  name: null,
  profileImage: "",
  token: null,
  nickName: "",
  admin: false,
  loginType: null
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logOut: state => {
      const {
        isLogin,
        email,
        gender,
        name,
        profileImage,
        token,
        id,
        nickName,
        loginType
      } = initialState;
      state.email = email;
      state.gender = gender;
      state.name = name;
      state.profileImage = profileImage;
      state.token = token;
      state.isLogin = isLogin;
      state.id = id;
      state.nickName = nickName;
      state.loginType = loginType;
    },
    login: (state, action: PayloadAction<UserSliceStateType>) => {
      const {
        email,
        gender,
        name,
        profileImage,
        token,
        id,
        nickName,
        admin,
        loginType
      } = action.payload;
      state.email = email;
      state.gender = gender;
      state.name = name;
      state.profileImage = profileImage;
      state.token = token;
      state.isLogin = true;
      state.id = id;
      state.nickName = nickName;
      state.admin = admin;
      state.loginType = loginType;

      Sentry.setUser({ username: String(id) || "fakeUser" });
    },
    setNickName: (state, action: PayloadAction<string>) => {
      state.nickName = action.payload;
    },
    setImageNickName: (
      state,
      action: PayloadAction<{ url: string; nickName: string }>
    ) => {
      state.profileImage = action.payload.url;
      state.nickName = action.payload.nickName;
    }
  }
});

export const { logOut, login, setNickName, setImageNickName } =
  userSlice.actions;

export default userSlice.reducer;
