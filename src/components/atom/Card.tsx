import { memo, useCallback } from "react";
import styled from "styled-components";
interface ICard {
  product: {
    name: string;
    price: number;
    img: string;
    type: string;
  };
  onClick: (data: { type: string; name: string; price: number }) => void;
}

const Card = ({ product, onClick }: ICard) => {
  const handleCardClick = useCallback(() => {
    onClick({ type: product.type, name: product.name, price: product.price });
  }, []);

  return (
    <CardBlock onClick={handleCardClick}>
      <div className="img"></div>
      <div className="content">
        {product.name} <br /> {product.price}
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
