import { useEffect } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { IComponentRoute } from "features/types/commonSliceType";
import { setSeatInfo } from "features/kiosk/movieKioskSlice";
import usePopup from "hooks/usePopup";
import { IMovieSeats } from "features/types/movieSliceType";
import { MovieSeats } from "utils/constants";
import useSelectorTyped from "features/useSelectorTyped";

const SelectSeat = ({ back, next }: IComponentRoute) => {
  const { handleDomainPopup } = usePopup();
  const dispatch = useDispatch();
  const { totalPrice } = useSelectorTyped(state => ({
    totalPrice: state.movieKiosk.totalPrice
  }));

  useEffect(() => {
    dispatch(setSeatInfo([]));

    handleDomainPopup(
      `kiosk/movie/components/SelectSeat/pop/SelectSeatsNumPop`,
      "",
      {
        onClose: {
          cancel: back,
          confirm: (seat: IMovieSeats[]) => dispatch(setSeatInfo(seat))
        }
      }
    );
  }, []);

  return (
    <SelectSeatBlock>
      좌석 선택
      <div>총금액 {totalPrice.toLocaleString()}원</div>
      <div>SCREEN</div>
      <div className="seat-wrapper">
        {MovieSeats.map((seat, index) => {
          return (
            <div
              className="txt-c"
              style={{
                border:
                  typeof seat.label === "number" ? "1px solid gray" : "none"
              }}
              key={index}
            >
              {seat.label}
            </div>
          );
        })}
      </div>
      <div>
        <button>결제하기</button>
      </div>
    </SelectSeatBlock>
  );
};

// 갯수만큼 오른쪽 스캔해서 넣고 오른쪽 없으면 카운트 내리고 다른 쪽 선택가능하게

const SelectSeatBlock = styled.article`
  .seat-wrapper {
    display: grid;
    gap: 10px;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 0.5fr 1fr 1fr 1fr 1fr 1fr;
    padding: 10px 18px;
  }
`;

export default SelectSeat;
