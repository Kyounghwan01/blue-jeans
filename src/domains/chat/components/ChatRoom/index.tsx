import { useEffect, useRef } from "react";
import styled from "styled-components";
import useChatRoom from "domains/chat/hooks/useChatRoom";
import ChatInput from "domains/chat/components/ChatInput";
import ChatRow from "domains/chat/components/ChatRow";

const ChatRoom = () => {
  const { chat, submit, getPrevChat } = useChatRoom();
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  return (
    <ChatRoomBlock>
      <button onClick={getPrevChat}>get Prev</button>
      <ChatInput submit={submit} />
      <div style={{ marginTop: "50px", paddingBottom: "50px" }}>
        {chat.length ? (
          <>
            {chat.map(singleChat => (
              <ChatRow
                key={singleChat.id}
                sendBy={singleChat.sendBy}
                content={singleChat.content}
                timeStamp={singleChat.timestamp}
              />
            ))}
          </>
        ) : (
          <div>로딩 또는 챗 없음</div>
        )}
      </div>

      <div ref={scrollRef} />
    </ChatRoomBlock>
  );
};

const ChatRoomBlock = styled.article`
  background: #eee;
  height: calc(100vh - 50px);
`;

export default ChatRoom;
