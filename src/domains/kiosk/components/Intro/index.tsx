import { useState, useEffect } from "react";
import styled, { css, keyframes } from "styled-components";
import usePopup from "hooks/usePopup";
import Tooltip from "@mui/material/Tooltip";

const Index = ({ next }: { next: () => Promise<boolean> }) => {
  const { handlePopup } = usePopup();
  const [hint, setHint] = useState<null | number>(null);
  useEffect(() => {
    handlePopup("common/Alert", "", {
      desc: "주문하기 버튼을 클릭해주세요!",
      autoClose: { time: 3000 },
    });

    const introHint = setTimeout(() => {
      setHint(1);
    }, 7000);

    // step으로 나누고 힌트도 null이거나 스탭 명으로 주면 되겠네.
    // 그에따라 props으로 css 힌트 값을 넘기면 되겠네
    return () => clearTimeout(introHint);
  }, []);

  return (
    <Block hint={hint}>
      {/* {hint && (
        <article className="hint">
          <div className="hint__order-button" />
        </article>
      )} */}
      <article className="main">
        <Tooltip title="클릭해주세요" open={hint === 1} arrow placement="top">
          <button
            className="main__order-button custom-font-buttom-button"
            onClick={next}
          >
            주문하기
          </button>
        </Tooltip>
      </article>
    </Block>
  );
};

const Block = styled.article<{ hint: null | number }>`
  position: relative;
  background: ${(props) => (props.hint ? "rgba(114, 114, 114, 0.3)" : "#fff")};
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
      ${(props) =>
        props.hint === 1 &&
        css`
          animation: ${BlinkHint} 1.5s step-end infinite;
        `}
    }
  }
  .hint {
    /* 여기는 힌트가 있을때만 발현할꺼야, 그리고 힌트의 number에 따라서 HTML CSS가 달라져야해 */
    height: 100%;
    width: 100%;
    top: 0;
    &__order-button {
      width: calc(50% + 30px);
      height: 100px;
      background: white;
      border-radius: 32px;
      position: fixed;
      left: calc(50% - 25vw - 15px); // 원본 left - 늘어난width/2
      bottom: 75px; // 원복 Height - (원본 height - 배경 height) / 2
    }
  }
`;

export const BlinkHint = keyframes`
  50% {
    opacity: 0.5;
  }
`;

export default Index;
