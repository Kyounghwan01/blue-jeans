import { useState, useCallback } from "react";
import styled from "styled-components";
import SendIcon from "@mui/icons-material/Send";
const ChatInput = ({ submit }: { submit: (text: string) => void }) => {
  const [text, setText] = useState("");

  const handleText = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setText(e.target.value);
    },
    []
  );

  // const handleKeypress = useCallback(
  //   (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
  //     // div에 걸려있으명 HTMLImageElement
  //     if (e.key === "Enter") {
  //       handleSubmit();
  //     }
  //   },
  //   [text]
  // );

  const handleSubmit = useCallback(() => {
    if (!text.length) return;

    submit(text);
    setText("");
  }, [text]);

  return (
    <ChatInputBlock isActiveSubmit={!!text.length}>
      <textarea
        onChange={handleText}
        value={text}
        // onKeyPress={handleKeypress}
        placeholder="메시지를 입력해주세요."
      />
      <SendIcon onClick={handleSubmit} />
    </ChatInputBlock>
  );
};

const ChatInputBlock = styled.section<{ isActiveSubmit: boolean }>`
  background: white;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2px 5px;
  position: fixed;
  bottom: 0;
  width: 100vw;
  textarea {
    font-size: 16px;
    height: 40px;
    width: 100%;
    border: 1px solid #aaa;
    border-radius: 32px;
    margin: 0 10px;
    padding: 10px 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    vertical-align: middle;
    overflow: hidden;
    resize: none;
    &:focus {
      box-shadow: none;
      outline: none;
    }
  }
  svg {
    width: 30px;
    height: 50px;
    color: ${props =>
      !props.isActiveSubmit ? "#eee" : "var(--primary-color)"};
  }
`;

export default ChatInput;
