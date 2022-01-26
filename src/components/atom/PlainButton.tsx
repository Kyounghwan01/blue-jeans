import { memo } from "react";
import styled from "styled-components";

interface IPlainButton {
  onClick: () => void;
  text: string;
  isBlink: boolean;
}

const PlainButton = ({ onClick, text, isBlink }: IPlainButton) => {
  return (
    <PlainButtonBlock className={`${isBlink && "blink"}`} onClick={onClick}>
      {text}
    </PlainButtonBlock>
  );
};

const PlainButtonBlock = styled.button`
  width: 50vw;
  height: 50px;
  border-radius: 8px;
  border: none;
  background-color: dodgerblue;
  color: white;
  font-size: 18px;
  font-weight: bold;
`;

export default memo(PlainButton);
