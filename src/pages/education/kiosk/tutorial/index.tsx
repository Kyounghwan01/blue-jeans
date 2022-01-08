import { useMemo, useEffect, useCallback, FunctionComponent } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "app/store";
import styled from "styled-components";
import { useRouter } from "next/router";
import { setCurrentStep, resetStore } from "features/educationSlice";
import BasicLayout from "components/common/BasicLayout";

// todo: 튜토리얼, 시간 지나면 힌트, 초기화

const components = [
  { step: "Intro", title: "키오스크", header: false },
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

  const Step: FunctionComponent<{
    back: () => Promise<boolean> | undefined;
    next: () => Promise<boolean>;
    movePage: (pathName: string) => Promise<boolean>;
    // eslint-disable-next-line @typescript-eslint/no-var-requires
  }> = require(`components/kiosk/${page}`).default;

  return (
    <BasicLayout
      headerTitle={components[currentStep].title}
      back={true}
      footer={false}
      backFunc={handleBackButton}
    >
      <Block>
        {currentStep}
        <div className="hover-test">하하하</div>
        <Step back={back} next={next} movePage={movePage} />
      </Block>
    </BasicLayout>
  );
};

const Block = styled.article`
  .hover-test {
    background: red;
    height: 300px;
  }
  .hover-test:hover {
    background: rgba(255, 255, 255, 0.3);
    transition: background 1s ease-out;
  }
`;
export default Index;
