import { useMemo, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "app/store";
import { useRouter } from "next/router";
import { setCurrentStep, resetStore } from "features/educationSlice";
import BasicLayout from "components/common/BasicLayout";
import Step from "components/common/Step";

// todo: 튜토리얼, 시간 지나면 힌트, 초기화

const components = [
  { step: "Intro", title: "주문시작", header: false },
  { step: "Main", title: "동의서작성", header: false },
  { step: "Detail", title: "예상 수리비 산출내역서", header: true },
  { step: "Complete", title: "예상 수리비 산출내역서", header: true }
];

const Index = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { currentStep } = useSelector((state: RootState) => state.education);

  useEffect(() => {
    if (router.asPath.split("?page=")[1]) {
      router.push("/education/kiosk/tutorial?page=Intro");
    }
    dispatch(resetStore());
  }, []);

  const page = useMemo(() => {
    return router.query.page !== undefined ? router.query.page : "Intro";
  }, [router.query]);

  const movePage = useCallback((pageName: string) => {
    const path = `/education/kiosk/tutorial?page=${pageName}`;
    return router.push(path, path, { shallow: true });
  }, []);

  const back = useCallback(() => {
    const backIndex = currentStep - 1;
    if (currentStep > 0) {
      dispatch(setCurrentStep(backIndex));
      return movePage(components[backIndex].step);
    }
  }, [currentStep]);

  const next = useCallback(() => {
    const nextIndex = currentStep + 1;
    dispatch(setCurrentStep(nextIndex));
    return movePage(components[nextIndex].step);
  }, [currentStep]);

  const handleBackButton = useCallback(() => {
    return currentStep !== 0 ? back() : router.push("/education");
  }, [currentStep]);

  return (
    <BasicLayout
      headerTitle={components[currentStep].title}
      back={true}
      footer={false}
      backFunc={handleBackButton}
    >
      <Step
        name={`kiosk/${page}`}
        back={back}
        next={next}
        movePage={movePage}
      />
    </BasicLayout>
  );
};

export default Index;
