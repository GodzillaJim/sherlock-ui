import React, { ReactNode, useEffect, useState } from "react";
import Head from "next/head";
import { Context } from "../Context/MainContext";
import CustomThemeProvider from "../components/theme";
import ApolloClientProvider from "../Apollo";
import { NextConfig } from "next";
import AuthManager from "../Context/AuthManager";
import "../assets/styles/nprogress.css";
import "../assets/styles/editor.css";
import { Router } from "next/router";
import LoadingOverlayWrapper from "react-loading-overlay-ts";
import "../assets/styles/global.css";
import { Provider } from "react-redux";
import store from "../store";

const App = ({ Component, pageProps }: NextConfig) => {
  const [loading, setLoading] = useState<boolean>(false);
  const getLayout = Component.getLayout || ((page: ReactNode) => page);

  useEffect(() => {
    Router.events.on("routeChangeStart", () => setLoading(true));
    Router.events.on("routeChangeComplete", () => setLoading(false));
    Router.events.on("routeChangeError", () => setLoading(false));
  }, []);
  return (
    <>
      <Head>
        <meta
          name={"viewport"}
          content={"width=device-width, initial-scale=1, maximum-scale=1"}
        />
      </Head>
      <Provider store={store}>
        <LoadingOverlayWrapper
          styles={{
            wrapper: {
              minHeight: "100vh",
              height: "100%",
              position: loading ? "fixed" : "relative",
              display: "flex",
              minWidth: "100%",
            },
          }}
          active={loading}
        >
          <AuthManager>
            <ApolloClientProvider>
              <Context>
                <CustomThemeProvider>
                  {getLayout(<Component {...pageProps} />)}
                </CustomThemeProvider>
              </Context>
            </ApolloClientProvider>
          </AuthManager>
        </LoadingOverlayWrapper>
      </Provider>
    </>
  );
};

export default App;
