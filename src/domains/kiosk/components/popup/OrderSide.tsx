import { memo } from "react";
import styled, { css, keyframes } from "styled-components";
import CheckCircleSharpIcon from "@mui/icons-material/CheckCircleSharp";
import { ISide } from "features/types/educationSliceType";

interface IOrderSide {
  side: ISide & { checked?: boolean };
  handleSideMenu: (side: ISide) => void;
  isHint: boolean;
}

const OrderSide = ({ side, handleSideMenu, isHint }: IOrderSide) => {
  return (
    <OrderSideBlock
      key={side.name}
      onClick={() => handleSideMenu(side)}
      isHint={isHint}
    >
      {side.checked && (
        <div className="checked">
          <CheckCircleSharpIcon color="primary" />
        </div>
      )}
      <div className="image"></div>
      <div className="content txt-c">
        <span>{side.name}</span>
        <span>+{side.price}</span>
      </div>
    </OrderSideBlock>
  );
};

const BlinkHint = keyframes`
  50% {
    opacity: 0.5;
  }
`;

const OrderSideBlock = styled.section<{ isHint: boolean }>`
  ${(props) =>
    props.isHint &&
    css`
      animation: ${BlinkHint} 1.5s step-end infinite;
    `}
  position: relative;
  width: 90px;
  height: 130px;
  background: #ccc;
  margin-right: 10px;
  display: inline-block;
  margin-bottom: 10px;
  .checked {
    position: absolute;
    top: 5px;
    right: 5px;
  }
  .image {
    width: 90px;
    height: 70px;
    background: #bbb;
  }
  .content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 60px;
  }
`;

export default memo(OrderSide);
