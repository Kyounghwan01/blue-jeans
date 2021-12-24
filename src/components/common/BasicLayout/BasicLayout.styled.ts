import styled from "styled-components";

interface IFooterStyle {
  bodyHeight: string | number;
  loading: boolean;
}

export const Block = styled.div<IFooterStyle>`
  width: 100vw;
  height: 100vh;
  .base-layout {
    &__header {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      text-align: center;
      z-index: 1;
    }
    &__body {
      position: relative;
      padding: 30px 16px 20px;
      width: 100%;
      background: blue;
      height: ${props => props.bodyHeight};
      overflow-y: ${props => (props.loading ? "hidden" : "scroll")};
      overflow-x: hidden;
      &__empty {
        height: 60px;
      }
    }
  }
`;
