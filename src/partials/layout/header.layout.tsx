import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Logo } from "~/components/icons";

export type HeaderOptions = {
  view: "main" | "backtrack";
};

type Props = HeaderOptions;

export const LayoutHeader: React.FC<Props> = ({ view }) => {
  if (view === "main") {
    return (
      <div className="flex w-full items-center justify-between mb-8">
        <Link href="/" className="flex items-center gap-3 group">
          <Logo />
          <h1 className="text-secondary text-base font-secondary group-hover:text-primary transition-colors">
            Atmosphere
          </h1>
        </Link>
        <a
          href="https://github.com/paul-bokelman/atmosphere"
          target="_blank"
          rel="noopener noreferrer"
          className="text-secondary text-lg hover:text-primary transition-all hover:scale-125"
        >
          <FaGithub />
        </a>
      </div>
    );
  }

  if (view === "backtrack") {
    return (
      <div className="flex w-full items-center justify-between text-secondary mb-8">
        <Link href="/books">
          <IoMdArrowRoundBack className="text-xl hover:text-primary transition-colors" />
        </Link>
        <Link href="/books" className="text-base font-secondary hover:text-accent transition-colors">
          Atmosphere
        </Link>
      </div>
    );
  }

  return null;
};
