import { memo } from "react";
import styled from "styled-components";
import { IMenu } from "features/types/educationSliceType";
interface ICard {
  product: IMenu;
  onClick: any;
  isHint: boolean;
}

const Card = ({ product, onClick, isHint }: ICard) => {
  return (
    <CardBlock
      className={`${isHint && "blink"}`}
      onClick={() => onClick(product)}
    >
      <div className="img"></div>
      <div className="content">
        {product.name} <br /> {product.price.toLocaleString()}원
      </div>
    </CardBlock>
  );
};

export default memo(Card);

const CardBlock = styled.section`
  border-radius: 4px;
  background-color: grey;
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
