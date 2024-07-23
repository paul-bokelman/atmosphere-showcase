import type { NextApiRequest, NextApiResponse } from "next";
import type { ServerError } from "~/types";
import { Book } from "~/types";
import { books } from "./index.endpoint";

export default function handler(req: NextApiRequest, res: NextApiResponse<Book | ServerError>) {
  const book = books.find((book) => book.slug === req.query.slug);
  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }

  res.status(200).json(book);
}
