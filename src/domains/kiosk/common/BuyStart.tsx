import styled from "styled-components";

interface IBuyStart {
  next: () => Promise<boolean>;
  img: string;
  title: string;
}

const BuyStart = ({ next, img, title }: IBuyStart) => {
  return (
    <StartByIndex>
      <section className="title">{title}</section>
      <section className="bus-img">{img}</section>
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

export default BuyStart;
