import type { NextPage, NextApiRequest, NextApiResponse } from "next";
import type { AppProps } from "next/app";
import type { LayoutOptions, SEOOptions } from "~/partials/layout";

/* --------------------------------- SERVER --------------------------------- */

export type NextFunction = () => void;

export type ServerRoute<R = unknown, P = unknown> = (
  req: Modify<NextApiRequest, R>,
  res: NextApiResponse<ServerResponse<P>>
) => Promise<void>;

export type Middleware<R = unknown, P = unknown> = (
  req: Modify<NextApiRequest, R>,
  res: NextApiResponse<ServerResponse<P>>,
  next: NextFunction
) => Promise<void>;

export type ServerError = { message: string };

/* --------------------------------- CLIENT --------------------------------- */

export type ExtendedAppProps = AppProps<PropsWithConfig> & {
  Component: NextPage<PropsWithConfig<unknown>>;
  pageProps: PropsWithConfig;
};

export type PropsWithConfig<P = unknown> = P & {
  config: {
    layout: LayoutOptions;
    seo: SEOOptions;
  };
};

export type QueryErrorResponse = {
  status: "error";
  data: undefined;
  message: string;
};

export type QuerySuccessResponse<T> = {
  status: "success";
  data: T;
};

export type QueryResponse<T> = QueryErrorResponse | QuerySuccessResponse<T>;

/* --------------------------------- SHARED --------------------------------- */

export type ServerResponse<T> = ({ status: "success" } & T) | ({ status: "error" } & ServerError);

/* ---------------------------------- UTILS --------------------------------- */

export type AddParameters<TFunction extends (...args: any) => any, TParameters extends [...args: any]> = (
  ...args: [...Parameters<TFunction>, ...TParameters]
) => ReturnType<TFunction>;

export type Modify<T, R> = Omit<T, keyof R> & R;
