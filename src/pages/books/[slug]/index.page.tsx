import type { NextPage, GetServerSideProps } from "next";
import type { PropsWithConfig } from "~/types";
import type { GetBookPayload } from "~/pages/api/books";
import { getBook } from "~/lib/queries";
import { ScrollContainer } from "~/components";

type Props = PropsWithConfig<GetBookPayload>;

const BookPreview: NextPage<Props> = ({ book }) => {
  return (
    <ScrollContainer className="h-full relative py-4" blinderHeight={128}>
      <div className="relative flex flex-col gap-8">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={book.cover ?? "https://www.marytribble.com/wp-content/uploads/2020/12/book-cover-placeholder.png"}
          alt={book.title}
          className="rounded-lg h-[300px] md:h-[350px] mx-auto"
        />
        <div className="flex flex-col gap-2 items-center mx-auto">
          <h1 className="sm:text-lg text-center font-bold text-primary font-primary">{book.title}</h1>
          <span className="text-secondary font-secondary">{book.author}</span>
          <p className="text-secondary font-secondary leading-6 sm:leading-8">{book.description}</p>
        </div>
      </div>
    </ScrollContainer>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async ({ params }) => {
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
          header: { view: "main", link: "/books" },
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
