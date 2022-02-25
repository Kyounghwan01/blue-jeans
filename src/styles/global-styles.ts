import { createGlobalStyle, keyframes } from "styled-components";
import { normalize } from "styled-normalize";

const BlinkHint = keyframes`
  50% {
    opacity: 0.6;
  }
`;

export const GlobalStyle = createGlobalStyle`
  ${normalize}
  html,
  body {
    padding: 0;
    margin: 0;
    letter-spacing: -1px;
    font-size: 15px;
    font-family: 'Apple SD Gothic','Noto Sans KR','맑은고딕','Nanum Gothic',sans-serif !important;
  }

  .txt-c {
    text-align: center;
  }
  .txt-r {
    text-align: right;
  }
  .txt-l {
    text-align: left;
  }

  .blink {
    animation: ${BlinkHint} 1.5s step-end infinite;
  }

  p {
    margin: 0;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  * {
    box-sizing: border-box;
  }
`;
