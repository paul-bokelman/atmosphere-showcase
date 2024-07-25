import type { NextPage, NextApiRequest, NextApiResponse } from "next";
import type { AppProps } from "next/app";
import type { LayoutOptions, SEOOptions } from "~/partials/layout";

/* --------------------------------- SERVER --------------------------------- */

export type Handler<R = unknown, P = unknown> = (
  req: NextApiRequest & R,
  res: NextApiResponse<ServerResponse<P>>
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

// todo: remove these unused types

// export type AmbientSection = {
//   start: number;
//   end: number;
//   description: string;
// };

// export type Chapter = {
//   title: string;
//   audio: string;
//   paragraphs: string[];
//   ambientSections: AmbientSection[];
// };

// export type Book = {
//   slug: string;
//   title: string;
//   description: string;
//   cover: string;
//   author: string;
//   date: string;
//   length: number; // in minutes
//   genre: string;
//   accentColor: string;
//   chapters: Chapter[];
// };

// export type Books = Book[];
