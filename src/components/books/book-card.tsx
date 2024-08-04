import type { GetBooksPayload } from "~/pages/api/types";
import Link from "next/link";

type Props = GetBooksPayload["books"][number];

export const BookCard: React.FC<Props> = ({ slug, title, cover, author, year, _count, length, genre }) => {
  return (
    <Link href={`/books/${slug}`} className="w-fit flex items-center gap-8 group cursor-pointer">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={cover ?? "https://www.marytribble.com/wp-content/uploads/2020/12/book-cover-placeholder.png"}
        alt={title}
        className="rounded-lg w-[120px] group-hover:scale-105 transition-transform"
      />
      <div className="flex flex-col gap-2">
        <h2 className="text-base font-bold text-primary font-primary group-hover:text-accent">{title}</h2>
        <div className="flex justify-center items-center w-fit text-sm px-1.5 py-0.5 bg-accent/10 text-accent rounded-md">
          <span className="relative top-0.5">{genre}</span>
        </div>
        <span className="text-secondary">
          {author} • {year}
        </span>
        <span className="text-secondary">{_count.chapters} chapters</span>
      </div>
    </Link>
  );
};
