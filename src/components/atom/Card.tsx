import { memo } from "react";
import styled from "styled-components";
import { IMenu } from "features/types/educationSliceType";
interface ICard {
  product: IMenu;
  onClick: any;
}

const Card = ({ product, onClick }: ICard) => {
  return (
    <CardBlock onClick={() => onClick(product)}>
      <div className="img"></div>
      <div className="content">
        {product.name} <br /> {product.price}원
      </div>
    </CardBlock>
  );
};

export default memo(Card);

const CardBlock = styled.div`
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
