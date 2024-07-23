import { ExtendedAppProps } from "~/types";
import "~/styles/globals.css";
import { QueryClientProvider, QueryClient } from "react-query";
import { Layout } from "~/partials";

const AtmosphereShowcase = ({ Component, pageProps }: ExtendedAppProps) => {
  const { config } = Component;
  const qc = new QueryClient({ defaultOptions: { queries: { refetchOnWindowFocus: false } } });

  return (
    <QueryClientProvider client={qc}>
      <Layout {...config}>
        <Component {...pageProps} />
      </Layout>
    </QueryClientProvider>
  );
};

export default AtmosphereShowcase;
