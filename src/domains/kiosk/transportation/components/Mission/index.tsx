import styled from "styled-components";

const Index = ({ next }: { next: () => Promise<boolean> }) => {
  return (
    <MissionBlock>
      <section>
        <div>
          <div>청춘이 캐릭터 이미지</div>
          <div>
            <p>오늘의 미션!</p>
            <p>양양가는 오전 11시</p>
            <p>티켓을 구입하세요!</p>
          </div>
        </div>
        <button className="next" onClick={next}>
          <span>확인</span>
        </button>
      </section>
    </MissionBlock>
  );
};

const MissionBlock = styled.article`
  background: rgba(33, 38, 41, 0.5);
  height: 100%;
  width: 100%;
  position: relative;
  section {
    position: absolute;
    left: 5vw;
    top: 30vh;
    width: 90vw;
    /* height: 100px; */
    background: white;
    padding: 30px;

    .next {
      border: none;
      background: dodgerblue;
      border: 1px solid dodgerblue;
      border-radius: 4px;
      padding: 6px 30px;
      display: block;
      margin: 0 auto;
      span {
        font-size: 16px;
        font-weight: bold;
        color: white;
      }
    }
  }
`;

export default Index;
