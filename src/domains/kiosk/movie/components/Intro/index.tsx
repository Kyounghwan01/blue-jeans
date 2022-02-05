import { useDispatch } from "react-redux";
import { resetStore } from "features/kiosk/foodKioskSlice";
import Intro from "domains/kiosk/common/Intro";

const Index = ({ next }: { next: () => Promise<boolean> }) => {
  const dispatch = useDispatch();

  const init = () => {
    dispatch(resetStore());
  };

  return <Intro title="키오스크 체험" type="문화편" next={next} init={init} />;
};

export default Index;
