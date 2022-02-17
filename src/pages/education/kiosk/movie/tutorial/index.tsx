import { useMemo, useEffect, useCallback } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { useRouter } from "next/router";
import BasicLayout from "components/common/BasicLayout";
import Step from "components/common/Step";
import { movie } from "utils/constants/componentsPath";
import { RootState } from "app/store";
import { setCurrentStep } from "features/kiosk/movieKioskSlice";

const Index = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { currentStep, isReservation } = useSelector(
    (state: RootState) => ({
      currentStep: state.movieKiosk.currentStep,
      isReservation: state.movieKiosk.isReservation
    }),
    shallowEqual
  );

  useEffect(() => {
    if (router.asPath.split("?page=")[1]) {
      router.push(`${movie.basicRoute}/?page=Intro`);
    }
    dispatch(setCurrentStep(0));
  }, []);

  const page = useMemo(() => {
    return router.query.page !== undefined ? router.query.page : "Intro";
  }, [router.query]);

  const movePage = useCallback((pageName: string) => {
    const path = `${movie.basicRoute}?page=${pageName}`;
    return router.push(path, path, { shallow: true });
  }, []);

  const back = useCallback(() => {
    let backIndex = currentStep - 1;
    if (
      ["CheckReservation", "ConfirmMovie"].includes(
        movie.components[currentStep].step
      ) &&
      isReservation
    ) {
      const index = movie.components.findIndex(
        component =>
          component.step ===
          (movie.components[currentStep].step === "CheckReservation"
            ? "BuyTicket"
            : "CheckReservation")
      );
      backIndex = index;
    }

    if (currentStep > 0) {
      dispatch(setCurrentStep(backIndex));
      return movePage(movie.components[backIndex].step);
    }
  }, [currentStep]);

  const next = useCallback(
    (nextComponent?: string) => {
      let nextIndex = currentStep + 1;
      if (nextComponent && typeof nextComponent === "string") {
        nextIndex = movie.components.findIndex(
          comp => comp.step === nextComponent
        );
      }
      dispatch(setCurrentStep(nextIndex));
      return movePage(movie.components[nextIndex].step);
    },
    [currentStep]
  );

  const handleBackButton = useCallback(() => {
    return currentStep !== 0 ? back() : router.push("/education");
  }, [currentStep]);

  return (
    <BasicLayout
      headerTitle={movie.components[currentStep].title}
      back={true}
      footer={false}
      backFunc={handleBackButton}
    >
      <Step name={`kiosk/movie/components/${page}`} back={back} next={next} />
    </BasicLayout>
  );
};

export default Index;
