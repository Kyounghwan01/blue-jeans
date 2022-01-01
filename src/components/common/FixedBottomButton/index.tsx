import { memo } from "react";
import styled from "styled-components";

interface IFinexBottomButton {
  title: string;
  onClick: () => void;
  disabled: boolean;
}

const Index = ({ title, onClick, disabled }: IFinexBottomButton) => {
  return (
    <Block disabled={disabled} onClick={onClick}>
      <span>{title}</span>
    </Block>
  );
};

const Block = styled.button<{ disabled: boolean }>`
  position: fixed;
  bottom: 0;
  left: 0;
  height: 60px;
  width: 100%;
  background: ${props => (props.disabled ? "#c4c4c4" : "dodgerblue")};
  color: white;
  border: none;
  z-index: 999;
  span {
    font-size: 18px;
  }
`;

export default memo(Index);
