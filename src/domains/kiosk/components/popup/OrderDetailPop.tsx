import { useState, useCallback, useMemo } from "react";
import styled from "styled-components";
import { IOrderList } from "features/types/educationSliceType";
import { PopLayoutBlock } from "components/common/BasicLayout/BasicLayout.styled";
import CheckCircleSharpIcon from "@mui/icons-material/CheckCircleSharp";

interface IAlert {
  extraData: {
    order: IOrderList;
    onClose: (order: any) => void;
  };
  hideModal: () => void;
}

const OrderDetailPop = ({
  hideModal,
  extraData = {
    onClose: () => {},
    order: {
      name: "",
      desc: "",
      price: 0,
      type: "",
      count: 0,
      totalPrice: 0,
      side: [{ name: "", price: 0 }]
    }
  }
}: IAlert) => {
  const [currentOrder, setCurrentOrder] = useState(extraData.order);

  const handleSideMenu = useCallback(product => {
    setCurrentOrder(prev => {
      const newSide = prev.side?.map(side => {
        if (side.name === product.name) {
          return { ...side, checked: !side.checked };
        } else {
          return side;
        }
      });
      return { ...prev, side: newSide };
    });
  }, []);

  const totalPrice = useMemo(() => {
    let sidePrice = currentOrder.price;

    if (currentOrder.side?.length) {
      currentOrder.side?.forEach(side => {
        if (side.checked) {
          sidePrice += side.price;
        }
      });
    }

    return sidePrice;
  }, [currentOrder]);

  const handleCart = () => {
    const payloadSide =
      currentOrder.side
        ?.map(side => {
          return side.checked ? side.name : null;
        })
        .filter(side => side) || [];

    hideModal();
    if (typeof extraData.onClose === "function") {
      extraData.onClose({
        ...currentOrder,
        name: payloadSide.length
          ? `${currentOrder.name} (${payloadSide.join(",")})`
          : currentOrder.name,
        price: totalPrice,
        side: payloadSide
      });
    }
  };

  return (
    <OrderDetailPopBlock>
      <article>
        <section className="main">
          <div className="main__image"></div>
          <div className="main__content">
            <p className="main__content__title">{currentOrder.name}</p>
            <p className="main__content__desc">{currentOrder.desc}</p>
            <div className="main__content__price">
              <p className="txt-r">{totalPrice.toLocaleString()}</p>
            </div>
          </div>
        </section>
        {currentOrder.side && (
          <section className="side">
            <div className="side__desc">추가시 선택해주세요</div>
            <div className="side__content">
              {currentOrder.side.map(side => (
                // todo: 무공돈까일때 공깃밥이면 true, 이전스텝은 계속 깜빡이자
                <div
                  key={side.name}
                  className="side__content__card"
                  onClick={() => handleSideMenu(side)}
                >
                  {side.checked && (
                    <div className="side__content__card__checked">
                      <CheckCircleSharpIcon color="primary" />
                    </div>
                  )}
                  <div className="side__content__card__image"></div>
                  <div className="side__content__card__content txt-c">
                    <span>{side.name}</span>
                    <span>+{side.price}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
        <footer>
          <button className="footer-cancel" onClick={hideModal}>
            취 소
          </button>
          <button className="footer-cancel footer-cart" onClick={handleCart}>
            주문담기
          </button>
        </footer>
      </article>
    </OrderDetailPopBlock>
  );
};

export default OrderDetailPop;

const OrderDetailPopBlock = styled(PopLayoutBlock)`
  article {
    position: relative;
    background: white;
    width: calc(100% - 10px);
    height: 80vh;
    border-radius: 4px;
  }
  .main {
    display: flex;
    height: 180px;
    width: 100%;
    background: #ded0c1;
    &__image {
      height: 180px;
      width: 40%;
      background: grey;
    }
    &__content {
      padding: 15px;
      width: 60%;
      &__title {
        font-size: 20px;
        margin-bottom: 10px;
      }
      &__desc {
        font-size: 15px;
        margin-bottom: 15px;
      }
      &__price {
        p {
          font-size: 30px;
          color: #553518;
        }
      }
    }
  }
  .side {
    &__desc {
      margin: 10px 0;
      width: 100%;
      background: #eee;
      &::before {
        content: "1";
        color: dodgerblue;
        background: dodgerblue;
      }
    }
    &__content {
      display: flex;
      padding: 0 8px;
      height: 350px;
      &__card {
        position: relative;
        width: 90px;
        height: 130px;
        background: #ccc;
        margin-right: 10px;
        &__checked {
          position: absolute;
          top: 5px;
          right: 5px;
        }
        &__image {
          width: 90px;
          height: 70px;
          background: #bbb;
        }
        &__content {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          height: 60px;
        }
      }
    }
  }
  footer {
    position: absolute;
    bottom: 0;
    padding: 10px 18px 20px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .footer-cancel {
      width: 38vw;
      border: none;
      color: white;
      background: gray;
      height: 40px;
      font-size: 20px;
      border-radius: 4px;
    }
    .footer-cart {
      background: #6796fc;
    }
  }
`;
