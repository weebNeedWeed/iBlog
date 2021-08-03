import React from "react";
import Head from "next/head";
import { ThemeProvider } from "@material-ui/core/styles";
import { customTheme } from "./../layouts/theme";
import "normalize.css";
import NextNprogress from "nextjs-progressbar";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
		<meta property="og:title" content="iBlog 2021" />
		<meta property="og:type" content="website" />
		<meta property="og:image" content="https://www.freethink.com/wp-content/uploads/2021/06/disease-resistant-banana_opengraph.jpg" />
		<meta property="og:description" content="iBlog 2021 blog readwrite" />
	  </Head>

      <ThemeProvider theme={customTheme}>
        <NextNprogress
          color="#000"
          startPosition={0.3}
          stopDelayMs={200}
          height={3}
          showOnShallow={true}
        />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}

export default MyApp;
