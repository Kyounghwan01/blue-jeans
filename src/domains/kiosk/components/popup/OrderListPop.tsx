import styled from "styled-components";
import CloseIcon from "@mui/icons-material/Close";

interface IAlert {
  title: string;
  extraData: {
    desc: string;
    onClose: () => void;
    orderList: any;
  };
  hideModal: () => void;
}

const OrderListPop = ({
  title,
  hideModal,
  extraData = { desc: "", onClose: () => {}, orderList: [] },
}: IAlert) => {
  const close = () => {
    hideModal();
    if (typeof extraData.onClose === "function") {
      extraData.onClose();
    }
  };

  return (
    // todo: css
    <OrderListPopBlock>
      <article>
        <header>
          <span>{title}</span>
          <CloseIcon onClick={hideModal} />
        </header>
        <section>
          {JSON.stringify(extraData.orderList)}
          <span>주문리스트</span>를 확인해주세요
        </section>
        <section>메뉴 / 수량 / 가격 총 수량 2개 총결제금액: 얼마</section>
        <footer onClick={close}>확인</footer>
      </article>
    </OrderListPopBlock>
  );
};

export default OrderListPop;

const OrderListPopBlock = styled.dialog`
  padding: 0;
  background: rgba(33, 38, 41, 0.5);
  height: 100vh;
  width: 100%;
  position: fixed;
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  letter-spacing: -1px;
  article {
    background: white;
    width: 90vw;
    height: 90vh;
    border-radius: 4px;
    header {
      padding: 15px 18px;
      background: #eee;
      display: flex;
      justify-content: space-between;
      align-items: center;
      span {
        font-size: ${(props) => props.theme.palette.customFont.headerTitle};
      }
    }
  }
`;
