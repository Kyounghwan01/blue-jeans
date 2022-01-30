import { memo } from "react";
import styled, { css } from "styled-components";

const WordCard = ({
  type,
  word,
  onClick
}: {
  type: string;
  word: string;
  onClick: (type: string, word: string) => void;
}) => {
  const clickCard = (type: string, word: string) => {
    onClick(type, word);
  };

  return (
    <WordCardBlock onClick={() => clickCard(type, word)} type={type}>
      {word}
    </WordCardBlock>
  );
};

export default memo(WordCard);

const WordCardBlock = styled.div<{ type: string }>`
  ${props =>
    props.type === "location"
      ? css`
          border: 1px solid gray;
          width: 70px;
          height: 50px;
          text-align: center;
          line-height: 48px;
          margin-bottom: 20px;
        `
      : props.type === "searchLocation"
      ? css`
          width: 80px;
          height: 30px;
          border: 1px solid grey;
          padding: 5px 15px;
          text-align: center;
        `
      : css`
          text-align: center;
          border: 1px solid gray;
          width: 30px;
          height: 30px;
          line-height: 28px;
          margin-bottom: 16px;
        `}
`;
