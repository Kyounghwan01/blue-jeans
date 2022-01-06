import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  FriendSliceStateType,
  IAddFriend,
} from "features/types/friendSliceType";

const initialState: FriendSliceStateType = {
  friend: [],
  disableFriend: [],
};

/**
 * { id: {friend: [1,2,3,4,5], disableFriend: [1,2,3,4,5]}}
 */

export const friendSlice = createSlice({
  name: "friend",
  initialState,
  reducers: {
    addFriend: (state, action: PayloadAction<IAddFriend>) => {
      state[action.payload.type === "friend" ? "friend" : "disableFriend"].push(
        action.payload.value
      );
    },
    removeFriend: (state, action: PayloadAction<IAddFriend>) => {
      const type =
        action.payload.type === "friend" ? "friend" : "disableFriend";
      state[type] = state[type].filter((id) => id !== action.payload.value);
    },
  },
});

export const { addFriend, removeFriend } = friendSlice.actions;

export default friendSlice.reducer;
