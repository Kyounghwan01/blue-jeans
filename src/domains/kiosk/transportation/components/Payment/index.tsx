import { useCallback } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { RootState } from "app/store";
import styled from "styled-components";

const Index = ({ next }: { next: () => Promise<boolean> }) => {
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

  // todo: seats type 커스텀, 몇초후에 완료화면으로 이동
  const mapSeatType = useCallback((type: string) => {
    // 한번에 맵 돌려서 어떠한 타입이 몇매인지 알아야함

    switch (type) {
      case "adult":
        return "어른";
      case "child":
        return "어린이/초등";
      case "kid":
        return "청소년";
      default:
        break;
    }
  }, []);

  return (
    <PaymentBlock>
      <div>{JSON.stringify(currentDate)}</div>

      <div>
        <div>동서울 터미널 / 버스 회사 / {ticket.company}</div>
      </div>
      <div>
        {Math.floor(ticket.time)}시간 {!Number.isInteger(ticket.time) && "30분"}{" "}
        소요
      </div>
      <div>버스등급: {ticket.grade === "common" ? "일반" : "우등"}</div>
      <div>티켓수량: {selectedSeats.length}</div>
      <div>
        {selectedSeats.map((seat, index) => (
          <div key={index}>{seat.personType}</div>
        ))}
      </div>

      <div>{JSON.stringify(selectedSeats)}</div>
      <div>{JSON.stringify(ticket)}</div>
      <div>{JSON.stringify(location)}</div>
      <div>{JSON.stringify(totalPrice)}</div>
    </PaymentBlock>
  );
};

const PaymentBlock = styled.article``;

export default Index;
