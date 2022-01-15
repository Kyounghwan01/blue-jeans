import { useEffect, useState, useMemo, useCallback } from "react";
import styled from "styled-components";
import { PopLayoutBlock } from "components/common/BasicLayout/BasicLayout.styled";

interface IAlert {
  title: string;
  hideModal: () => void;
  extraData: { type: string; onClose: () => void };
}

const OrderPayment = ({
  title,
  hideModal,
  extraData = { type: "", onClose: () => {} }
}: IAlert) => {
  const [paymentStep, setPaymentStep] = useState<string>("prev");
  const mappedTitle = useMemo(() => {
    switch (extraData.type) {
      case "creditCard":
        return "신용카드";
      case "payco":
        return "payco";
      case "mobile":
        return "모바일 상품권";
      default:
        return "신용카드";
    }
  }, [extraData.type]);

  useEffect(() => {
    let paymenting: NodeJS.Timeout | null = null;
    paymenting = setTimeout(() => {
      setPaymentStep("done");
    }, 5000);

    return () => {
      if (!paymenting) return;
      clearTimeout(paymenting);
    };
  }, []);

  const close = useCallback(() => {
    if (paymentStep === "prev") {
      return;
    }

    hideModal();
    extraData.onClose();
  }, [paymentStep]);

  return (
    <OrderPaymentBlock onClick={close}>
      <article>
        <header className="txt-c">
          <span>
            {paymentStep === "prev" ? `${mappedTitle} ${title}` : "결제 완료"}
          </span>
        </header>
        {/* todo: 결재 수단 완료되면 업뎃 + css */}
        <section>
          {paymentStep === "prev" ? (
            <div>
              결제가 완료 될 때 까지 <br /> 카드를 빼지 마세요! <br />
              신용카드를 그림과 같이 IC카드 리더기에 삽입해 주세요. <br />
              IC 카드 결제 오류시 마그네틱 아래로 강하게 읽혀주세요.
            </div>
          ) : (
            <div>
              결제가 완료되었습니다. <br />
              메뉴가 준비되면 <br />
              안내해드립니다. 감사합니다. <br />
              주문번호: 0545
            </div>
          )}
        </section>
      </article>
    </OrderPaymentBlock>
  );
};

const OrderPaymentBlock = styled(PopLayoutBlock)`
  article {
    position: relative;
    background: white;
    width: 90vw;
    height: 50vh;
    border-radius: 4px;
    header {
      padding: 15px 18px;
      background: #bbb;
      span {
        font-size: 20px;
        color: white;
      }
    }
  }
`;

export default OrderPayment;
