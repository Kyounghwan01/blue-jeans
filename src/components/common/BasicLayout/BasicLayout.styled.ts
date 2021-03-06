import styled from "styled-components";

interface IFooterStyle {
  bodyHeight: string | number;
  loadingState: boolean;
}

export const CustomFont = styled.div`
  .custom-font-h1 {
    font-size: ${props => props.theme.palette.customFont.h1};
  }
  .custom-font-content {
    font-size: ${props => props.theme.palette.customFont.content};
  }
  .custom-font-header-title {
    font-size: ${props => props.theme.palette.customFont.headerTitle};
  }
  .custom-font-list-title {
    font-size: ${props => props.theme.palette.customFont.listTitle};
  }
  .list-title {
    span {
      font-size: ${props => props.theme.palette.customFont.listTitle};
    }
  }
  .MuiTab-root {
    font-size: ${props => props.theme.palette.customFont.tabTitle};
  }
  .custom-font-buttom-button {
    font-weight: bold;
    font-size: ${props => props.theme.palette.customFont.bottomButton};
  }
`;

export const PopLayoutBlock = styled(CustomFont)`
  padding: 0;
  background: rgba(33, 38, 41, 0.5);
  height: 100vh;
  width: 100%;
  position: fixed;
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const Block = styled(CustomFont)<IFooterStyle>`
  width: 100vw;
  height: calc(var(--vh, 1vh) * 100); // 채팅에서는 이게 맞음
  /* height: 100vh; */

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
