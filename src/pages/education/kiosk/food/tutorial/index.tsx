import { useState, useMemo, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { resetStore } from "features/kiosk/foodKioskSlice";
import BasicLayout from "components/common/BasicLayout";
import Step from "components/common/Step";
import { food } from "utils/constants/componentsPath";

const Index = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (router.asPath.split("?page=")[1]) {
      router.push(`${food.basicRoute}?page=Intro`);
    }
    dispatch(resetStore());
  }, []);

  const page = useMemo(() => {
    return router.query.page !== undefined ? router.query.page : "Intro";
  }, [router.query]);

  const movePage = useCallback((pageName: string) => {
    const path = `${food.basicRoute}?page=${pageName}`;
    return router.push(path, path, { shallow: true });
  }, []);

  const back = useCallback(() => {
    const backIndex = currentStep - 1;
    if (currentStep > 0) {
      setCurrentStep(backIndex);
      return movePage(food.components[backIndex].step);
    }
  }, [currentStep]);

  const next = useCallback(() => {
    const nextIndex = currentStep + 1;
    setCurrentStep(nextIndex);
    return movePage(food.components[nextIndex].step);
  }, [currentStep]);

  const handleBackButton = useCallback(() => {
    return currentStep !== 0 ? back() : router.push("/education");
  }, [currentStep]);

  return (
    <BasicLayout
      headerTitle={food.components[currentStep].title}
      back={true}
      footer={false}
      backFunc={handleBackButton}
    >
      <Step
        name={`kiosk/food/components/${page}`}
        back={back}
        next={next}
        hint={food.components[currentStep].hint}
      />
    </BasicLayout>
  );
};

export default Index;
