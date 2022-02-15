import styled from "styled-components";
import { IComponentRoute } from "features/types/commonSliceType";
import useSelectSeat from "domains/kiosk/movie/hooks/useSelectSeat";

const SelectSeat = ({ back, next }: IComponentRoute) => {
  const { seats, handleSetSeat, totalPrice, disabledNextBtn } = useSelectSeat({
    back,
    next
  });

  return (
    <SelectSeatBlock>
      좌석 선택
      <div>총금액 {totalPrice.toLocaleString()}원</div>
      <div>SCREEN</div>
      <div className="seat-wrapper">
        {seats.map((seat, index) => {
          return (
            <div
              className="txt-c"
              style={{
                border:
                  typeof seat.label === "number" ? "1px solid gray" : "none",
                background: seat.isSelected
                  ? "red"
                  : typeof seat.label === "number" && disabledNextBtn
                  ? "gray"
                  : "white"
              }}
              key={index}
              onClick={() => handleSetSeat(seat.value)}
            >
              {seat.label}
            </div>
          );
        })}
      </div>
      <div>
        <button disabled={!disabledNextBtn} onClick={next}>
          결제하기
        </button>
      </div>
    </SelectSeatBlock>
  );
};

const SelectSeatBlock = styled.article`
  .seat-wrapper {
    display: grid;
    gap: 10px;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 0.5fr 1fr 1fr 1fr 1fr 1fr;
    padding: 10px 18px;
  }
`;

export default SelectSeat;
