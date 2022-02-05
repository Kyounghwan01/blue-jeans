// import usePopup from "hooks/usePopup";
import Mission from "domains/kiosk/common/Mission";

const Index = ({ next }: { next: () => Promise<boolean> }) => {
  // const { handleDomainPopup } = usePopup();

  // useEffect(() => {
  //   handleDomainPopup(
  //     `kiosk/transportation/components/Mission/pop/MissionPop`,
  //     "미션",
  //     { onClose: next }
  //   );
  //   const autoNext = setTimeout(() => {
  //     next();
  //   }, 5000);
  //   return () => {
  //     clearTimeout(autoNext);
  //   };
  // }, []);

  return (
    <Mission next={next} img="청춘이 캐릭터 이미지">
      <div>
        <p>오늘의 미션!</p>
        <p>양양가는 오전 11시</p>
        <p>티켓을 구입하세요!</p>
      </div>
    </Mission>
  );
};

export default Index;
