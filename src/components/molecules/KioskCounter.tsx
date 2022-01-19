import { memo } from "react";
import styled from "styled-components";
import CountIcon from "components/atom/CountIcon";

interface IKioskCounter {
  count: number;
  order: string;
  increse: (type: string, order: string, isHint: boolean) => void;
  decrese: (type: string, order: string, isHint: boolean) => void;
  isHint: boolean;
}

const KioskCounter = ({
  count,
  order,
  increse,
  decrese,
  isHint
}: IKioskCounter) => {
  return (
    <KioskCounterBlock>
      <CountIcon
        type="decrese"
        onClick={() => decrese("remove", order, false)}
        isHint={false}
      />
      <div className="count">{count}</div>
      <CountIcon
        type="add"
        isHint={isHint}
        onClick={() => increse("add", order, isHint)}
      />
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
