import type { AmbientSection, Book, Chapter } from "@prisma/client";
import type { ServerRoute } from "~/types";
import { prisma, handler, allowMethods, isAuthenticated } from "~/lib/server";

// todo: replace with db
export const books = [
  {
    slug: "the-great-gatsby",
    title: "The Great Gatsby",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    cover: "https://i0.wp.com/americanwritersmuseum.org/wp-content/uploads/2018/02/CK-3.jpg?resize=267%2C400&ssl=1",
    author: "Francis Scott Fitzgerald",
    date: "1925",
    chapters: [
      {
        audio: "https://dl.sndup.net/jf8jv/woz1-rec.mp3",
        title: "The Cyclone",
        paragraphs: [
          "The train from 'Frisco was very late. It should have arrived at Hugson's Siding at midnight, but it was already five o'clock and the gray dawn was breaking in the east when the little train slowly rumbled up to the open shed that served for the station-house. As it came to a stop the conductor called out in a loud voice:",
          '"Hugson\'s Siding!"',
          "At once a little girl rose from her seat and walked to the door of the car, carrying a wicker suitcase in one hand and a round birdcage covered up with newspapers in the other, while a parasol was tucked under her arm. The conductor helped her off the car and then the engineer started his train again, so that it puffed and groaned and moved slowly away up the track. The reason he was so late was because all through the night there were times when the solid earth shook and trembled under him, and the engineer was afraid that at any moment the rails might spread apart and an accident happen to his passengers. So he moved the cars slowly and with caution.",
          "The little girl stood still to watch until the train had disappeared around a curve; then she turned to see where she was.",
          "The shed at Hugson's Siding was bare save for an old wooden bench, and did not look very inviting. As she peered through the soft gray light not a house of any sort was visible near the station, nor was any person in sight; but after a while the child discovered a horse and buggy standing near a group of trees a short distance away. She walked toward it and found the horse tied to a tree and standing motionless, with its head hanging down almost to the ground. It was a big horse, tall and bony, with long legs and large knees and feet.",
        ],
        ambientSections: [
          { start: 0, end: 10, description: "Birds Chirping" },
          { start: 93, end: 120, description: "Water Flowing" },
          { start: 183, end: 230, description: "Wind Blowing" },
        ],
      },
    ],
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
    chapters: [
      {
        audio: "https://etc.usf.edu/lit2go/audio/mp3/the-wonderful-wizard-of-oz-002-chapter-1-the-cyclone.2747.mp3",
        title: "The Cyclone",
        paragraphs: [
          "The train from 'Frisco was very late. It should have arrived at Hugson's Siding at midnight, but it was already five o'clock and the gray dawn was breaking in the east when the little train slowly rumbled up to the open shed that served for the station-house. As it came to a stop the conductor called out in a loud voice:",
          '"Hugson\'s Siding!"',
          "At once a little girl rose from her seat and walked to the door of the car, carrying a wicker suitcase in one hand and a round birdcage covered up with newspapers in the other, while a parasol was tucked under her arm. The conductor helped her off the car and then the engineer started his train again, so that it puffed and groaned and moved slowly away up the track. The reason he was so late was because all through the night there were times when the solid earth shook and trembled under him, and the engineer was afraid that at any moment the rails might spread apart and an accident happen to his passengers. So he moved the cars slowly and with caution.",
          "The little girl stood still to watch until the train had disappeared around a curve; then she turned to see where she was.",
          "The shed at Hugson's Siding was bare save for an old wooden bench, and did not look very inviting. As she peered through the soft gray light not a house of any sort was visible near the station, nor was any person in sight; but after a while the child discovered a horse and buggy standing near a group of trees a short distance away. She walked toward it and found the horse tied to a tree and standing motionless, with its head hanging down almost to the ground. It was a big horse, tall and bony, with long legs and large knees and feet.",
        ],
        ambientSections: [
          { start: 0, end: 10, description: "Birds Chirping" },
          { start: 93, end: 120, description: "Water Flowing" },
          { start: 183, end: 230, description: "Wind Blowing" },
        ],
      },
      {
        audio:
          "https://etc.usf.edu/lit2go/audio/mp3/the-wonderful-wizard-of-oz-003-chapter-2-the-council-with-the-munchkins.2748.mp3",
        title: "The Council with the Munchkins",
        paragraphs: [
          "She was awakened by a shock, so sudden and severe that if Dorothy had not been lying on the soft bed she might have been hurt. As it was, the jar made her catch her breath and wonder what had happened; and Toto put his cold little nose into her face and whined dismally. Dorothy sat up and noticed that the house was not moving; nor was it dark, for the bright sunshine came in at the window, flooding the little room. She sprang from her bed and with Toto at her heels ran and opened the door.",
          "The little girl gave a cry of amazement and looked about her, her eyes growing bigger and bigger at the wonderful sights she saw.",
          "The cyclone had set the house down very gently—for a cyclone—in the midst of a country of marvelous beauty. There were lovely patches of greensward all about, with stately trees bearing rich and luscious fruits. Banks of gorgeous flowers were on every hand, and birds with rare and brilliant plumage sang and fluttered in the trees and bushes. A little way off was a small brook, rushing and sparkling along between green banks, and murmuring in a voice very grateful to a little girl who had lived so long on the dry, gray prairies.",
          "While she stood looking eagerly at the strange and beautiful sights, she noticed coming toward her a group of the queerest people she had ever seen. They were not as big as the grown folk she had always been used to; but neither were they very small. In fact, they seemed about as tall as Dorothy, who was a well-grown child for her age, although they were, so far as looks go, many years older.",
          "Three were men and one a woman, and all were oddly dressed. They wore round hats that rose to a small point a foot above their heads, with little bells around the brims that tinkled sweetly as they moved. The hats of the men were blue; the little woman's hat was white, and she wore a white gown that hung in pleats from her shoulders. Over it were sprinkled little stars that glistened in the sun like diamonds. The men were dressed in blue, of the same shade as their hats, and wore well-polished boots with a deep roll of blue at the tops. The men, Dorothy thought, were about as old as Uncle Henry, for two of them had beards. But the little woman was doubtless much older. Her face was covered with wrinkles, her hair was nearly white, and she walked rather stiffly.",
        ],
        ambientSections: [
          { start: 0, end: 10, description: "Birds Chirping" },
          { start: 69, end: 72, description: "Water Flowing" },
          { start: 335, end: 407, description: "Wind Blowing" },
        ],
      },
    ],
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
    chapters: [
      {
        audio: "https://dl.sndup.net/jf8jv/woz1-rec.mp3",
        title: "The Cyclone",
        paragraphs: [
          "The train from 'Frisco was very late. It should have arrived at Hugson's Siding at midnight, but it was already five o'clock and the gray dawn was breaking in the east when the little train slowly rumbled up to the open shed that served for the station-house. As it came to a stop the conductor called out in a loud voice:",
          '"Hugson\'s Siding!"',
          "At once a little girl rose from her seat and walked to the door of the car, carrying a wicker suitcase in one hand and a round birdcage covered up with newspapers in the other, while a parasol was tucked under her arm. The conductor helped her off the car and then the engineer started his train again, so that it puffed and groaned and moved slowly away up the track. The reason he was so late was because all through the night there were times when the solid earth shook and trembled under him, and the engineer was afraid that at any moment the rails might spread apart and an accident happen to his passengers. So he moved the cars slowly and with caution.",
          "The little girl stood still to watch until the train had disappeared around a curve; then she turned to see where she was.",
          "The shed at Hugson's Siding was bare save for an old wooden bench, and did not look very inviting. As she peered through the soft gray light not a house of any sort was visible near the station, nor was any person in sight; but after a while the child discovered a horse and buggy standing near a group of trees a short distance away. She walked toward it and found the horse tied to a tree and standing motionless, with its head hanging down almost to the ground. It was a big horse, tall and bony, with long legs and large knees and feet.",
        ],
        ambientSections: [
          { start: 0, end: 10, description: "Birds Chirping" },
          { start: 30, end: 40, description: "Water Flowing" },
          { start: 72, end: 94, description: "Wind Blowing" },
        ],
      },
    ],
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
    chapters: [
      {
        audio: "https://dl.sndup.net/jf8jv/woz1-rec.mp3",
        title: "The Cyclone",
        paragraphs: [
          "The train from 'Frisco was very late. It should have arrived at Hugson's Siding at midnight, but it was already five o'clock and the gray dawn was breaking in the east when the little train slowly rumbled up to the open shed that served for the station-house. As it came to a stop the conductor called out in a loud voice:",
          '"Hugson\'s Siding!"',
          "At once a little girl rose from her seat and walked to the door of the car, carrying a wicker suitcase in one hand and a round birdcage covered up with newspapers in the other, while a parasol was tucked under her arm. The conductor helped her off the car and then the engineer started his train again, so that it puffed and groaned and moved slowly away up the track. The reason he was so late was because all through the night there were times when the solid earth shook and trembled under him, and the engineer was afraid that at any moment the rails might spread apart and an accident happen to his passengers. So he moved the cars slowly and with caution.",
          "The little girl stood still to watch until the train had disappeared around a curve; then she turned to see where she was.",
          "The shed at Hugson's Siding was bare save for an old wooden bench, and did not look very inviting. As she peered through the soft gray light not a house of any sort was visible near the station, nor was any person in sight; but after a while the child discovered a horse and buggy standing near a group of trees a short distance away. She walked toward it and found the horse tied to a tree and standing motionless, with its head hanging down almost to the ground. It was a big horse, tall and bony, with long legs and large knees and feet.",
        ],
        ambientSections: [
          { start: 0, end: 10, description: "Birds Chirping" },
          { start: 30, end: 40, description: "Water Flowing" },
          { start: 72, end: 94, description: "Wind Blowing" },
        ],
      },
    ],
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
    chapters: [
      {
        audio: "https://dl.sndup.net/jf8jv/woz1-rec.mp3",
        title: "The Cyclone",
        paragraphs: [
          "The train from 'Frisco was very late. It should have arrived at Hugson's Siding at midnight, but it was already five o'clock and the gray dawn was breaking in the east when the little train slowly rumbled up to the open shed that served for the station-house. As it came to a stop the conductor called out in a loud voice:",
          '"Hugson\'s Siding!"',
          "At once a little girl rose from her seat and walked to the door of the car, carrying a wicker suitcase in one hand and a round birdcage covered up with newspapers in the other, while a parasol was tucked under her arm. The conductor helped her off the car and then the engineer started his train again, so that it puffed and groaned and moved slowly away up the track. The reason he was so late was because all through the night there were times when the solid earth shook and trembled under him, and the engineer was afraid that at any moment the rails might spread apart and an accident happen to his passengers. So he moved the cars slowly and with caution.",
          "The little girl stood still to watch until the train had disappeared around a curve; then she turned to see where she was.",
          "The shed at Hugson's Siding was bare save for an old wooden bench, and did not look very inviting. As she peered through the soft gray light not a house of any sort was visible near the station, nor was any person in sight; but after a while the child discovered a horse and buggy standing near a group of trees a short distance away. She walked toward it and found the horse tied to a tree and standing motionless, with its head hanging down almost to the ground. It was a big horse, tall and bony, with long legs and large knees and feet.",
        ],
        ambientSections: [
          { start: 0, end: 10, description: "Birds Chirping" },
          { start: 30, end: 40, description: "Water Flowing" },
          { start: 72, end: 94, description: "Wind Blowing" },
        ],
      },
    ],
    length: 8742,
    genre: "Novel",
    accentColor: "#02B381",
  },
];

export type GetBooksParams = { method: "GET"; body: {} };
export type GetBooksPayload = { method: "GET"; books: Book[] };

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
      const books = await prisma.book.findMany();
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
