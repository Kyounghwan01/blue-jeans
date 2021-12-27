import { useState, useEffect, memo } from "react";
import { useRouter } from "next/router";
import Footer from "./Footer";
import Header from "./Header";
import Loading from "components/common/Loading";
import { Block } from "./BasicLayout.styled";

interface IBasyLayout {
  header?: boolean;
  footer?: boolean;
  loading?: boolean;
  children: React.ReactNode;
  headerTitle: string;
  back: boolean;
  backFunc?: () => void;
  icons?: { img: string; url: string }[];
}

const Index = ({
  header = true,
  footer = true,
  children,
  headerTitle = "아무거나",
  back = true,
  backFunc,
  loading = false
}: IBasyLayout) => {
  console.log(111);
  const router = useRouter();

  const [tab, setTab] = useState(0);
  const [bodyHeight, setBodyHeight] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (footer) {
      switch (router.pathname) {
        case "/profile":
          setTab(3);
          break;
        case "/":
          setTab(0);
          break;
        default:
          setTab(0);
          break;
      }
    }
    setBodyHeight(
      `calc(100% ${!!header ? " - 60px" : ""} ${!!footer ? " - 56px" : ""})`
    );
  }, []);

  if (!mounted) return null;

  return (
    <>
      {loading && <Loading />}
      <Block bodyHeight={bodyHeight} loadingState={loading}>
        {header && (
          <>
            <div className="base-layout__header">
              <Header title={headerTitle} back={back} backFunc={backFunc} />
            </div>
            <div className="base-layout__body__empty" />
          </>
        )}
        <div className="base-layout__body">{children}</div>
        {footer && <Footer tab={tab} setTab={setTab} />}
      </Block>
    </>
  );
};

export default memo(Index);
