import type { Query } from "~/types";
import type {
  GetBooksParams,
  GetBooksPayload,
  GetBookParams,
  GetBookPayload,
  GetFeaturedBookParams,
  GetFeaturedBookPayload,
  GetBookPreviewParams,
  GetBookPreviewPayload,
  GetBookChapterParams,
  GetBookChapterPayload,
} from "~/pages/api/types";
import axios from "axios";
import { handleQueryError } from "~/lib/utils";

const client = axios.create({ baseURL: process.env.NEXT_PUBLIC_API_URL });

export const getAllBooks: Query<GetBooksParams, GetBooksPayload> = async () => {
  try {
    const { data } = await client.get<{ status: "success" } & GetBooksPayload>("/books");
    return data;
  } catch (e) {
    return handleQueryError(e);
  }
};

export const getBook: Query<GetBookParams, GetBookPayload> = async (args) => {
  const { query } = args;
  try {
    const { data } = await client.get<{ status: "success" } & GetBookPayload>(`/books/${query.slug}`);
    return data;
  } catch (e) {
    return handleQueryError(e);
  }
};

export const getFeaturedBook: Query<GetFeaturedBookParams, GetFeaturedBookPayload> = async () => {
  try {
    const { data } = await client.get<{ status: "success" } & GetFeaturedBookPayload>("/books/featured");
    return data;
  } catch (e) {
    return handleQueryError(e);
  }
};

export const getBookPreview: Query<GetBookPreviewParams, GetBookPreviewPayload> = async (args) => {
  const { query } = args;
  try {
    const { data } = await client.get<{ status: "success" } & GetBookPreviewPayload>(`/books/${query.slug}/preview`);
    return data;
  } catch (e) {
    return handleQueryError(e);
  }
};

export const getBookChapter: Query<GetBookChapterParams, GetBookChapterPayload> = async (args) => {
  const { query } = args;
  try {
    const { data } = await client.get<{ status: "success" } & GetBookChapterPayload>(
      `/books/${query.slug}/${query.chapter}`
    );
    return data;
  } catch (e) {
    return handleQueryError(e);
  }
};
