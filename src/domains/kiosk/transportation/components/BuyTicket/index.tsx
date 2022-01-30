import { useEffect } from "react";
import styled from "styled-components";
import usePopup from "hooks/usePopup";
import useByTicket from "domains/kiosk/transportation/hooks/useByTicket";

const Index = ({ next }: { next: () => Promise<boolean> }) => {
  const { handlePopup } = usePopup();
  const { currentDate, handleCurrentDate } = useByTicket({ next });

  useEffect(() => {
    handleCurrentDate({ type: "current" });

    handlePopup("common/Alert", "", {
      desc: "승차권 구매를 눌러주세요!",
      autoClose: { time: 3000 }
    });
  }, []);

  return (
    <BuyTicketBlock>
      <section className="title">
        동서울 터미널
        <div>
          <p>{currentDate}</p>
        </div>
      </section>
      <section className="bus-img blink" onClick={next}>
        승차권 구매
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
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  .bus-img {
    height: 50px;
    width: 100px;
    margin: 20px auto;
    border: 1px solid grey;
    text-align: center;
    line-height: 50px;
  }
`;

export default Index;
