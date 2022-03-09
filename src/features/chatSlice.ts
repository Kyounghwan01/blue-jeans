import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IChatSlice } from "features/types/chatSliceType";

const initialState: IChatSlice = {
  users: new Map(),
  chat: [],
  roomList: []
};

/**
 * { id: {friend: [1,2,3,4,5], disableFriend: [1,2,3,4,5]}}
 */

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    addUsers: (
      state,
      action: PayloadAction<{ id: string; img: string; nickName: string }>
    ) => {
      state.users.set(action.payload.id, {
        img: action.payload.img,
        nickName: action.payload.nickName
      });
    },
    checkUsers: (state, action: PayloadAction<{ id: string }>): any => {
      const findUser = state.users.get(action.payload.id);
      return findUser || {};
    },
    setChat: (state, action) => {
      state.chat = action.payload;
    },
    pushChat: (state, action) => {
      state.chat.push(action.payload);
    },
    setRoom: (state, action) => {
      state.roomList = action.payload;
    }
    // addFriend: (state, action: PayloadAction<IAddFriend>) => {
    //   state[action.payload.type === "friend" ? "friend" : "disableFriend"].push(
    //     action.payload.value
    //   );
    // },
    // removeFriend: (state, action: PayloadAction<IAddFriend>) => {
    //   const type =
    //     action.payload.type === "friend" ? "friend" : "disableFriend";
    //   state[type] = state[type].filter((id) => id !== action.payload.value);
    // },
  }
});

export const { addUsers, checkUsers, setChat, setRoom, pushChat } =
  chatSlice.actions;

export default chatSlice.reducer;
