import { useState, useCallback } from "react";

const ChatInput = ({ submit }: { submit: (text: string) => void }) => {
  const [text, setText] = useState("");

  const handleText = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  }, []);

  const handleKeypress = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      // div에 걸려있으명 HTMLImageElement
      if (e.key === "Enter") {
        handleSubmit();
      }
    },
    [text]
  );

  const handleSubmit = useCallback(() => {
    submit(text);
    setText("");
  }, [text]);

  return (
    <div>
      <input onChange={handleText} value={text} onKeyPress={handleKeypress} />
      <button onClick={handleSubmit}>submit</button>
    </div>
  );
};

export default ChatInput;
