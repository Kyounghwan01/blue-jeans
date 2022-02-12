import { useEffect, useCallback } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { setIsViewTotalMovie } from "features/kiosk/movieKioskSlice";
import { setCurrentDate } from "features/commonSlice";
import { getDateCustomFormat } from "utils";
import useSelectorTyped from "features/useSelectorTyped";

const Index = ({
  next
}: {
  next: (nextComponent?: string) => Promise<boolean>;
}) => {
  const dispatch = useDispatch();
  const { currentDate, currentTime } = useSelectorTyped(state => ({
    currentDate: state.common.currentDate,
    currentTime: state.common.currentTime
  }));

  useEffect(() => {
    dispatch(
      setCurrentDate([
        {
          type: "currentDate",
          value: getDateCustomFormat("M월 DD일 (ddd)")
        },
        {
          type: "currentTime",
          value: getDateCustomFormat("HH:mm")
        }
      ])
    );
  }, []);

  const handleNext = useCallback(
    (type: string | React.MouseEvent<HTMLDivElement>) => {
      dispatch(setIsViewTotalMovie(type === "totalView"));
      next();
    },
    []
  );

  return (
    <BuyTicketBlock>
      <div className="title">청춘 영화관</div>
      <div className="txt-c">
        <div>{currentDate}</div>
        <div>{currentTime}</div>
      </div>

      <div className="content">
        <div className="content__box" onClick={handleNext}>
          <div>티켓 구매</div>
          <div className="content__box__img">티켓 구매 이미지</div>
        </div>

        <div className="content__box" onClick={() => handleNext("totalView")}>
          <div>영화 상영 시간표</div>
          <div className="content__box__img">티켓 구매 이미지</div>
        </div>

        {/* <div className="content__box" onClick={() => next("ReservationTicket")}> */}
        <div className="content__box" onClick={() => next("ConfirmMovie")}>
          <div>예매 티켓 출력</div>
          <div className="content__box__img">티켓 구매 이미지</div>
        </div>
      </div>

      <div className="bottom-banner">광고배너</div>
    </BuyTicketBlock>
  );
};

const BuyTicketBlock = styled.article`
  position: relative;
  height: 100%;
  .title {
    position: absolute;
  }
  .content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 18px;
    &__box {
      padding: 10px;
      width: 30%;
      border: 1px solid gray;
      letter-spacing: -1px;
      &__img {
        margin-top: 50px;
      }
    }
  }
  .bottom-banner {
    background: gray;
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 10px;
    height: 80px;
  }
`;

export default Index;