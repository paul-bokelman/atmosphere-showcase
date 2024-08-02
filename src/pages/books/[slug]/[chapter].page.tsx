import type { NextPage, GetStaticProps, GetStaticPaths } from "next";
import type { PropsWithConfig } from "~/types";
import type { GetBookChapterPayload } from "~/pages/api/books";
import React from "react";
import { useRouter } from "next/router";
import { getAllBooks, getBookChapter } from "~/lib/queries";
import { AudioPlayer } from "~/partials/audio";

type Props = PropsWithConfig<GetBookChapterPayload>;

const ReadBook: NextPage<Props> = ({ chapter, book }) => {
  const router = useRouter();
  const mainContainerRef = React.useRef<HTMLDivElement | null>(null);

  const totalChapters = book._count.chapters;
  const nextChapterDisabled = chapter.number === totalChapters;
  const prevChapterDisabled = chapter.number === 1;

  const handleNextChapter = () => {
    if (nextChapterDisabled) return;
    router.push(`/books/${router.query.slug}/${chapter.number + 1}`);
    if (mainContainerRef.current) mainContainerRef.current.scrollTo(0, 0);
  };

  const handlePrevChapter = () => {
    if (prevChapterDisabled) return;
    router.push(`/books/${router.query.slug}/${chapter.number - 1}`);
    if (mainContainerRef.current) mainContainerRef.current.scrollTo(0, 0);
  };

  return (
    <div className="w-full flex flex-col gap-2 items-center justify-center ">
      <div className="flex flex-col gap-2">
        <div
          ref={mainContainerRef}
          className="flex flex-col gap-4 h-[calc(100vh-182px-86px)] overflow-scroll no-scrollbar"
        >
          <div className="flex flex-col gap-2">
            <div className="relative flex items-center gap-4">
              <div
                style={{ background: book.accentColor ?? "#E9D8A6" }}
                className="relative bottom-[1px] h-1 w-12 rounded-full"
              />
              <span className="text-secondary font-secondary text-sm">{book.author}</span>
            </div>
            <h1 className="font-primary text-lg">{book.title}</h1>
          </div>
          <div className="flex flex-col gap-6 text-secondary font-light mt-6">
            <h2 className="font-primary text-lg">{chapter.name}</h2>
            {chapter.text.split("\n").map((paragraph, index) => (
              <p key={index} className="leading-8">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
        <div className="mt-10">
          <AudioPlayer
            color={book.accentColor ?? "#E9D8A6"}
            currentChapter={chapter}
            chapterNumber={chapter.number}
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
  const query = await getAllBooks({ body: {} });

  if (query.status === "error") {
    return { paths: [], fallback: false };
  }

  const paths = [];
  for (const book of query.books) {
    for (let i = 1; i <= book._count.chapters; i++) {
      paths.push({ params: { slug: book.slug, chapter: i.toString() } });
    }
  }

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const slug = params?.slug as string;
  const chapterNumber = params?.chapter as string;
  const query = await getBookChapter({ query: { slug, chapter: chapterNumber } });

  if (query.status === "error") {
    return { notFound: true };
  }

  const { chapter, book } = query;

  return {
    props: {
      ...query,
      config: {
        layout: { header: { view: "backtrack", text: book.title } },
        seo: {
          title: `${query.book.title} | ${chapter.name}`,
          description: `Reading Chapter ${chapter} (${chapter.name}) of ${book.title} by ${book.author}`,
        },
      },
    },
  };
};

export default ReadBook;
