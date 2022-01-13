import { memo } from "react";
import styled from "styled-components";
import CountIcon from "components/atom/CountIcon";

interface IKioskCounter {
  count: number;
  order: string;
  increse: (type: string, order: string) => void;
  decrese: (type: string, order: string) => void;
}

const KioskCounter = ({ count, order, increse, decrese }: IKioskCounter) => {
  console.log("re-counter/");
  return (
    <KioskCounterBlock>
      <CountIcon type="decrese" onClick={() => decrese("remove", order)} />
      <div className="count">{count}</div>
      <CountIcon type="add" onClick={() => increse("add", order)} />
    </KioskCounterBlock>
  );
};

export default memo(KioskCounter);

const KioskCounterBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  .count {
    margin: 0 5px;
  }
`;
