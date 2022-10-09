import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import store from "redux/store";
import Head from "next/head";
import { ApolloProvider } from "@apollo/client";
import { client } from "apollo";
import Wasm from "components/wasm";
import WSProvider from "components/ws";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <Head>
          <title>Blockchain War</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="charset" content="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta name="description" content="Blockchain War" />
          <link rel="shortcut icon" href="/favicon.svg"></link>
        </Head>
        <WSProvider>
          <Wasm>
            <Component {...pageProps} />
          </Wasm>
        </WSProvider>
      </Provider>
    </ApolloProvider>
  );
}

export default MyApp;
