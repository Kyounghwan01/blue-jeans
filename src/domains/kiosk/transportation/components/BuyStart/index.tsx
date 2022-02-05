import BuyStart from "domains/kiosk/common/BuyStart";

const Index = ({ next }: { next: () => Promise<boolean> }) => {
  return <BuyStart next={next} title="청춘 Bus" img="버스 이미지" />;
};

export default Index;
