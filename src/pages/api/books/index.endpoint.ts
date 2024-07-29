import type { AmbientSection, Book, Chapter } from "@prisma/client";
import type { ServerRoute } from "~/types";
import { prisma, handler, allowMethods, isAuthenticated } from "~/lib/server";

export type GetBooksParams = { method: "GET"; body: {} };
export type GetBooksPayload = { method: "GET"; books: (Book & { _count: { chapters: number } })[] };

export type CreateBookParams = {
  method: "POST";
  body: Omit<Book, "id" | "createdAt" | "updatedAt"> & {
    chapters: (Omit<Chapter, "id" | "bookId" | "createdAt" | "updatedAt"> & {
      ambientSections: Omit<AmbientSection, "id" | "chapterId" | "createdAt" | "updatedAt">[];
    })[];
  };
};
export type CreateBooksPayload = { method: "POST"; message: string };

type Params = GetBooksParams | CreateBookParams;
type Payload = GetBooksPayload | CreateBooksPayload;

const getBooks: ServerRoute<Params, Payload> = async (req, res) => {
  try {
    if (req.method === "GET") {
      const books = await prisma.book.findMany({ include: { _count: { select: { chapters: true } } } });

      return res.status(200).json({ status: "success", method: "GET", books });
    }

    if (req.method === "POST") {
      const { chapters, ...bookData } = req.body;
      const { id: bookId } = await prisma.book.create({
        data: bookData,
        select: { id: true },
      });

      for (const chapter of chapters) {
        const { ambientSections, ...chapterData } = chapter;
        await prisma.chapter.create({
          data: {
            book: { connect: { id: bookId } },
            ...chapterData,
            ambientSections: { createMany: { data: ambientSections } },
          },
        });
      }

      return res.status(201).json({ status: "success", method: "POST", message: "Book created successfully" });
    }
  } catch (e) {
    console.error(e);
    return res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};

export default handler(allowMethods(["GET", "POST"]), isAuthenticated(["POST"]), getBooks);
