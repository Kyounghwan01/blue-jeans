import { useState } from "react";
import styled from "styled-components";
import { IComponentRoute } from "features/types/commonSliceType";
import ProgressBar from "components/atom/ProgressBar";

const Index = ({ next }: IComponentRoute) => {
  const [percent, setPercent] = useState(0);

  return (
    <ReservationTicketBlock>
      <div>티켓을 출력하고 있습니다!</div>
      <ProgressBar
        percent={percent}
        setPercent={setPercent}
        actionFunc={next}
      />
      <div>{percent}%</div>
      <div>잠시만 기다려 주세요.</div>
    </ReservationTicketBlock>
  );
};

const ReservationTicketBlock = styled.article``;

export default Index;
