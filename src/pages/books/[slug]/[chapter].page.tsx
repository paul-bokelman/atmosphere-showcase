import type { NextPage, GetStaticProps, GetStaticPaths } from "next";
import type { PropsWithConfig } from "~/types";
import type { GetBookChapterPayload } from "~/pages/api/books";
import React from "react";
import { useRouter } from "next/router";
import { getAllBooks, getBookChapter } from "~/lib/queries";
import { AudioPlayer } from "~/partials/audio";
import { ScrollContainer } from "~/components";

type Props = PropsWithConfig<GetBookChapterPayload>;

const ReadBook: NextPage<Props> = ({ chapter, book }) => {
  const router = useRouter();
  const [mainContainerRef, setMainContainerRef] = React.useState<HTMLDivElement | null>(null);
  const shouldScrollState = React.useState<boolean>(false);

  const totalChapters = book._count.chapters;
  const nextChapterDisabled = chapter.number === totalChapters;
  const prevChapterDisabled = chapter.number === 1;

  const handleScrollTop = () => {
    shouldScrollState[1](true);
  };

  const handleNextChapter = async () => {
    if (nextChapterDisabled) return;
    await router.push(`/books/${router.query.slug}/${chapter.number + 1}`);
    handleScrollTop();
  };

  const handlePrevChapter = async () => {
    if (prevChapterDisabled) return;
    await router.push(`/books/${router.query.slug}/${chapter.number - 1}`);
    handleScrollTop();
  };

  return (
    <div className="w-full flex flex-col gap-2 items-center justify-center">
      <ScrollContainer
        shouldScrollState={shouldScrollState}
        // technical debt (not actually responsive)...
        className="relative h-[calc(100vh-240px)] md:h-[calc(100vh-268px)] "
        blinderHeight={64}
      >
        <div className="flex flex-col gap-2">
          <div className="relative flex items-center gap-4">
            <div
              style={{ background: book.accentColor ?? "#E9D8A6" }}
              className="relative bottom-[1px] h-1 w-12 rounded-full"
            />
            <span className="text-secondary font-secondary text-sm">{book.author}</span>
          </div>
          <h1 className="font-primary text-base md:text-lg">{book.title}</h1>
          <div className="flex flex-col gap-6 text-secondary font-light mt-2 md:mt-6">
            <h2 className="font-primary md:text-lg">{chapter.name}</h2>
            {chapter.text.split("\n").map((paragraph, index) => (
              <p key={index} className="leading-8">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </ScrollContainer>
      <div className="w-full mt-4 md:mt-8">
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
