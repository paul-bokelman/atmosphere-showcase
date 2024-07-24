import type { NextPageWithConfig } from "~/types";
import React from "react";
import { useRouter } from "next/router";
import { useSearchParams } from "next/navigation";
import { useGetBook } from "~/lib/queries";
import { Loading, Error } from "~/components";
import { AudioPlayer } from "~/partials/audio";

const ReadBook: NextPageWithConfig = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const chapter = searchParams.get("chapter");
  const { data: book, status } = useGetBook(router.query.slug as string);
  const [currentChapterIndex, setCurrentChapterIndex] = React.useState(parseInt(chapter ?? "1") - 1);
  const [currentChapter, setCurrentChapter] = React.useState(book?.chapters[currentChapterIndex]);

  const handleNextChapter = () => {
    if (!book || currentChapterIndex === book.chapters.length - 1) return;
    const nextChapter = parseInt(chapter ?? "1") + 1;
    router.push(`/books/${router.query.slug}/read?chapter=${nextChapter}`);
    setCurrentChapterIndex((prev) => prev + 1);
  };

  const handlePrevChapter = () => {
    if (!book || currentChapterIndex === 0) return;
    const prevChapter = parseInt(chapter ?? "1") - 1;
    router.push(`/books/${router.query.slug}/read?chapter=${prevChapter}`);
    setCurrentChapterIndex((prev) => prev - 1);
  };

  React.useEffect(() => {
    setCurrentChapter(book?.chapters[currentChapterIndex]);
  }, [book, currentChapterIndex]);

  React.useEffect(() => {
    setCurrentChapterIndex(parseInt(chapter ?? "1") - 1);
  }, [chapter]);

  return (
    <div className="w-full flex flex-col gap-2 items-center justify-center ">
      {status === "error" && <Error message="Failed to load book" />}
      {status === "loading" && <Loading message="Loading Book..." />}
      {status === "success" && !currentChapter && <Error message="Chapter not found" />}
      {status === "success" && currentChapter && (
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-4 h-[calc(100vh-182px-86px)] overflow-scroll no-scrollbar">
            <div className="flex flex-col gap-2">
              <div className="relative flex items-center gap-4">
                <div style={{ background: book.accentColor }} className="relative bottom-[1px] h-1 w-12 rounded-full" />
                <span className="text-secondary font-secondary text-sm">{book.author}</span>
              </div>
              <h1 className="font-primary text-lg">{book.title}</h1>
            </div>
            <div className="flex flex-col gap-6 text-secondary font-light mt-6">
              <h2 className="font-primary text-lg">
                Chapter {parseInt(chapter ?? "1")}: {currentChapter.title}
              </h2>
              {currentChapter.paragraphs.map((paragraph, index) => (
                <p key={index} className="leading-8">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
          <div className="mt-10">
            <AudioPlayer
              color={book.accentColor}
              currentChapter={currentChapter}
              totalChapters={book.chapters.length}
              chapterIndex={currentChapterIndex}
              onNext={handleNextChapter}
              onPrev={handlePrevChapter}
            />
          </div>
        </div>
      )}
    </div>
  );
};

ReadBook.config = {
  layout: {
    header: {
      view: "backtrack",
    },
  },
  seo: {
    title: "Atmosphere | Book",
    description: "The atmosphere library of immersive audio books",
  },
};

export default ReadBook;
