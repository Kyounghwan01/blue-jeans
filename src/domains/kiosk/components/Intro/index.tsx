import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import styled, { css, keyframes } from "styled-components";
import usePopup from "hooks/usePopup";
import { resetStore } from "features/educationSlice";

const Index = ({
  next,
  hint
}: {
  next: () => Promise<boolean>;
  hint: { desc: string }[];
}) => {
  const dispatch = useDispatch();
  const { handlePopup } = usePopup();
  const [visualHint, setVisualHint] = useState<number>(-1);

  useEffect(() => {
    dispatch(resetStore());
    handlePopup("common/Alert", "", {
      desc: hint[0].desc,
      autoClose: { time: 3000 }
    });

    const introHint = setTimeout(() => {
      setVisualHint(0);
    }, 7000);

    return () => clearTimeout(introHint);
  }, []);

  return (
    <Block visualHint={visualHint}>
      <article className="main">
        <button className="main__order-button" onClick={next}>
          주문하기
        </button>
      </article>
    </Block>
  );
};

const Block = styled.article<{ visualHint: number }>`
  position: relative;
  background: ${props =>
    props.visualHint === 0 ? "rgba(114, 114, 114, 0.3)" : "#fff"};
  transition: background 1s ease-out;
  height: 100%;
  .main {
    position: absolute;
    top: 0;
    height: 100%;
    width: 100%;
    &__order-button {
      width: 50vw;
      height: 50px;
      border-radius: 8px;
      border: none;
      background-color: dodgerblue;
      color: white;
      position: fixed;
      bottom: 100px;
      left: calc(50% - 25vw);
      font-size: 18px;
      font-weight: bold;
      ${props =>
        props.visualHint === 0 &&
        css`
          animation: ${BlinkHint} 1.5s step-end infinite;
        `}
    }
  }
`;

export const BlinkHint = keyframes`
  50% {
    opacity: 0.5;
  }
`;

export default Index;
