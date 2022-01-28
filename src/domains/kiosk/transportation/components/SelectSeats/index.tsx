import styled from "styled-components";
import useSeats from "domains/kiosk/transportation/hooks/useSeats";

const Index = ({ next }: { next: () => Promise<boolean> }) => {
  const {
    ticket,
    seats,
    isSelected,
    clickSeat,
    setIsSelected,
    clickPersonType,
    totalPrice
  } = useSeats({
    next
  });

  return (
    <SelectSeatsBlock>
      {seats.length && (
        <div className="seat">
          <div className="seat__row">
            {seats.map((seat, index) => (
              <div
                onClick={() => clickSeat(seat)}
                className={seat.type}
                key={index}
              >
                {seat.value !== "empty" && seat.value}
              </div>
            ))}
          </div>
        </div>
      )}
      {/* {JSON.stringify(ticket)} */}
      {isSelected && (
        <SelectPersonTypeBlock>
          <p onClick={() => clickPersonType("adult")}>어른</p>
          <p onClick={() => clickPersonType("child")}>어린이/초등</p>
          <p onClick={() => clickPersonType("kid")}>청소년</p>
          <p style={{ background: "grey" }}>보훈30</p>
          <p style={{ background: "grey" }}>보훈70</p>
          <p onClick={() => setIsSelected(prev => !prev)}>X 취소</p>
        </SelectPersonTypeBlock>
      )}

      <section className="bottom-area">
        <div className="bottom-area__pay">
          <div>총 결제금액</div>
          <div>{totalPrice.toLocaleString()}원</div>
        </div>
        <button onClick={next}>선택완료</button>
      </section>
    </SelectSeatsBlock>
  );
};

const SelectSeatsBlock = styled.article`
  position: relative;
  padding: 30px;
  height: 100%;
  .seat {
    &__row {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr;
      gap: 30px;
      margin-bottom: 30px;
      div {
        display: inline-block;
        border: 1px solid grey;
      }
    }
  }
  .empty {
    border: none !important;
  }
  .active {
    background: red;
  }
  .selected {
    background: blue;
  }
  .bottom-area {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 30px;
    display: flex;
    justify-content: space-between;
    &__pay {
      display: flex;
    }
  }
`;

const SelectPersonTypeBlock = styled.article`
  position: absolute;
  background: white;
  top: 20vh;
  left: 10%;
  z-index: 2;
  border: 1px solid gray;
  width: 100px;
  padding: 30px 10px 20px;
  p {
    padding: 3px;
    text-align: center;
    border: 1px solid gray;
    margin-bottom: 10px;
  }
`;

export default Index;
