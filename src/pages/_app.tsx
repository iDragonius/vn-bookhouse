import Layout from "@/components/layout";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useApollo } from "@/lib/apollo-client";
import { ApolloProvider } from "@apollo/client";
import BasketProvider from "@/components/providers/basket-provider";

export default function App({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps);
  return (
    <ApolloProvider client={apolloClient}>
      <BasketProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </BasketProvider>
    </ApolloProvider>
  );
}
