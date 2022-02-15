import Mission from "domains/kiosk/common/Mission";

const Index = ({ next }: { next: () => Promise<boolean> }) => {
  return (
    <Mission next={next} img="청춘이 캐릭터 이미지">
      <div>
        <p>오늘의 미션!</p>
        <p>총 2명의</p>
        <p>영화 티켓을</p>
        <p>구매하세요.</p>
      </div>
    </Mission>
  );
};

export default Index;
