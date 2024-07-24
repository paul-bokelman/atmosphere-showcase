import type { Book } from "~/types";
import Link from "next/link";
import { secondsToTimestamp } from "~/lib/utils";

export const BookPreview: React.FC<Book> = ({ slug, title, cover, author, date, chapters, length, genre }) => {
  return (
    <Link href={`/books/${slug}`} className="w-fit flex items-center gap-8 group cursor-pointer">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={cover} alt={title} className="rounded-lg w-[100px] group-hover:scale-105 transition-transform" />
      <div className="flex flex-col gap-2">
        <h2 className="text-base font-bold text-primary font-primary group-hover:text-accent">{title}</h2>
        <span className="w-fit text-sm px-1.5 py-0.5 bg-accent/10 text-accent rounded-md">{genre}</span>
        <span className="text-secondary text-sm md:text-base">
          {author} • {date}
        </span>
        <span className="text-secondary text-sm md:text-base">
          {chapters.length} chapters • {secondsToTimestamp(length)}
        </span>
      </div>
    </Link>
  );
};
