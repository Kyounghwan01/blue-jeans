import { useEffect, useMemo } from "react";
import type { AppProps } from "next/app";
import Head from "next/head";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "app/store";
import { ModalProvider, ModalRoot } from "context";
import { wrapper } from "app/store";
import buildTheme from "styles/theme";
import useScreenSize from "hooks/useScreenSize";
import useGetUsers from "hooks/useGetUsers";
import { setFontSizeType } from "features/commonSlice";
import { fontSizeType as typeFontSize } from "features/types/commonSliceType";
import { GlobalStyle } from "styles/global-styles";
import "utils/api/firebase";

const App = (props: AppProps) => {
  const dispatch = useDispatch();
  const { Component, pageProps } = props;
  const [setScreenSize] = useScreenSize();
  const [getUsers] = useGetUsers();
  const { fontSizeType } = useSelector((state: RootState) => state.common);

  useEffect(() => {
    setScreenSize();
    getUsers();

    if (typeof window !== "undefined") {
      const fontSize = window.localStorage.getItem("font-size");
      if (!fontSize) return;
      dispatch(setFontSizeType(fontSize as typeFontSize));
    }
  }, []);

  const theme = useMemo(() => {
    return buildTheme(fontSizeType, {});
  }, [fontSizeType]);

  return (
    <>
      {/* <DefaultSeo {...DEFAULT_SEO} /> */}
      <Head>
        <title>Next App</title>
        <link href="/favicon.ico" rel="icon" />
        <meta
          content="minimum-scale=1, initial-scale=1, width=device-width"
          name="viewport"
        />
      </Head>
      <ThemeProvider theme={theme}>
        <ModalProvider>
          <GlobalStyle />
          <CssBaseline />
          <ModalRoot />
          <Component {...pageProps} />
        </ModalProvider>
      </ThemeProvider>
    </>
  );
};

export default wrapper.withRedux(App);
