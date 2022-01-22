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
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";
import dayjs from "dayjs";
import "utils/api/firebase";
import "dayjs/locale/ko";
dayjs.locale("ko");

if (process.env.NODE_ENV === "production") {
  Sentry.init({
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
    integrations: [new Integrations.BrowserTracing()],
    tracesSampleRate: 1.0
  });
}

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
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
        />
        {/* <meta
          content="minimum-scale=1, initial-scale=1, width=device-width"
          name="viewport"
        /> */}
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
