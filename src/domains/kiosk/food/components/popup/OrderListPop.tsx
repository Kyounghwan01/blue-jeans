import styled from "styled-components";
import CloseIcon from "@mui/icons-material/Close";
import { IOrderList } from "features/types/foodKioskSliceType";
import { PopLayoutBlock } from "components/common/BasicLayout/BasicLayout.styled";

interface IAlert {
  title: string;
  extraData: {
    desc: string;
    onClose: ({ type }: { type: string }) => void;
    orderList: IOrderList[];
    totalOrder: { price: number; count: number };
  };
  hideModal: () => void;
}

const OrderListPop = ({
  title,
  hideModal,
  extraData = {
    desc: "",
    onClose: () => {},
    orderList: [],
    totalOrder: { price: 0, count: 0 }
  }
}: IAlert) => {
  const close = (type: string) => {
    hideModal();
    if (typeof extraData.onClose === "function") {
      extraData.onClose({ type });
    }
  };

  return (
    <OrderListPopBlock>
      <article>
        <header>
          <span className="custom-font-header-title">{title}</span>
          <CloseIcon onClick={hideModal} />
        </header>
        <section className="check-order-list">
          <span>
            <span className="check-order-list__red">주문리스트</span>를
            확인해주세요
          </span>
        </section>
        <section className="order-list">
          <div className="order-list__header custom-font-content">
            <div>메뉴</div>
            <div className="txt-c">수량</div>
            <div className="txt-r">가격</div>
          </div>
          {extraData.orderList.map(order => (
            <div
              className="order-list__content custom-font-content"
              key={order.name}
            >
              {/* todo: side 구현 */}
              <div>{order.name}</div>
              <div className="txt-c">{order.count}</div>
              <div className="txt-r">{order.totalPrice.toLocaleString()}</div>
            </div>
          ))}
        </section>

        <footer>
          <div className="total">
            <div className="total__count">
              총 수량{" "}
              <span className="total__count__number">
                {extraData.totalOrder.count}
              </span>
              개
            </div>
            <div className="total__price">
              결제금액{" "}
              <span className="total__price__number">
                {extraData.totalOrder.price.toLocaleString()}
              </span>
            </div>
          </div>
          <div
            className="confirm-btn txt-c"
            onClick={() => close("creditCard")}
          >
            확 인
          </div>
        </footer>
      </article>
    </OrderListPopBlock>
  );
};

export default OrderListPop;

const OrderListPopBlock = styled(PopLayoutBlock)`
  article {
    position: relative;
    background: white;
    width: 90vw;
    height: 80vh;
    border-radius: 4px;
    header {
      padding: 15px 18px;
      background: #eee;
      display: flex;
      justify-content: space-between;
      align-items: center;
      span {
        color: #0077b6;
      }
    }
    .check-order-list {
      padding: 20px 0 20px;
      text-align: center;
      span {
        font-size: 22px;
      }
      &__red {
        font-weight: bold;
        color: #ee6c4d;
      }
    }
  }

  .order-list {
    margin: 0 10px 10px 10px;
    border-radius: 4px;
    overflow-y: auto;
    border: 1px solid #eee;
    max-height: 50vh;
    &__header {
      background: #eee;
      display: grid;
      grid-template-columns: 5fr 1fr 2fr;
      padding: 10px;
      div:last-child {
        text-align: right;
      }
    }
    &__content {
      padding: 10px;
      padding-bottom: 8px;
      display: grid;
      grid-template-columns: 5fr 1fr 2fr;
    }
    &__count {
      display: flex;
      justify-content: center;
    }
  }
  footer {
    position: absolute;
    bottom: 0;
    padding: 10px 18px 20px;
    width: 100%;
    letter-spacing: 0px;
    .total {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      font-size: 20px;
      padding-bottom: 20px;
      &__count {
        &__number {
          font-weight: bold;
        }
      }
      &__price {
        &__number {
          font-weight: bold;
          color: #0077b6;
        }
      }
    }
    .confirm-btn {
      padding: 10px 20px;
      background: #ee6c4d;
      color: white;
      width: 150px;
      border-radius: 4px;
      margin: 0 auto;
    }
  }
`;
