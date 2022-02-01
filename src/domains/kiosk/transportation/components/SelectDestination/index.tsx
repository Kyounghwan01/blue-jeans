import useByTicket from "domains/kiosk/transportation/hooks/useByTicket";
import Step4SelectDestionation from "./Step4SelectDestionation";
import Step5SelectDestionation from "./Step5SelectDestionation";

const Index = ({ next }: { next: () => Promise<boolean> }) => {
  const { currentStep } = useByTicket({ next });

  return (
    <>
      {currentStep === 4 ? (
        <Step4SelectDestionation next={next} />
      ) : (
        <Step5SelectDestionation next={next} />
      )}
    </>
  );
};

export default Index;
