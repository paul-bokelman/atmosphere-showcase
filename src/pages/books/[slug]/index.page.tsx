import type { NextPage, GetStaticProps, GetStaticPaths } from "next";
import type { PropsWithConfig } from "~/types";
import type { GetBookPayload } from "~/pages/api/books";
import { getBook, getAllBooks } from "~/lib/queries";
import { ScrollContainer } from "~/components";

type Props = PropsWithConfig<GetBookPayload>;

const BookPreview: NextPage<Props> = ({ book }) => {
  return (
    <div className="w-full flex flex-col gap-2 items-center justify-center">
      <div className="w-full grid grid-cols-1 md:grid-cols-2 md:mt-8 max-h-[350px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={book.cover ?? "https://www.marytribble.com/wp-content/uploads/2020/12/book-cover-placeholder.png"}
          alt={book.title}
          className="rounded-lg h-[250px] md:h-[350px] mx-auto"
        />
        <ScrollContainer className="mt-6 md:mt-0 relative h-[18rem] md:h-[30rem]" blinderHeight={50}>
          <div className="flex flex-col gap-2 items-center md:items-start mx-auto">
            <h1 className="text-lg text-center md:text-left font-bold text-primary font-primary">{book.title}</h1>
            <span className="text-secondary font-secondary">{book.author}</span>
            <p className="text-secondary font-secondary leading-8">
              {book.description} {book.description} {book.description}
            </p>
          </div>
        </ScrollContainer>
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
