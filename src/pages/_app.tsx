import { useEffect, useMemo } from "react";
import type { AppProps } from "next/app";
import { DefaultSeo } from "next-seo";
import Head from "next/head";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "styled-components";
import { useDispatch } from "react-redux";
import useSelectorTyped from "features/useSelectorTyped";
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
import "../styles/ui.common.scss";
dayjs.locale("ko");

if (process.env.NODE_ENV === "production") {
  Sentry.init({
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
    integrations: [new Integrations.BrowserTracing()],
    tracesSampleRate: 1.0
  });
}

const DEFAULT_SEO = {
  title: "청춘은 바로 지금!",
  description: "it 기계가 무서운 시니어들을 응원합니다!",
  canonical: "blue-jeans.vercel.app",
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "blue-jeans.vercel.app",
    title: "청춘은 바로 지금!",
    site_name: "청바지",
    images: [
      {
        url: "https://avatars.githubusercontent.com/u/44187477",
        width: 460,
        height: 460,
        alt: "청바지"
      }
    ]
  }
};

const App = (props: AppProps) => {
  const dispatch = useDispatch();
  const { Component, pageProps } = props;
  const [setScreenSize] = useScreenSize();
  const [getUsers] = useGetUsers();
  const { fontSizeType } = useSelectorTyped(state => state.common);

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
      <DefaultSeo {...DEFAULT_SEO} />
      <Head>
        <title>청춘은 바로 지금!</title>
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
