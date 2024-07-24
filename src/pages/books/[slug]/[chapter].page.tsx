import type { NextPage, GetStaticProps, GetStaticPaths } from "next";
import type { Book, Chapter, PropsWithConfig } from "~/types";
import React from "react";
import { useRouter } from "next/router";
import { getBook, getAllBooks } from "~/lib/queries";
import { AudioPlayer } from "~/partials/audio";

type Props = PropsWithConfig<{
  data: { chapter: Chapter } & Pick<Book, "accentColor" | "author" | "title"> & {
      chapterNumber: number;
      totalChapters: number;
    };
}>;

const ReadBook: NextPage<Props> = ({
  data: { chapter, chapterNumber, totalChapters, title, author, accentColor },
  config,
}) => {
  const router = useRouter();

  const nextChapterDisabled = chapterNumber === totalChapters;
  const prevChapterDisabled = chapterNumber === 1;

  const handleNextChapter = () => {
    if (nextChapterDisabled) return;
    router.push(`/books/${router.query.slug}/${chapterNumber + 1}`);
  };

  const handlePrevChapter = () => {
    if (prevChapterDisabled) return;
    router.push(`/books/${router.query.slug}/${chapterNumber - 1}`);
  };

  return (
    <div className="w-full flex flex-col gap-2 items-center justify-center ">
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-4 h-[calc(100vh-182px-86px)] overflow-scroll no-scrollbar">
          <div className="flex flex-col gap-2">
            <div className="relative flex items-center gap-4">
              <div style={{ background: accentColor }} className="relative bottom-[1px] h-1 w-12 rounded-full" />
              <span className="text-secondary font-secondary text-sm">{author}</span>
            </div>
            <h1 className="font-primary text-lg">{title}</h1>
          </div>
          <div className="flex flex-col gap-6 text-secondary font-light mt-6">
            <h2 className="font-primary text-lg">
              Chapter {chapterNumber}: {chapter.title}
            </h2>
            {chapter.paragraphs.map((paragraph, index) => (
              <p key={index} className="leading-8">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
        <div className="mt-10">
          <AudioPlayer
            color={accentColor}
            currentChapter={chapter}
            totalChapters={totalChapters}
            chapterNumber={chapterNumber}
            nextChapterDisabled={nextChapterDisabled}
            prevChapterDisabled={prevChapterDisabled}
            onNext={handleNextChapter}
            onPrev={handlePrevChapter}
          />
        </div>
      </div>
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async (context) => {
  const query = await getAllBooks();

  if (query.status === "error") {
    return { paths: [], fallback: false };
  }

  const books = query.data;
  const paths = [];
  for (const book of books) {
    for (let i = 1; i <= book.chapters.length; i++) {
      paths.push({ params: { slug: book.slug, chapter: i.toString() } });
    }
  }

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const slug = params?.slug as string;
  const chapter = parseInt(params?.chapter as string);
  const query = await getBook(slug);

  if (query.status === "error") {
    return { notFound: true };
  }

  const book = query.data;

  return {
    props: {
      data: {
        chapter: book.chapters[chapter - 1],
        chapterNumber: chapter,
        totalChapters: book.chapters.length,
        title: book.title,
        author: book.author,
        accentColor: book.accentColor,
      },
      config: {
        layout: { header: { view: "backtrack", text: book.title } },
        seo: {
          title: `${book.title} - ${book.chapters[chapter - 1].title}`,
          description: `Reading Chapter ${chapter} (${book.chapters[chapter - 1].title}) of ${book.title} by ${
            book.author
          }`,
        },
      },
    },
  };
};

export default ReadBook;
