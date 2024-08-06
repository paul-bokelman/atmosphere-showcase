import type { AmbientSection, Book, Chapter } from "@prisma/client";
import type { ServerRoute } from "~/types";
import { prisma, handler, allowMethods, isAuthenticated } from "~/lib/server";

export type GetBookChapterParams = { method: "GET"; query: { slug: string; chapter: string }; body: {} };
export type GetBookChapterPayload = {
  method: "GET";
  chapter: Chapter & {
    ambientSections: AmbientSection[];
  };
  book: Pick<Book, "title" | "author" | "accentColor"> & { _count: { chapters: number } };
};

export type CreateChapterParams = {
  method: "POST";
  query: { slug: string; chapter: string };
  body: Omit<Chapter, "id" | "bookId" | "createdAt" | "updatedAt"> & {
    ambientSections: Omit<AmbientSection, "id" | "chapterId" | "createdAt" | "updatedAt">[];
  };
};

export type CreateChapterPayload = { method: "POST"; message: string };

export type DeleteChapterParams = { method: "DELETE"; query: { slug: string; chapter: string } };
export type DeleteChapterPayload = { method: "DELETE"; message: string };

type Params = GetBookChapterParams | CreateChapterParams | DeleteChapterParams;
type Payload = GetBookChapterPayload | CreateChapterPayload | DeleteChapterPayload;

const bookChapter: ServerRoute<Params, Payload> = async (req, res) => {
  try {
    if (req.method === "GET") {
      const chapter = await prisma.chapter.findFirst({
        where: { number: parseInt(req.query.chapter), book: { slug: req.query.slug } },
        include: {
          ambientSections: true,
          book: { select: { title: true, author: true, accentColor: true, _count: { select: { chapters: true } } } },
        },
      });

      if (!chapter) {
        return res.status(404).json({ status: "error", message: "Chapter not found" });
      }

      const { book, ...rest } = chapter;
      return res.status(200).json({ status: "success", method: "GET", chapter: rest, book });
    }

    if (req.method === "POST") {
      const existingBook = await prisma.book.findUnique({ where: { slug: req.query.slug } });

      if (!existingBook) {
        return res.status(404).json({ status: "error", message: "Book not found" });
      }

      const existingChapter = await prisma.chapter.findFirst({
        where: { number: parseInt(req.query.chapter), book: { slug: req.query.slug } },
      });

      if (existingChapter) {
        return res.status(400).json({ status: "error", message: "Chapter already exists" });
      }

      const { ambientSections, ...chapterData } = req.body;

      await prisma.chapter.create({
        data: {
          book: { connect: { slug: req.query.slug } },
          ...chapterData,
          ambientSections: { createMany: { data: ambientSections } },
        },
      });

      return res.status(201).json({ status: "success", method: "POST", message: "Chapter created successfully" });
    }

    if (req.method === "DELETE") {
      const existingChapter = await prisma.chapter.findFirst({
        where: { number: parseInt(req.query.chapter), book: { slug: req.query.slug } },
      });

      if (!existingChapter) {
        return res.status(404).json({ status: "error", message: "Chapter not found" });
      }

      await prisma.chapter.delete({ where: { id: existingChapter.id } });

      return res.status(200).json({ status: "success", method: "DELETE", message: "Chapter deleted successfully" });
    }
  } catch (e) {
    console.error(e);
    return res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};

export default handler(allowMethods(["GET", "POST", "DELETE"]), isAuthenticated(["POST", "DELETE"]), bookChapter);
