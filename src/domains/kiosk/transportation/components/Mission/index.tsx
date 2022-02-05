import { useEffect } from "react";
import styled from "styled-components";
import usePopup from "hooks/usePopup";

const Index = ({ next }: { next: () => Promise<boolean> }) => {
  const { handleDomainPopup } = usePopup();

  useEffect(() => {
    handleDomainPopup(
      `kiosk/transportation/components/Mission/pop/MissionPop`,
      "미션",
      { onClose: next }
    );
    const autoNext = setTimeout(() => {
      next();
    }, 5000);
    return () => {
      clearTimeout(autoNext);
    };
  }, []);

  return (
    <MissionBlock>
      <div className="wrapper">
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
      </div>
    </MissionBlock>
  );
};

const MissionBlock = styled.article`
  background: rgba(33, 38, 41, 0.5);
  height: 100%;
  .wrapper {
    position: relative;
    top: 20%;
    margin: 0 auto;
    background: white;
    width: 80%;
    height: 300px;
  }

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
`;

export default Index;
