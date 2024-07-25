import type { AmbientSection, Book, Chapter } from "@prisma/client";
import type { Handler } from "~/types";
import { prisma } from "~/lib/server";

export type GetBookChapterParams = { query: { slug: string; chapter: string } };
export type GetBookChapterPayload = Chapter & {
  ambientSections: AmbientSection[];
  book: Pick<Book, "title" | "author" | "accentColor">;
};

const handler: Handler<GetBookChapterParams, GetBookChapterPayload> = async (req, res) => {
  try {
    const chapter = await prisma.chapter.findFirst({
      where: { number: parseInt(req.query.chapter), book: { slug: req.query.slug } },
      include: { ambientSections: true, book: { select: { title: true, author: true, accentColor: true } } },
    });

    if (!chapter) {
      return res.status(404).json({ status: "error", message: "Chapter not found" });
    }

    return res.status(200).json({ status: "success", ...chapter });
  } catch (e) {
    return res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};

export default handler;
