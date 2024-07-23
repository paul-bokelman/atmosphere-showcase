import type { NavigationOptions, HeaderOptions } from "~/partials";
import Head from "next/head";
import { LayoutHeader, LayoutNavigation } from "~/partials";

export type LayoutOptions = {
  header?: HeaderOptions;
  nav?: NavigationOptions;
};
export type SEOOptions = {
  title: string;
  description: string;
};

export type Props = React.PropsWithChildren<{
  seo: SEOOptions;
  layout: LayoutOptions;
}>;

export const Layout: React.FC<Props> = ({ seo, layout, children }) => {
  return (
    <main className="relative flex w-screen h-screen justify-center">
      <Head>
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
        <meta property="og:title" content={seo.title} />
        <meta property="og:description" content={seo.description} />
      </Head>
      <div className="relative my-8 w-[400px] md:w-[800px]">
        {layout.header && <LayoutHeader {...layout.header} />}
        {children}
        {layout.nav && <LayoutNavigation {...layout.nav} />}
      </div>
    </main>
  );
};
