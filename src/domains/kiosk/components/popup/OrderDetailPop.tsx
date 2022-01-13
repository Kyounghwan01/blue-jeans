import styled from "styled-components";

const OrderDetailPop = () => {
  return (
    <OrderDetailPopBlock>
      주문 디테일
      {/* 무조건 1개 누르면 사이드 가격 추가  */}
      <footer>
        <button>취소</button>
        <button>담기</button>
      </footer>
    </OrderDetailPopBlock>
  );
};

export default OrderDetailPop;

const OrderDetailPopBlock = styled.article``;
