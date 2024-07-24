import type { IconType } from "react-icons";
import type { NavigationLinkProps } from "~/components/layout";
import { PiStarDuotone, PiBooksDuotone } from "react-icons/pi";
import { NavigationLink } from "~/components/layout";

type NavigationIcons = "featured" | "library";

type Item = NavigationLinkProps & { span: number };

export type NavigationOptions = {
  items: Item[];
};
type Props = React.PropsWithChildren<NavigationOptions>;

const iconMap: { [key in NavigationIcons]: IconType } = {
  featured: PiStarDuotone,
  library: PiBooksDuotone,
};

const reactiveActive = {
  color: "#E9D8A6",
  bg: "#FFFFFF10",
};

export const LayoutNavigation: React.FC<Props> = ({ items }) => {
  const totalColumns = items.reduce((acc, item) => acc + item.span, 0);

  return (
    <div className="w-full absolute bottom-0 flex justify-center">
      <div className="w-[400px] grid gap-4" style={{ gridTemplateColumns: `repeat(${totalColumns}, minmax(0, 1fr))` }}>
        {items.map(({ span, ...rest }, index) => (
          <div key={index} style={{ gridColumn: `span ${span} / span ${span}` }}>
            <NavigationLink {...rest} />
          </div>
        ))}
      </div>
    </div>
  );
};
