import BuyStart from "domains/kiosk/common/BuyStart";

const Index = ({ next }: { next: () => Promise<boolean> }) => {
  return <BuyStart next={next} title="청춘 영화관" img="티켓 이미지" />;
};

export default Index;
