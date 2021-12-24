import { useState, useEffect } from "react";
import Footer from "./Footer";
import Header from "./Header";
import Loading from "components/common/Loading";
import { Block } from "./BasicLayout.styled";

interface IBasyLayout {
  header?: boolean;
  footer?: boolean;
  loading?: boolean;
  children: React.ReactNode;
}

const Index = ({
  header = true,
  footer = true,
  children,
  loading = false
}: IBasyLayout) => {
  const [tab, setTab] = useState(0);
  const [bodyHeight, setBodyHeight] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setBodyHeight(`calc(100% ${!!footer ? " - 56px" : ""})`);
  }, []);

  if (!mounted) return null;

  return (
    <>
      {loading && <Loading />}
      <Block bodyHeight={bodyHeight} loading={loading}>
        {header && (
          <div className="base-layout__header">
            <Header />
          </div>
        )}
        <div className="base-layout__body">
          <div className="base-layout__body__empty" />
          {children}
        </div>
        {footer && <Footer tab={tab} setTab={setTab} />}
      </Block>
    </>
  );
};

export default Index;
