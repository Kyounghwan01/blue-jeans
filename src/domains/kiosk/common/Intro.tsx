import { useEffect } from "react";
import styled from "styled-components";
import PlainButton from "components/atom/PlainButton";

const Index = ({
  next,
  init,
  title,
  type,
  bannerImg
}: {
  next: () => Promise<boolean>;
  init: () => void;
  title: string;
  type: string;
  bannerImg?: string;
}) => {
  useEffect(() => {
    init();
  }, []);

  return (
    <Block>
      <article className="main">
        <section className="main__title">{title}</section>
        <section className="main__type">{type}</section>
        {bannerImg && (
          <div className="txt-c">
            <img src={bannerImg} alt="배너이미지" />
          </div>
        )}
        <div className="main__start-btn">
          <PlainButton isBlink={true} onClick={next} text="시작하기" />
        </div>
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
    &__start-btn {
      position: fixed;
      bottom: 100px;
      left: calc(50% - 25vw);
    }
  }
`;

export default Index;
