import styled from "styled-components";

const Index = ({ next }: { next: () => Promise<boolean> }) => {
  return (
    <StartByIndex>
      <section className="title">청춘 Bus</section>
      <section className="bus-img">버스 이미지</section>
      <button className="next-btn blink" onClick={next}>
        시작하기
      </button>
    </StartByIndex>
  );
};

const StartByIndex = styled.article`
  .title {
    margin-top: 100px;
    text-align: center;
    font-size: 30px;
    font-weight: bold;
  }
  .bus-img {
    height: 100px;
    width: 100px;
    margin: 100px auto;
    background: grey;
  }
  .next-btn {
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
  }
`;

export default Index;
