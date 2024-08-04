import type { NextPage } from "next";
import { InlineLink } from "~/components";
import type { PropsWithConfig } from "~/types";

type Props = PropsWithConfig<{}>;

const Custom500: NextPage<Props> = () => {
  return (
    <div className="flex flex-col gap-2 items-center justify-center mb-[20rem]">
      <span className="text-accent text-lg">500</span>
      <h1 className="font-primary text-primary text-lg">Something went horrendously wrong</h1>
      <p className="text-secondary text-base">
        Something broke this entire page, please click <InlineLink href="/">here</InlineLink> to go home.
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
          title: "Page Not Found",
          description: "The page you are looking for does not exist",
        },
      },
    },
  };
};

export default Custom500;
