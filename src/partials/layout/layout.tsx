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
    <main className="relative flex w-dvw h-dvh justify-center font-secondary">
      <Head>
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
        <meta property="og:title" content={seo.title} />
        <meta property="og:description" content={seo.description} />
      </Head>
      <div className="relative h-full justify-between flex flex-col w-full md:w-[800px] p-8 md:py-8 lg:px-8">
        {layout.header && <LayoutHeader {...layout.header} />}
        <div className="h-fit overflow-hidden">{children}</div>
        {layout.nav && <LayoutNavigation {...layout.nav} />}
      </div>
    </main>
  );
};
