import styled from "styled-components";

interface IFooterStyle {
  bodyHeight: string | number;
  loadingState: boolean;
}

export const Block = styled.div<IFooterStyle>`
  width: 100vw;
  height: calc(var(--vh, 1vh) * 100);

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
      padding: 0px 0px 20px;
      width: 100%;
      height: ${props => props.bodyHeight};
      overflow-y: ${props => (props.loadingState ? "hidden" : "scroll")};
      overflow-x: hidden;
      &__empty {
        height: 50px;
      }
    }
  }
`;
