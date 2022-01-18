import { useState, useMemo, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { resetStore } from "features/educationSlice";
import BasicLayout from "components/common/BasicLayout";
import Step from "components/common/Step";

// todo: 튜토리얼, 시간 지나면 힌트, 초기화

const components = [
  {
    step: "Intro",
    title: "주문시작",
    header: false,
    hint: [{ desc: "주문하기 버튼을 클릭해주세요!" }],
  },
  {
    step: "Main",
    title: "메뉴 선택",
    header: false,
    hint: [
      { desc: "무공 돈까스를 클릭해주세요!" },
      { desc: "무공 돈까스에 공깃밥을 추가해주세요!" },
      { desc: "무공 돈까스를 하나 더 추가해주세요!" },
      { desc: "결제 버튼을 클릭해주세요!" },
    ],
  },
];

const Index = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [currentStep, setCurrentStep] = useState(0);

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
      setCurrentStep(backIndex);
      return movePage(components[backIndex].step);
    }
  }, [currentStep]);

  const next = useCallback(() => {
    const nextIndex = currentStep + 1;
    setCurrentStep(nextIndex);
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
        name={`kiosk/components/${page}`}
        back={back}
        next={next}
        movePage={movePage}
        hint={components[currentStep].hint}
      />
    </BasicLayout>
  );
};

export default Index;
