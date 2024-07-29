import type { AmbientSection, Book, Chapter } from "@prisma/client";
import type { ServerRoute } from "~/types";
import { prisma, handler, allowMethods } from "~/lib/server";

export type GetBookChapterParams = { query: { slug: string; chapter: string } };
export type GetBookChapterPayload = {
  chapter: Chapter & {
    ambientSections: AmbientSection[];
  };
  book: Pick<Book, "title" | "author" | "accentColor"> & { _count: { chapters: number } };
};

const getBookChapter: ServerRoute<GetBookChapterParams, GetBookChapterPayload> = async (req, res) => {
  try {
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

    return res.status(200).json({ status: "success", chapter: rest, book });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};

export default handler(allowMethods(["GET"]), getBookChapter);
