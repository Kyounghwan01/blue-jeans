import { memo } from "react";
import styled, { css, keyframes } from "styled-components";
import { IMenu } from "features/types/educationSliceType";
interface ICard {
  product: IMenu;
  onClick: any;
  isHint: boolean;
}

const Card = ({ product, onClick, isHint }: ICard) => {
  return (
    <CardBlock isHint={isHint} onClick={() => onClick(product)}>
      <div className="img"></div>
      <div className="content">
        {product.name} <br /> {product.price.toLocaleString()}원
      </div>
    </CardBlock>
  );
};

export default memo(Card);

const BlinkHint = keyframes`
  50% {
    opacity: 0.5;
  }
`;

const CardBlock = styled.section<{ isHint: boolean }>`
  border-radius: 4px;
  background-color: grey;
  ${(props) =>
    props.isHint &&
    css`
      animation: ${BlinkHint} 1.5s step-end infinite;
    `}
  .img {
    border-radius: 4px 4px 0 0;
    background-color: #aaa;
    height: 80px;
  }
  .content {
    color: white;
    padding: 5px 0;
    text-align: center;
  }
`;
