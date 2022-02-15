import { useState, useEffect, memo } from "react";
import styled from "styled-components";
import { PopLayoutBlock } from "components/common/BasicLayout/BasicLayout.styled";

interface IAlert {
  hideModal: () => void;
  extraData: {
    onClose: () => void;
  };
}

const AccPointPop = ({ hideModal, extraData }: IAlert) => {
  const [step, setStep] = useState(1);

  useEffect(() => {
    if (step === 1) return;

    const autoClose: NodeJS.Timeout = setTimeout(() => {
      hideModal();
      extraData.onClose();
    }, 3000);
    return () => {
      clearTimeout(autoClose);
    };
  }, [step]);

  return (
    <AccPointPopBlock>
      <article>
        {step === 1 ? (
          <>
            <div>포인트 적립</div>
            <div>
              포인트 적립을 위해 바코드를 하단 좌측에 대어주세요. 적립이
              필요하지 않을 경우 skip을 눌러주세요.
            </div>
            <div>이미지</div>
            <div onClick={() => setStep(prev => prev + 1)}>Skip</div>
          </>
        ) : (
          <>
            <div>신용카드 결제</div>
            <div>
              결제할 신용카드를 넣어주세요. IC 칩이 앞으로 보이게 넣어주세요.
            </div>
            <div>이미지</div>
          </>
        )}
      </article>
    </AccPointPopBlock>
  );
};

const AccPointPopBlock = styled(PopLayoutBlock)`
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

export default memo(AccPointPop);
