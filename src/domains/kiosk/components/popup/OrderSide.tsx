import { memo } from "react";
import styled from "styled-components";
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
      className={`${isHint && "blink"}`}
    >
      {side.checked && (
        <div className="checked">
          <CheckCircleSharpIcon color="primary" />
        </div>
      )}
      <div className="image"></div>
      <div className="content txt-c">
        <span>{side.name}</span>
        <span>+{side.price.toLocaleString()}</span>
      </div>
    </OrderSideBlock>
  );
};

const OrderSideBlock = styled.section`
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
