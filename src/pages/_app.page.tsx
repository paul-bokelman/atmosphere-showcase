import { ExtendedAppProps } from "~/types";
import "~/styles/globals.css";
import { Layout } from "~/partials";

const AtmosphereShowcase = ({ Component, pageProps }: ExtendedAppProps) => {
  return (
    <Layout {...pageProps.config}>
      <Component {...pageProps} />
    </Layout>
  );
};

export default AtmosphereShowcase;
