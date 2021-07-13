import React from "react";
import Head from "next/head";
import { ThemeProvider } from "@material-ui/core/styles";
import { customTheme } from "./../layouts/theme";
import "normalize.css";
import { Provider as StoreProvider } from "react-redux";
import configureStore from "../redux/configureStore";
import { PersistGate } from "redux-persist/integration/react";

function MyApp({ Component, pageProps }) {
  const { store, persistor } = configureStore();

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <StoreProvider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ThemeProvider theme={customTheme}>
            <Component {...pageProps} />
          </ThemeProvider>
        </PersistGate>
      </StoreProvider>
    </>
  );
}

export default MyApp;
