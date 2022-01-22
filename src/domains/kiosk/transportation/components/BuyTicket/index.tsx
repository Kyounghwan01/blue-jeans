import styled from "styled-components";
import dayjs from "dayjs";

const Index = ({ next }: { next: () => Promise<boolean> }) => {
  return (
    <BuyTicketBlock>
      <section className="title"> 동서울 터미널 </section>
      <section className="bus-img" onClick={next}>
        승차권 구매 {dayjs().format("YYYY-MM-DD (ddd)")}
        <p>{dayjs().format("HH:mm")}</p>
      </section>
      <section className="bus-img">예매한 승차권</section>
      <section className="bus-img">승차권 환불</section>
    </BuyTicketBlock>
  );
};

const BuyTicketBlock = styled.article`
  .title {
    margin-top: 20px;
    text-align: center;
    font-size: 20px;
  }
  .bus-img {
    height: 100px;
    width: 100px;
    margin: 20px auto;
    background: grey;
  }
`;

export default Index;
