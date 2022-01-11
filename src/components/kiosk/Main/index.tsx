import styled from "styled-components";
import RemoveSharpIcon from "@mui/icons-material/RemoveSharp";
import AddSharpIcon from "@mui/icons-material/AddSharp";
import { kioskProducts, kioskTab } from "utils/constants";

const Index = ({
  next,
  back
}: {
  next: () => Promise<boolean>;
  back: () => Promise<boolean>;
}) => {
  return (
    <Block>
      <section className="tab">
        {kioskTab.map(el => (
          <div key={el.type}>
            <span>{el.label}</span>
          </div>
        ))}
      </section>
      {/* <button onClick={back}>이전</button>
      <button onClick={next}>다음</button> */}
      <div className="main">
        {kioskProducts
          .filter(product => product.type === "fork")
          .map(product => (
            <div className="main__product-wrapper" key={product.name}>
              <div className="main__product-wrapper__img"></div>
              <div className="main__product-wrapper__content">
                {product.name} <br /> {product.price}
              </div>
            </div>
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
            <div className="bill__list__menu__wrapper">
              <div>01 무공돈까스</div>
              <div className="bill__list__menu__count">
                <div
                  className="icon-wrap"
                  style={{
                    background: "dodgerblue",
                    width: "25px",
                    height: "25px",
                    borderRadius: "4px",
                    textAlign: "center",
                    display: "inline-block"
                  }}
                >
                  <RemoveSharpIcon style={{ color: "white" }} />
                </div>

                <div style={{ margin: "0 5px", display: "inline-block" }}>
                  2
                </div>
                <div
                  className="icon-wrap"
                  style={{
                    background: "dodgerblue",
                    width: "25px",
                    height: "25px",
                    borderRadius: "4px",
                    textAlign: "center",
                    display: "inline-block"
                  }}
                >
                  <AddSharpIcon style={{ color: "white" }} />
                </div>
              </div>
              <div>17,8000</div>
              <div>x</div>
            </div>
          </div>
        </div>

        <div className="bill__footer">
          <div className="bill__footer__count">
            <div className="bill__footer__count__amount">
              <div>주문수량</div>
              <div>2</div>
            </div>
            <div className="bill__footer__count__price">
              <div>주문금액</div>
              <div>17,800</div>
            </div>
          </div>
          <div className="bill__footer__card">
            <div className="bill__footer__card__cancel">
              전체
              <br />
              취소
            </div>
            <div className="bill__footer__card__payment">payco</div>
            <div className="bill__footer__card__payment">카드결제</div>
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
    &__product-wrapper {
      border-radius: 4px;
      background-color: grey;
      &__img {
        border-radius: 4px 4px 0 0;
        background-color: #aaa;
        height: 80px;
      }
      &__content {
        color: white;
        padding: 5px 0;
        text-align: center;
      }
    }
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
        height: 20vh;
        border-bottom: 1px solid grey;
        overflow-y: auto;
        &__wrapper {
          padding-bottom: 8px;
          display: grid;
          grid-template-columns: 5fr 3fr 2fr 1fr;
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
