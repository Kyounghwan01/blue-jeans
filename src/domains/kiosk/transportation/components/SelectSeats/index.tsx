import { useEffect, useCallback } from "react";
import styled from "styled-components";
import useSeats from "domains/kiosk/transportation/hooks/useSeats";
import usePopup from "hooks/usePopup";
import { busSeatType } from "features/types/transportationKioskSliceType";
import SelectPersonPop from "./pop/SelectPersonPop";

const Index = ({ next }: { next: () => Promise<boolean> }) => {
  const {
    currentSeat,
    seats,
    isSelected,
    clickSeat,
    setIsSelected,
    clickPersonType,
    totalPrice
  } = useSeats();
  const { handlePopup } = usePopup();

  useEffect(() => {
    handlePopup("common/Alert", "", {
      desc: `<div>12번 좌석 선택 후 어른을 누르세요 <br />그리고 선택완료를 누르세요</div>`,
      autoClose: { time: 3000 }
    });
  }, []);

  const isBlink = useCallback((seat: busSeatType) => {
    if (seat.value === 12) {
      return `${seat.type} ${seat.type !== "selected" && "blink"}`;
    } else {
      return seat.type;
    }
  }, []);

  return (
    <SelectSeatsBlock>
      {seats.length && (
        <div className="seat">
          <div className="seat__row">
            {seats.map((seat, index) => {
              return (
                <div
                  onClick={() => clickSeat(seat)}
                  className={isBlink(seat)}
                  key={index}
                >
                  {seat.value !== "empty" && seat.value}
                </div>
              );
            })}
          </div>
        </div>
      )}
      {isSelected && (
        <SelectPersonPop
          clickPersonType={clickPersonType}
          setIsSelected={setIsSelected}
          seatNumber={currentSeat.seat}
        />
      )}

      <section className="bottom-area">
        <div className="bottom-area__pay">
          <div>총 결제금액</div>
          <div>{totalPrice.toLocaleString()}원</div>
        </div>
        <button
          className={`${seats[19].type === "selected" && "blink"}`}
          onClick={next}
        >
          선택완료
        </button>
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

export default Index;
