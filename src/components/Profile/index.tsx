import styled from "styled-components";

const Index = () => {
  return (
    <Block>
      <article>awdawd</article>
    </Block>
  );
};

const Block = styled.dialog`
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
  letter-spacing: -1px;
  article {
    background: white;
    position: relative;
    top: -40px;
    width: 80vw;
    border-radius: 8px;
    padding: 20px;
  }
`;
export default Index;
