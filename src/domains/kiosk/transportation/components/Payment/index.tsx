import { useCallback, useEffect } from "react";
import { useSelector, shallowEqual } from "react-redux";
import { RootState } from "app/store";
import styled from "styled-components";

const Index = ({
  back,
  next
}: {
  back: () => Promise<boolean>;
  next: () => Promise<boolean>;
}) => {
  const { selectedSeats, ticket, currentDate, location, totalPrice } =
    useSelector((state: RootState) => {
      const { selectedSeats, ticket, currentDate, location, totalPrice } =
        state.transportationKiosk;
      return {
        selectedSeats,
        ticket,
        currentDate,
        location,
        totalPrice
      };
    }, shallowEqual);

  useEffect(() => {
    const timer: NodeJS.Timeout = setTimeout(() => {
      next();
    }, 7000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  // todo: seats type 커스텀, 몇초후에 완료화면으로 이동
  const mapSeatType = useCallback(
    (type: string) => {
      switch (type) {
        case "adult":
          return "어른";
        case "child":
          return "어린이/초등";
        case "kid":
          return "청소년";
        default:
          return "어른";
      }
    },
    [selectedSeats]
  );

  return (
    <PaymentBlock>
      <div>{JSON.stringify(currentDate)}</div>

      <div>
        <div>동서울 터미널 / 버스 회사 / {ticket.company}</div>
        <div>도착지: {location}</div>
      </div>
      <div>
        {Math.floor(ticket.time)}시간 {!Number.isInteger(ticket.time) && "30분"}
        소요
      </div>
      <div>버스등급: {ticket.grade === "common" ? "일반" : "우등"}</div>
      <div>티켓수량: {selectedSeats.length}</div>
      <div>
        {selectedSeats.map((seat, index) => (
          <div key={index}>
            {seat.seat} / {mapSeatType(seat.personType)}
          </div>
        ))}
      </div>

      <div
        style={{
          border: "1px solid grey",
          display: "flex",
          justifyContent: "space-between"
        }}
      >
        <div>결제금액</div>
        <div>{totalPrice.toLocaleString()}원</div>
      </div>

      <div
        style={{ border: "1px solid gray", height: "100px" }}
        className="txt-c"
      >
        카드 투입 설명 이미지
      </div>

      <div>* IC 카드를 투입해주세요.</div>

      <button onClick={back}>결제 취소</button>
    </PaymentBlock>
  );
};

const PaymentBlock = styled.article``;

export default Index;
