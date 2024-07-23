import type { NextPageWithConfig } from "~/types";
import React from "react";
import { useGetAllBooks } from "~/lib/queries";
import { BookPreview } from "~/partials";
import { Loading, Error, ScrollContainer } from "~/components";
import { PiBooksDuotone } from "react-icons/pi";

const Library: NextPageWithConfig = () => {
  const { data: books, status } = useGetAllBooks();

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-lg font-bold text-primary font-primary">Immersive Books</h1>
      {status === "loading" && <Loading message="Loading library..." />}
      {status === "error" && <Error message="Failed to load books" />}
      {status === "success" && (
        <ScrollContainer className="relative h-[calc(100vh-152px-125px)]" blinderHeight={128}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {books.map((book) => (
              <BookPreview key={book.slug} {...book} />
            ))}
          </div>
        </ScrollContainer>
      )}
    </div>
  );
};

Library.config = {
  layout: {
    header: {
      view: "main",
    },
    nav: {
      items: [
        { variant: "secondary", icon: PiBooksDuotone, span: 1 },
        { variant: "primary", children: "Random", span: 2 },
      ],
    },
  },
  seo: { title: "Atmosphere | Books", description: "The atmosphere library of immersive audio books." },
};

export default Library;
