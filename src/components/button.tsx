import type { IconType } from "react-icons";
import Link from "next/link";

export type ButtonProps = React.PropsWithChildren<
  | {
      variant: "primary";
    }
  | { variant: "secondary" }
  | { variant: "reactive"; color: string; bg: string }
> & {
  icon?: IconType;
  link?: {
    external?: boolean;
    href: string;
  };
};

const ButtonWrapper: React.FC<ButtonProps & { className: string; style: React.CSSProperties }> = (props) => {
  if (!props.link) {
    return (
      <button style={props.style} className={props.className}>
        {props.children}
      </button>
    );
  }

  if (props.link?.external) {
    return (
      <a
        href={props.link.href}
        target="_blank"
        rel="noopener noreferrer"
        style={props.style}
        className={props.className}
      >
        {props.children}
      </a>
    );
  }

  return (
    <Link href={props.link.href} style={props.style} className={props.className}>
      {props.children}
    </Link>
  );
};

export const Button: React.FC<ButtonProps> = (props) => {
  const color = props.variant === "primary" ? "#1F2025" : props.variant === "secondary" ? "#C4C4C4" : props.color;
  const bg = props.variant === "primary" ? "#E9D8A6" : props.variant === "secondary" ? "#FFFFFF10" : props.bg;
  return (
    <ButtonWrapper
      {...props}
      style={{ backgroundColor: bg, color }}
      className="w-full flex justify-center items-center px-4 h-[61px] rounded-[21px] text-base font-semibold hover:scale-[1.04] transition-all active:scale-95 hover:brightness-90"
    >
      {props.icon ? <props.icon className="w-6 h-6 text-secondary" /> : props.children}
    </ButtonWrapper>
  );
};
