type Props = React.PropsWithChildren<React.AnchorHTMLAttributes<HTMLAnchorElement>>;

export const InlineLink: React.FC<Props> = ({ href, children }) => {
  return (
    <a
      href={href}
      className="text-accent hover:brightness-110 underline transition-colors"
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  );
};
