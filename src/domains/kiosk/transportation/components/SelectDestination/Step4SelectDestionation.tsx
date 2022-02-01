import { useEffect, memo } from "react";
import styled from "styled-components";
import useByTicket from "domains/kiosk/transportation/hooks/useByTicket";
import usePopup from "hooks/usePopup";

const Step4SelectDestionation = ({
  next
}: {
  next: () => Promise<boolean>;
}) => {
  const { handleCurrentDate, dateWithoutTime } = useByTicket({
    next
  });
  const { handlePopup } = usePopup();

  useEffect(() => {
    handlePopup("common/Alert", "", {
      desc: "도착지 선택을 눌러주세요!",
      autoClose: { time: 3000 }
    });
  }, []);

  return (
    <SelectDestinationBlock>
      <section className="start-at">
        <div className="start-at__title custom-font-h1 txt-c">
          <span>출발일</span>
        </div>
        <div className="start-at__date">
          <button onClick={() => handleCurrentDate({ type: "prev" })}>
            이전날
          </button>
          <p className="custom-font-content">{dateWithoutTime}</p>
          <button onClick={() => handleCurrentDate({ type: "next" })}>
            다음날
          </button>
        </div>
      </section>

      <section className="location-wrapper">
        <div className="location-wrapper__time-block">
          <span>출발지</span>
          <div>동서울 터미널</div>
        </div>

        <div className="location-wrapper__arrow">{"->"}</div>

        <div className="location-wrapper__time-block blink" onClick={next}>
          <span>도착지</span>
          <div>도착지 선택</div>
        </div>
      </section>

      <p className="txt-c">도착지를 선택해주세요!</p>
    </SelectDestinationBlock>
  );
};

const SelectDestinationBlock = styled.article`
  margin: 0 10px;
  .start-at {
    &__title {
      margin: 50px 0 10px 0;
    }
    &__date {
      display: flex;
      justify-content: space-around;
      border-top: 1px solid grey;
      border-bottom: 1px solid gray;
      padding: 10px 0;
      margin-bottom: 50px;
      button {
        background: white;
        border: 1px solid grey;
        border-radius: 8px;
        padding: 5px 8px;
      }
    }
  }
  .location-wrapper {
    display: flex;
    justify-content: space-between;
    margin-bottom: 100px;
    &__time-block {
      width: 100px;
      text-align: center;
      border: 1px solid grey;
      div {
        height: 100px;
        line-height: 80px;
      }
    }
    &__arrow {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
`;

export default memo(Step4SelectDestionation);
