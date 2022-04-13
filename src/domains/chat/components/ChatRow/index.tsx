import { memo } from "react";
import styled from "styled-components";
import { timeStampToDate } from "utils";

interface IChatRow {
  sendBy: boolean;
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
    <>
      {sendBy ? (
        <ChatYouBlock>
          <div className="timestamp">{timeStampToDate(timeStamp)}</div>
          <div className="chat-wrapper">
            <span>{content}</span>
          </div>
        </ChatYouBlock>
      ) : (
        <ChatOpponentBlock>111</ChatOpponentBlock>
      )}
    </>
  );
};

const ChatYouBlock = styled.div`
  margin: 10px;
  display: flex;
  align-items: end;
  justify-content: end;
  .chat-wrapper {
    text-align: left;
    background: rgb(241, 220, 6);
    max-width: 280px;
    display: inline-block;
    word-break: break-all;
    padding: 6px 10px;
    border-radius: 10px;
    span {
      letter-spacing: -1px;
    }
  }
  .timestamp {
    color: gray;
    font-size: 12px;
    padding-right: 5px;
  }
`;

const ChatOpponentBlock = styled.div``;

export default memo(ChatRow);
