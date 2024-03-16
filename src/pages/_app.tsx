import Layout from "@/components/layout";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useApollo } from "@/lib/apollo-client";
import { ApolloProvider } from "@apollo/client";
import BasketProvider from "@/components/providers/basket-provider";
import { Toaster } from "react-hot-toast";

export default function App({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps);
  return (
    <ApolloProvider client={apolloClient}>
      <BasketProvider>
        <Toaster />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </BasketProvider>
    </ApolloProvider>
  );
}
