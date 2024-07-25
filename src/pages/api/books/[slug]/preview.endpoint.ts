import type { Book } from "@prisma/client";
import type { Handler } from "~/types";
import { prisma } from "~/lib/server";

export type GetBookPreviewParams = { query: { slug: string } };
export type GetBookPreviewPayload = Book;

const handler: Handler<GetBookPreviewParams, GetBookPreviewPayload> = async (req, res) => {
  try {
    const book = await prisma.book.findUnique({ where: { slug: req.query.slug } });

    if (!book) {
      return res.status(404).json({ status: "error", message: "Book not found" });
    }

    return res.status(200).json({ status: "success", ...book });
  } catch (e) {
    return res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};

export default handler;
