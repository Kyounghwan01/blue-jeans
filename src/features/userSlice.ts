import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserSliceStateType } from "features/types/userSliceType";

const initialState: UserSliceStateType = {
  isLogin: false,
  email: null,
  gender: null,
  id: null,
  name: null,
  profileImage: "",
  token: null
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logOut: state => {
      const { isLogin, email, gender, name, profileImage, token, id } =
        initialState;
      state.email = email;
      state.gender = gender;
      state.name = name;
      state.profileImage = profileImage;
      state.token = token;
      state.isLogin = isLogin;
      state.id = id;
    },
    login: (state, action: PayloadAction<UserSliceStateType>) => {
      const { email, gender, name, profileImage, token, id } = action.payload;
      state.email = email;
      state.gender = gender;
      state.name = name;
      state.profileImage = profileImage;
      state.token = token;
      state.isLogin = true;
      state.id = id;
    }
  }
});

export const { logOut, login } = userSlice.actions;

export default userSlice.reducer;
