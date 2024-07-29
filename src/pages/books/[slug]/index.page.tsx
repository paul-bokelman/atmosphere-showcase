import type { NextPage, GetStaticProps, GetStaticPaths } from "next";
import type { PropsWithConfig } from "~/types";
import type { GetBookPayload } from "~/pages/api/books";
import { getBook, getAllBooks } from "~/lib/queries";
import { ScrollContainer } from "~/components";

type Props = PropsWithConfig<GetBookPayload>;

const BookPreview: NextPage<Props> = ({ book }) => {
  return (
    <div className="w-full flex flex-col gap-2 items-center justify-center">
      <div className="w-full grid grid-cols-1 md:grid-cols-2 justify-center items-center md:mt-8 max-h-[350px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={book.cover ?? "https://www.marytribble.com/wp-content/uploads/2020/12/book-cover-placeholder.png"}
          alt={book.title}
          className="rounded-lg h-[250px] md:h-[350px] mx-auto"
        />
        <div className="flex flex-col gap-2 items-center md:items-start mx-auto mt-8 md:mt-0">
          <h1 className="text-lg font-bold text-primary font-primary">{book.title}</h1>
          <span className="text-secondary font-secondary">{book.author}</span>
          <ScrollContainer className="mt-6 relative h-48 md:h-60" blinderHeight={50}>
            <p className="text-secondary font-secondary leading-8">
              {book.description} {book.description} {book.description}
            </p>
          </ScrollContainer>
        </div>
      </div>
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const query = await getAllBooks({ body: {} });

  if (query.status === "error") {
    return { paths: [], fallback: false };
  }

  const books = query.books;

  const paths = books.map(({ slug }) => ({ params: { slug } }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const slug = params?.slug as string;
  const query = await getBook({ query: { slug } });

  if (query.status === "error") {
    return { notFound: true };
  }

  return {
    props: {
      ...query,
      config: {
        layout: {
          header: {
            view: "backtrack",
          },
          nav: {
            items: [
              { span: 1, variant: "secondary", href: "/books", icon: "library" },
              {
                span: 2,
                variant: "reactive",
                href: `/books/${slug}/1`,
                bg: query.book.accentColor ?? "#E9D8A6",
                color: "#fff",
                children: "Read",
              },
            ],
          },
        },
        seo: {
          title: `${query.book.title} | Preview`,
          description: `Preview of ${query.book.title} by ${query.book.author}`,
        },
      },
    },
  };
};

export default BookPreview;
