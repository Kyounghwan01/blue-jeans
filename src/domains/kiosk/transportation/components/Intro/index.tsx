import { useEffect } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { resetStore } from "features/kiosk/foodKioskSlice";

const Index = ({ next }: { next: () => Promise<boolean> }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetStore());
  }, []);

  return (
    <Block>
      <article className="main">
        <section className="main__title">키오스크 체험</section>
        <section className="main__type">교통편</section>
        <button className="main__order-button blink" onClick={next}>
          시작하기
        </button>
      </article>
    </Block>
  );
};

const Block = styled.article`
  position: relative;
  background: "#fff";
  transition: background 1s ease-out;
  height: 100%;
  .main {
    position: absolute;
    top: 0;
    height: 100%;
    width: 100%;
    &__title {
      margin-top: 100px;
      text-align: center;
      font-size: 30px;
      font-weight: bold;
    }
    &__type {
      text-align: center;
      margin-top: 50px;
      font-size: 20px;
    }
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
    }
  }
`;

export default Index;
