import { useEffect } from "react";
import usePopup from "hooks/usePopup";

const Index = ({ next }: { next: () => Promise<boolean> }) => {
  const { handleDomainPopup } = usePopup();

  useEffect(() => {
    handleDomainPopup(
      `kiosk/transportation/components/Mission/pop/MissionPop`,
      "미션",
      { onClose: next }
    );
  }, []);

  return <></>;
};

export default Index;
