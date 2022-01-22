import styled from "styled-components";

const Index = ({ next }: { next: () => Promise<boolean> }) => {
  return (
    <MissionBlock>
      오늘의 미션! 양양가는 오전 11시 티켓을 구입하세요!
      <button className="next" onClick={next}>
        확인
      </button>
    </MissionBlock>
  );
};

const MissionBlock = styled.article``;

export default Index;
