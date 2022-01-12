import styled from "styled-components";

interface ICard {
  product: {
    name: string;
    price: number;
    img: string;
  };
  onClick: () => void;
}

export default function Card({ product, onClick }: ICard) {
  return (
    <CardBlock onClick={onClick}>
      <div className="img"></div>
      <div className="content">
        {product.name} <br /> {product.price}
      </div>
    </CardBlock>
  );
}

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
