import type { IconType } from "react-icons";
import Link from "next/link";
import { PiBooksDuotone, PiStarDuotone } from "react-icons/pi";
import { FaGithub } from "react-icons/fa";
import cn from "classnames";

export type SupportedIcons = "featured" | "library" | "github";

export type NavigationLinkProps = React.HTMLProps<HTMLAnchorElement> & {
  href: string;
  external?: boolean;
  active?: boolean;
} & ({ variant: "primary" } | { variant: "secondary" } | { variant: "reactive"; color: string; bg: string }) &
  ({ icon: undefined; children: React.ReactNode } | { icon: SupportedIcons });

const iconsMap: { [key in SupportedIcons]: IconType } = {
  featured: PiStarDuotone,
  library: PiBooksDuotone,
  github: FaGithub,
};

const LinkWrapper: React.FC<React.PropsWithChildren<Omit<NavigationLinkProps, "icon">>> = (props) => {
  const { external = false, ...rest } = props;
  if (external) {
    return (
      <a target="_blank" rel="noopener noreferrer" {...rest}>
        {props.children}
      </a>
    );
  }

  return <Link {...rest}>{props.children}</Link>;
};

export const NavigationLink: React.FC<NavigationLinkProps> = (props) => {
  const { icon, active = false, style, className, ...rest } = props;
  const color = active
    ? "#E9D8A6"
    : props.variant === "primary"
    ? "#1F2025"
    : props.variant === "secondary"
    ? "#C4C4C4"
    : props.color;
  const bg = active
    ? "#FFFFFF10"
    : props.variant === "primary"
    ? "#E9D8A6"
    : props.variant === "secondary"
    ? "#FFFFFF10"
    : props.bg;

  const styles = { backgroundColor: bg, color, ...style };
  const classes = cn(
    "w-full flex justify-center items-center px-4 h-[61px] rounded-[21px] text-base font-semibold hover:scale-[1.04] transition-all active:scale-95 hover:brightness-90",
    className
  );
  const SelectedIcon = icon ? iconsMap[icon] : undefined;

  return (
    <LinkWrapper {...rest} style={styles} className={classes}>
      {SelectedIcon ? <SelectedIcon className="w-6 h-6" /> : props.children}
    </LinkWrapper>
  );
};
