import { useRouter } from "next/router";
import styled from "styled-components";
import PlainButton from "components/atom/PlainButton";

const Index = () => {
  const router = useRouter();
  return (
    <FinishBlock>
      <p>교통 키오스크</p>
      <p>체험을</p>
      <p>성공했습니다!</p>
      <p>아래 종료 버튼을 눌러주세요!</p>

      <div className="finish-btn">
        <PlainButton
          isBlink={true}
          onClick={() => router.push("/education")}
          text="종료"
        />
      </div>
    </FinishBlock>
  );
};

const FinishBlock = styled.article`
  .finish-btn {
    position: fixed;
    bottom: 100px;
    left: calc(50% - 25vw);
  }
`;

export default Index;
