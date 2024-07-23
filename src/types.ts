import type { NextPage } from "next";
import type { AppProps } from "next/app";
import type { LayoutOptions, SEOOptions } from "~/partials/layout";

export type ServerError = { message: string };

export type ExtendedAppProps<P = any> = AppProps<P> & {
  Component: NextPageWithConfig;
  pageProps: P;
};

export type NextPageWithConfig<P = unknown, IP = P> = NextPage<P, IP> & {
  config: {
    layout: LayoutOptions;
    seo: SEOOptions;
  };
};

export type Book = {
  slug: string;
  title: string;
  description: string;
  cover: string;
  author: string;
  date: string;
  chapters: number;
  length: number; // in minutes
  genre: string;
  accentColor: string;
};

export type Books = Book[];
