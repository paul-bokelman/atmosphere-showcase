import { ExtendedAppProps } from "~/types";
import * as React from "react";
import Router from "next/router";
import NProgress from "nprogress";
import "~/styles/globals.css";
import { Layout } from "~/partials";

NProgress.configure({ easing: "ease", speed: 500 });

const AtmosphereShowcase = ({ Component, pageProps }: ExtendedAppProps) => {
  React.useEffect(() => {
    Router.events.on("routeChangeStart", () => NProgress.start());
    Router.events.on("routeChangeComplete", () => NProgress.done());
    Router.events.on("routeChangeError", () => NProgress.done());
  }, []);

  return (
    <Layout {...pageProps.config}>
      <Component {...pageProps} />
    </Layout>
  );
};

export default AtmosphereShowcase;
