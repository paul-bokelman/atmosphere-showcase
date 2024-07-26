import type { Book } from "@prisma/client";
import type { ServerRoute } from "~/types";
import { prisma } from "~/lib/server";

export type GetBookParams = { query: { slug: string } };
export type GetBookPayload = Book;

const handler: ServerRoute<GetBookParams, GetBookPayload> = async (req, res) => {
  try {
    const book = await prisma.book.findUnique({
      where: { slug: req.query.slug },
      include: { chapters: { include: { ambientSections: true } } },
    });

    if (!book) {
      return res.status(404).json({ status: "error", message: "Book not found" });
    }

    return res.status(200).json({ status: "success", ...book });
  } catch (error) {
    return res.status(500).json({ status: "error", message: "Internal server error" });
  }
};

export default handler;
