import styled from "styled-components";
import useSelectorTyped from "features/useSelectorTyped";
import usePopup from "hooks/usePopup";
import { IComponentRoute } from "features/types/commonSliceType";

const Payment = ({ next }: IComponentRoute) => {
  const { handleDomainPopup } = usePopup();
  const { totalPrice } = useSelectorTyped(state => ({
    totalPrice: state.movieKiosk.totalPrice
  }));

  const handlePointModal = () => {
    handleDomainPopup(`kiosk/movie/components/Payment/pop/AccPointPop`, "", {
      onClose: next
    });
  };

  return (
    <PaymentBlock>
      <div className="price-wrapper">
        <div>
          <div>총 결제금액</div>
          <div>{totalPrice.toLocaleString()}￦</div>
        </div>
        <div>-</div>
        <div>
          <div>할인금액</div>
          <div>0￦</div>
        </div>
        <div>=</div>
        <div>
          <div>전체 결제금액</div>
          <div>{totalPrice.toLocaleString()}￦</div>
        </div>
      </div>
      <div className="payment-wrapper">
        <div onClick={handlePointModal}>
          <div className="payment-wrapper__image">신용카드 이미지</div>
          <div>신용카드</div>
        </div>

        <div>
          <div className="payment-wrapper__image">현금 이미지</div>
          <div>현금</div>
        </div>

        <div>
          <div className="payment-wrapper__image">모바일 이미지</div>
          <div>모바일 결제</div>
        </div>
      </div>
    </PaymentBlock>
  );
};

const PaymentBlock = styled.article`
  .price-wrapper {
    display: flex;
    justify-content: space-around;
  }
  .payment-wrapper {
    margin-top: 30px;
    display: flex;
    justify-content: space-around;
    &__image {
      width: 100px;
      height: 100px;
      background: gray;
    }
  }
`;

export default Payment;
