import styled from "styled-components";
import { kioskProducts, kioskTab } from "utils/constants";
import KioskCounter from "components/molecules/KioskCounter";
import Card from "components/atom/Card";
import useMain from "domains/kiosk/food/hooks/useMain";

const Index = () => {
  const {
    tab,
    setTab,
    handleOrderList,
    orderList,
    deleteOrder,
    handleCount,
    totalOrder,
    confirmOrder,
    handleOrderReset,
    currentHintStep
  } = useMain();

  return (
    <Block>
      <section className="tab">
        {kioskTab.map(tab => (
          <div key={tab.type} onClick={() => setTab(tab.type)}>
            <span>{tab.label}</span>
          </div>
        ))}
      </section>

      <div className="main">
        {kioskProducts
          .filter(product => product.type === tab)
          .map(product => (
            <Card
              key={product.name}
              product={product}
              onClick={handleOrderList}
              isHint={product.name === "무공돈까스" && currentHintStep <= 1}
            />
          ))}
      </div>

      <div className="bill">
        <div className="bill__list">
          <div className="bill__list__divide">
            <div>메뉴</div>
            <div>수량</div>
            <div>가격</div>
            <div></div>
          </div>
          <div className="bill__list__menu">
            {orderList.map(order => (
              <div className="bill__list__menu__wrapper" key={order.name}>
                <div className="bill__list__menu__name">{order.name}</div>
                <div className="bill__list__menu__count">
                  <KioskCounter
                    count={order.count}
                    order={order.name}
                    increse={handleCount}
                    decrese={handleCount}
                    isHint={
                      order.name.includes("무공돈까스") && currentHintStep === 2
                    }
                  />
                </div>
                <div>{order.totalPrice.toLocaleString()}</div>
                <div data-name={order.name} onClick={deleteOrder}>
                  x
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bill__footer">
          <div className="bill__footer__count">
            <div className="bill__footer__count__amount">
              <div>주문수량</div>
              <div>{totalOrder.count}</div>
            </div>
            <div className="bill__footer__count__price">
              <div>주문금액</div>
              <div>{totalOrder.price}</div>
            </div>
          </div>
          <div className="bill__footer__card">
            <div
              className="bill__footer__card__cancel"
              onClick={handleOrderReset}
            >
              전체
              <br />
              취소
            </div>
            <div className="bill__footer__card__payment">payco</div>
            <div
              className={`bill__footer__card__payment ${
                currentHintStep === 3 && "blink"
              }`}
              onClick={confirmOrder}
            >
              카드결제
            </div>
          </div>
        </div>
      </div>
    </Block>
  );
};

const Block = styled.article`
  .tab {
    padding: 10px 18px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    gap: 5px;
    div {
      text-align: center;
      background: red;
      height: 30px;
    }
  }
  .main {
    padding: 10px 9px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 5px;
  }

  .bill {
    position: fixed;
    bottom: 0;
    width: 100%;
    &__list {
      /* display: flex; */
      &__divide {
        background: grey;
        display: grid;
        grid-template-columns: 5fr 3fr 2fr 1fr;
        padding: 0 18px;
        color: white;
        div {
          &:not(:first-child) {
            text-align: center;
          }
        }
      }
      &__menu {
        padding: 10px 10px;
        background: #eee;
        min-height: 20px;
        max-height: 20vh;
        border-bottom: 1px solid grey;
        overflow-y: auto;
        &__wrapper {
          padding-bottom: 8px;
          display: grid;
          grid-template-columns: 5fr 3fr 2fr 1fr;
        }
        &__name {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        &__count {
          display: flex;
          justify-content: center;
        }
      }
    }

    &__footer {
      display: flex;
      justify-content: space-between;
      padding: 6px 8px;
      background: #eee;
      &__count {
        background: white;
        padding: 5px 10px;
        width: 100%;
        margin-right: 20px;
        border-radius: 8px;
        &__amount {
          display: flex;
          justify-content: space-between;
          color: #aaa;
        }
        &__price {
          display: flex;
          justify-content: space-between;
          color: #aaa;
        }
      }
      &__card {
        display: flex;
        &__cancel {
          padding: 5px 8px;
          background: grey;
          color: white;
          margin-right: 5px;
          border-radius: 4px;
          width: 40px;
          text-align: center;
        }
        &__payment {
          margin-right: 5px;
          padding: 5px 8px;
          background: red;
          color: white;
          border-radius: 4px;
          width: 50px;
          text-align: center;
        }
      }
    }
  }
`;

export default Index;
