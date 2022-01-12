import styled from "styled-components";
import CountIcon from "components/atom/CountIcon";

interface IKioskCounter {
  count: number;
  increse: () => void;
  decrese: () => void;
}

export default function KioskCounter({
  count,
  increse,
  decrese
}: IKioskCounter) {
  return (
    <KioskCounterBlock>
      <CountIcon type="decrese" onClick={decrese} />
      <div className="count">{count}</div>
      <CountIcon type="add" onClick={increse} />
    </KioskCounterBlock>
  );
}

const KioskCounterBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  .count {
    margin: 0 5px;
  }
`;
