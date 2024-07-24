import { Book, Books } from "~/types";
import { useQuery } from "react-query";
import axios from "axios";

export const useGetAllBooks = () => {
  return useQuery<Books>("books", async () => {
    const res = await axios.get<Books>("/api/books");
    return res.data;
  });
};

export const useGetBook = (slug: string) => {
  return useQuery<Book>(
    "book",
    async () => {
      const res = await axios.get<Book>(`/api/books/${slug}`);
      return res.data;
    },
    { enabled: !!slug }
  );
};
