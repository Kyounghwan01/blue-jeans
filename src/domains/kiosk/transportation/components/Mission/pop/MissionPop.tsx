import { useEffect } from "react";
import styled from "styled-components";
import { PopLayoutBlock } from "components/common/BasicLayout/BasicLayout.styled";

interface IAlert {
  hideModal: () => void;
  extraData: {
    onClose: () => void;
  };
}

const MissionPop = ({ hideModal, extraData }: IAlert) => {
  const handleCheck = () => {
    hideModal();
    extraData.onClose();
  };

  useEffect(() => {
    const autoNext = setTimeout(() => {
      handleCheck();
    }, 5000);

    return () => {
      clearTimeout(autoNext);
    };
  }, []);

  return (
    <MissionBlock>
      <article>
        <div>
          <div>청춘이 캐릭터 이미지</div>
          <div>
            <p>오늘의 미션!</p>
            <p>양양가는 오전 11시</p>
            <p>티켓을 구입하세요!</p>
          </div>
        </div>
        <button className="next" onClick={handleCheck}>
          <span>확인</span>
        </button>
      </article>
    </MissionBlock>
  );
};

const MissionBlock = styled(PopLayoutBlock)`
  article {
    position: relative;
    background: white;
    width: 80%;
    height: 300px;
    border-radius: 4px;

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

export default MissionPop;
