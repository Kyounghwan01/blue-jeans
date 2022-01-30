import { useMemo, useEffect, useCallback } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { useRouter } from "next/router";
import BasicLayout from "components/common/BasicLayout";
import Step from "components/common/Step";
import { transportation } from "utils/constants/componentsPath";
import { RootState } from "app/store";
import { setCurrentStep } from "features/kiosk/transportationKioskSlice";

const Index = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { currentStep } = useSelector(
    (state: RootState) => ({
      currentStep: state.transportationKiosk.currentStep
    }),
    shallowEqual
  );

  useEffect(() => {
    if (router.asPath.split("?page=")[1]) {
      router.push(`${transportation.basicRoute}/?page=Intro`);
    }
    dispatch(setCurrentStep(0));
  }, []);

  const page = useMemo(() => {
    return router.query.page !== undefined ? router.query.page : "Intro";
  }, [router.query]);

  const movePage = useCallback((pageName: string) => {
    const path = `${transportation.basicRoute}?page=${pageName}`;
    return router.push(path, path, { shallow: true });
  }, []);

  const back = useCallback(() => {
    const backIndex = currentStep - 1;
    if (currentStep > 0) {
      dispatch(setCurrentStep(backIndex));
      return movePage(transportation.components[backIndex].step);
    }
  }, [currentStep]);

  const next = useCallback(() => {
    const nextIndex = currentStep + 1;
    dispatch(setCurrentStep(nextIndex));
    return movePage(transportation.components[nextIndex].step);
  }, [currentStep]);

  const handleBackButton = useCallback(() => {
    return currentStep !== 0 ? back() : router.push("/education");
  }, [currentStep]);

  return (
    <BasicLayout
      headerTitle={transportation.components[currentStep].title}
      back={![8, 9].includes(currentStep)}
      footer={false}
      backFunc={handleBackButton}
    >
      <Step
        name={`kiosk/transportation/components/${page}`}
        back={back}
        next={next}
        movePage={movePage}
      />
    </BasicLayout>
  );
};

export default Index;
