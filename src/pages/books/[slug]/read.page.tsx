import type { NextPageWithConfig } from "~/types";
import { useRouter } from "next/router";
import { useSearchParams } from "next/navigation";
import { useGetBook } from "~/lib/queries";
import { Button, Loading, Error, ScrollContainer } from "~/components";
import { PiBooksDuotone } from "react-icons/pi";

const ReadBook: NextPageWithConfig = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const chapter = searchParams.get("chapter");
  const { data: book, status } = useGetBook(router.query.slug as string);
  return (
    <div className="w-full flex flex-col gap-2 items-center justify-center">
      {status === "error" && <Error message="Failed to load book" />}
      {status === "loading" && <Loading message="Loading Book..." />}
      {status === "success" && (
        <div className="w-full flex flex-col items-center">
          <img src={book.cover} alt={book.title} className="rounded-lg h-[250px] md:h-[300px]" />
          <div className="flex flex-col gap-2 items-center justify-center mt-8">
            <h1 className="text-lg font-bold text-primary font-primary">{book.title}</h1>
            <span className="text-secondary font-secondary">{book.author}</span>
            <ScrollContainer className="mt-6 relative h-48 md:h-32" blinderHeight={50}>
              <p className="text-secondary font-secondary leading-8">
                {book.description} {book.description} {book.description}
              </p>
            </ScrollContainer>
          </div>
          <div className="absolute z-10 bottom-0 w-full grid grid-cols-4 gap-2">
            <div className="col-span-1">
              <Button variant="secondary" link={{ href: "/books" }} icon={PiBooksDuotone} />
            </div>
            <div className="col-span-3">
              <Button
                variant="reactive"
                link={{ href: `/books/${router.query.slug}/read?chapter=1` }}
                bg={book.accentColor}
                color="#fff"
              >
                Read
              </Button>
            </div>
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
