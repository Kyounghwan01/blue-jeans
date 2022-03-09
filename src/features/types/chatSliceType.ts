export interface IChatSlice {
  users: Map<string, { img: string; nickName: string }>;
  chat: ChatType;
  roomList: {
    id: string;
    title: string;
    desc: string;
    isSecret: boolean;
    member: string[];
    owner: string;
    tag: number[];
    ban: { name: string; list: string[] }[];
  }[];
}

// todo: next-seo 합시다

export type ChatType = {
  content: string;
  timestamp: string;
  sendBy: string;
  id: string;
}[];
