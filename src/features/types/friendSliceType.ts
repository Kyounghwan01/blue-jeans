export type FriendSliceStateType = {
  friend: string[];
  disableFriend: string[];
};

export interface IAddFriend {
  type: "friend" | "disableFriend";
  value: string;
}
