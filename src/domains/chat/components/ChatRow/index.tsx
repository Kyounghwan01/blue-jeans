import { memo } from "react";
import styled from "styled-components";

interface IChatRow {
  sendBy: string;
  content: string;
  timeStamp: string;
  // 로직완성되면 사용할 interface
  // 여기에는 row timestamp가 아니라 가공된 시간이 들어가야하고
  // sendBy가 아니라, 이름, 이미지 Url, 나인지 상대방인지 값이 와야함
  // direction: "left" | "right";
  // profileImg: string;
  // name: string;
}

const ChatRow = ({ sendBy, content, timeStamp }: IChatRow) => {
  return (
    <ChatRowBlock>
      {content} / {timeStamp} / {sendBy}
    </ChatRowBlock>
  );
};

const ChatRowBlock = styled.div``;

export default memo(ChatRow);
