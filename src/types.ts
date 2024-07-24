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

export type AmbientSection = {
  start: number;
  end: number;
  description: string;
};

export type Chapter = {
  title: string;
  audio: string;
  paragraphs: string[];
  ambientSections: AmbientSection[];
};

export type Book = {
  slug: string;
  title: string;
  description: string;
  cover: string;
  author: string;
  date: string;
  length: number; // in minutes
  genre: string;
  accentColor: string;
  chapters: Chapter[];
};

export type Books = Book[];
