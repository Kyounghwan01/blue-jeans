import styled from "styled-components";
import KioskCounter from "components/molecules/KioskCounter";

interface IKioskCounter {
  count: number;
  increse: () => void;
  decrese: () => void;
}

export default function KioskOrder({ count, increse, decrese }: IKioskCounter) {
  return (
    <KioskOrderBlock>
      <div className="list">
        <div className="list__divide">
          <div>메뉴</div>
          <div>수량</div>
          <div>가격</div>
          <div></div>
        </div>
        <div className="list__menu">
          <div className="list__menu__wrapper">
            <div>01 무공돈까스</div>
            <div className="list__menu__count">
              <KioskCounter count={count} increse={increse} decrese={decrese} />
            </div>
            <div>17,8000</div>
            <div>x</div>
          </div>
        </div>
      </div>
    </KioskOrderBlock>
  );
}

const KioskOrderBlock = styled.section`
  .list {
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
`;
