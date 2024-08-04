import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Logo } from "~/components/icons";

export type HeaderOptions = { view: "main"; link?: string } | { view: "backtrack"; text?: string };

type Props = HeaderOptions;

export const LayoutHeader: React.FC<Props> = (props) => {
  if (props.view === "main") {
    return (
      <div className="z-10 flex w-full items-center justify-between">
        <Link href={props.link ?? "/"} className="flex items-center gap-3 group">
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

  if (props.view === "backtrack") {
    return (
      <div className="z-10 flex w-full items-center justify-between text-secondary">
        <Link href="/books">
          <IoMdArrowRoundBack className="text-xl hover:text-primary transition-colors" />
        </Link>
        {props.text && <span className="font-secondary w-32 md:w-auto truncate">{props.text}</span>}
        <Link href="/books" className="text-base font-secondary hover:text-accent transition-colors">
          Atmosphere
        </Link>
      </div>
    );
  }

  return null;
};
