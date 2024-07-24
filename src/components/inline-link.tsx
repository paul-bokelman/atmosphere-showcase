import Link from "next/link";

type Props = React.PropsWithChildren<{ href: string; external?: boolean }>;

export const InlineLink: React.FC<Props> = ({ href, external, children }) => {
  const classes = "text-accent hover:brightness-110 underline transition-colors";
  if (external) {
    return (
      <a href={href} className={classes} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
};
