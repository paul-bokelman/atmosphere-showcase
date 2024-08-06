import type { NextPage, GetServerSideProps } from "next";
import type { PropsWithConfig } from "~/types";
import type { GetBooksPayload } from "~/pages/api/types";
import React from "react";
import { getAllBooks, getFeaturedBook } from "~/lib/queries";
import { ScrollContainer } from "~/components";
import { BookCard } from "~/components/books";

type Props = PropsWithConfig<GetBooksPayload>;

const Library: NextPage<Props> = ({ books }) => {
  return (
    <ScrollContainer className="h-full relative" blinderHeight={128}>
      <div className="flex flex-col gap-4 md:gap-8">
        <h1 className="md:text-lg text-primary font-primary">Immersive Books</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {books.map((book) => (
            <BookCard key={book.slug} {...book} />
          ))}
        </div>
      </div>
    </ScrollContainer>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const query = await getAllBooks({ body: {} });
  const featuredQuery = await getFeaturedBook({});

  if (query.status === "error" || featuredQuery.status === "error") {
    return { redirect: { destination: "/500", permanent: false } };
  }

  const randomBook = query.books[Math.floor(Math.random() * query.books.length)];

  return {
    props: {
      ...query,
      config: {
        layout: {
          header: {
            view: "main",
          },
          nav: {
            items: [
              { span: 1, variant: "secondary", icon: "featured", href: `/books/${featuredQuery.slug}` },
              { span: 2, variant: "primary", children: "Random", href: `/books/${randomBook.slug}` },
            ],
          },
        },
        seo: { title: "Library", description: "The atmosphere library of immersive audio books." },
      },
    },
  };
};

export default Library;
