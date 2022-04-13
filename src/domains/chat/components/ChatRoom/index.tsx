import { useEffect, useRef } from "react";
import styled from "styled-components";
import useSelectorTyped from "features/useSelectorTyped";
import useChatRoom from "domains/chat/hooks/useChatRoom";
import ChatInput from "domains/chat/components/ChatInput";
import ChatRow from "domains/chat/components/ChatRow";

const ChatRoom = () => {
  const { chat, getPrevChat, submit } = useChatRoom();
  const user = useSelectorTyped(state => state.user);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  return (
    <ChatRoomBlock>
      <button onClick={getPrevChat}>get Prev</button>
      <ChatInput submit={submit} />
      <div className="chat-container">
        {chat.length ? (
          <>
            {chat.map((singleChat, index) => (
              <ChatRow
                key={index}
                sendBy={singleChat.sendBy === String(user.id)}
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
  .chat-container {
    background: #eee;
    padding: 10px 10px 50px 10px;
    /* display: flex;
    flex-direction: column; */
  }
`;

export default ChatRoom;
