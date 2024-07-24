import type { NextPage } from "next";
import { InlineLink } from "~/components";
import type { PropsWithConfig } from "~/types";

type Props = PropsWithConfig<{}>;

const Custom404: NextPage<Props> = () => {
  return (
    <div className="w-full h-[calc(100%-10rem)] flex flex-col gap-2 items-center justify-center">
      <span className="text-accent text-lg">404</span>
      <h1 className="font-primary text-primary text-lg">How did we get here?</h1>
      <p className="text-secondary text-base">
        The page you are looking for does not exist, click <InlineLink href="/">here</InlineLink> to go home.
      </p>
    </div>
  );
};

export const getStaticProps = async () => {
  return {
    props: {
      config: {
        layout: {
          header: {
            view: "main",
          },
        },
        seo: {
          title: "404",
          description: "The page you are looking for does not exist",
        },
      },
    },
  };
};

export default Custom404;
