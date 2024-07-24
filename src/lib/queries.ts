import type { Book, Books, QueryResponse } from "~/types";
import axios from "axios";
import { handleQueryError } from "~/lib/utils";

const client = axios.create({ baseURL: process.env.NEXT_PUBLIC_API_URL });

export const getAllBooks = async (): Promise<QueryResponse<Books>> => {
  try {
    const { data } = await client.get<Books>("/books");
    return { status: "success", data };
  } catch (error: unknown) {
    return handleQueryError(error);
  }
};

export const getBook = async (slug: string): Promise<QueryResponse<Book>> => {
  try {
    const { data } = await client.get<Book>(`/books/${slug}`);
    return { status: "success", data };
  } catch (error: unknown) {
    return handleQueryError(error);
  }
};
