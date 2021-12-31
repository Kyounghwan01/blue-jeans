import { createSlice, PayloadAction } from "@reduxjs/toolkit";
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
  admin: false
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
        nickName
      } = initialState;
      state.email = email;
      state.gender = gender;
      state.name = name;
      state.profileImage = profileImage;
      state.token = token;
      state.isLogin = isLogin;
      state.id = id;
      state.nickName = nickName;
    },
    login: (state, action: PayloadAction<UserSliceStateType>) => {
      const { email, gender, name, profileImage, token, id, nickName, admin } =
        action.payload;
      state.email = email;
      state.gender = gender;
      state.name = name;
      state.profileImage = profileImage;
      state.token = token;
      state.isLogin = true;
      state.id = id;
      state.nickName = nickName;
      state.admin = admin;
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
