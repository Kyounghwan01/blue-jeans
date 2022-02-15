import { Dispatch, SetStateAction, useEffect, memo } from "react";
import styled from "styled-components";

interface IProgressBar {
  percent: number;
  setPercent: Dispatch<SetStateAction<number>>;
  actionFunc: () => void;
}

const ProgressBar = ({ percent = 0, setPercent, actionFunc }: IProgressBar) => {
  useEffect(() => {
    const animate = requestAnimationFrame(() =>
      setPercent((prev: number) => prev + 1)
    );

    if (percent === 100) {
      cancelAnimationFrame(animate);
      actionFunc();
      return;
    }
  }, [percent]);

  return (
    <ProgressBarBlock>
      <Progess width={percent} />
    </ProgressBarBlock>
  );
};

export default memo(ProgressBar);

const ProgressBarBlock = styled.section`
  display: flex;
  height: 6px;
  margin: 20px 10px;
  width: calc(100% - 20px);
  background: #e5e5e5;
  border-radius: 16px;
`;

const Progess = styled.div<{ width: number }>`
  /* transition: width 1s; */
  width: ${props => `${props.width}%`};
  background: red;
  border-radius: 16px;
`;
