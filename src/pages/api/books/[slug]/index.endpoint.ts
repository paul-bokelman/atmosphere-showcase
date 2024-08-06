import type { Book } from "@prisma/client";
import type { ServerRoute } from "~/types";
import { prisma, handler, allowMethods, isAuthenticated } from "~/lib/server";

export type GetBookParams = { method: "GET"; query: { slug: string } };
export type GetBookPayload = { method: "GET"; book: Book };

export type DeleteBookParams = { method: "DELETE"; query: { slug: string } };
export type DeleteBookPayload = { method: "DELETE"; message: string };
type Params = GetBookParams | DeleteBookParams;
type Payload = GetBookPayload | DeleteBookPayload;

const book: ServerRoute<Params, Payload> = async (req, res) => {
  try {
    if (req.method === "GET") {
      const book = await prisma.book.findUnique({
        where: { slug: req.query.slug },
        include: { chapters: { include: { ambientSections: true } } },
      });

      if (!book) {
        return res.status(404).json({ status: "error", message: "Book not found" });
      }

      return res.status(200).json({ status: "success", method: "GET", book });
    }

    if (req.method === "DELETE") {
      await prisma.book.delete({ where: { slug: req.query.slug } });
      return res.status(200).json({ status: "success", method: "DELETE", message: "Book deleted" });
    }
  } catch (e) {
    console.error(e);
    return res.status(500).json({ status: "error", message: "Internal server error" });
  }
};

export default handler(allowMethods(["GET", "DELETE"]), isAuthenticated(["DELETE"]), book);
