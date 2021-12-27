import { useEffect } from "react";
import type { AppProps } from "next/app";
import Head from "next/head";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { ModalProvider, ModalRoot } from "context";
import { wrapper } from "app/store";
import theme from "styles/theme";
import useScreenSize from "hooks/useScreenSize";
import useGetUsers from "hooks/useGetUsers";
import "styles/globals.css";
// import { DefaultSeo } from 'next-seo';
// import { Provider } from "react-redux";
// import { store } from "app/store";
// import "utils/api/firebase";

const App = (props: AppProps) => {
  const { Component, pageProps } = props;
  const [setScreenSize] = useScreenSize();
  // const [getUsers] = useGetUsers();

  useEffect(() => {
    setScreenSize();
    // getUsers();
  }, []);

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
      {/* <Provider store={store}> */}
      <ThemeProvider theme={theme}>
        <ModalProvider>
          <CssBaseline />
          <ModalRoot />
          <Component {...pageProps} />
        </ModalProvider>
      </ThemeProvider>
      {/* </Provider> */}
    </>
  );
};

export default wrapper.withRedux(App);
// export default (App);
