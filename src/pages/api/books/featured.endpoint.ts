import type { Book } from "@prisma/client";
import type { ServerRoute } from "~/types";
import { prisma, handler, allowMethods } from "~/lib/server";

export type GetFeaturedBookParams = {};
export type GetFeaturedBookPayload = Pick<Book, "slug">;

const getFeaturedBook: ServerRoute<GetFeaturedBookParams, GetFeaturedBookPayload> = async (req, res) => {
  try {
    const latestBook = (await prisma.book.findMany({ orderBy: { id: "desc" }, take: 1, select: { slug: true } }))[0];
    return res.status(200).json({ status: "success", slug: latestBook.slug });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};

export default handler(allowMethods(["GET"]), getFeaturedBook);
