import type { NextApiRequest, NextApiResponse } from "next";
import { Books } from "~/types";

// replace with db
export const books: Books = [
  {
    slug: "the-great-gatsby",
    title: "The Great Gatsby",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    cover: "https://i0.wp.com/americanwritersmuseum.org/wp-content/uploads/2018/02/CK-3.jpg?resize=267%2C400&ssl=1",
    author: "Francis Scott Fitzgerald",
    date: "1925",
    chapters: 9,
    genre: "Literary Fiction",
    length: 11963,
    accentColor: "#29409F",
  },
  {
    slug: "the-wonderful-wizard-of-oz",
    title: "The Wonderful Wizard of Oz",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    cover: "https://images.booksense.com/images/660/718/9781528718660.jpg",
    author: "Lyman Frank Baum",
    date: "1900",
    chapters: 24,
    genre: "Fantasy Fiction",
    length: 1163,
    accentColor: "#4BAE82",
  },
  {
    slug: "dune",
    title: "Dune",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    cover: "https://m.media-amazon.com/images/I/91vVTsLa9xL._AC_UF1000,1000_QL80_.jpg",
    author: "Frank Herbert",
    date: "1965",
    chapters: 22,
    genre: "Science Fiction",
    length: 10163,
    accentColor: "#FF9227",
  },
  {
    slug: "moby-dick",
    title: "Moby Dick",
    description:
      "Moby-Dick; or, The Whale is a novel by Herman Melville, first published in 1851. It's detailed, complex narrative that explores themes such as obsession, revenge, and the struggle between man and nature. The story is narrated by Ishmael, a sailor who joins the whaling ship Pequod, commanded by the monomaniacal Captain Ahab. Ahab is driven by an obsessive",
    cover: "https://m.media-amazon.com/images/I/616R20nvohL._AC_UF1000,1000_QL80_.jpg",
    author: "Herman Melville",
    date: "1851",
    chapters: 135,
    genre: "Historical Fiction",
    length: 9932,
    accentColor: "#ED1C25",
  },
  {
    slug: "to-kill-a-mockingbird",
    title: "To Kill a Mockingbird",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    cover: "https://i.ebayimg.com/images/g/MIYAAOSwZoZab48g/s-l1600.jpg",
    author: "Harper Lee",
    date: "1960",
    chapters: 31,
    length: 8742,
    genre: "Novel",
    accentColor: "#02B381",
  },
];

export default function handler(req: NextApiRequest, res: NextApiResponse<Books>) {
  res.status(200).json(books);
}
