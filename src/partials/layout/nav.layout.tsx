import type { NavigationLinkProps } from "~/components/layout";
import { NavigationLink } from "~/components/layout";

type Item = NavigationLinkProps & { span: number };

export type NavigationOptions = {
  items: Item[];
};
type Props = React.PropsWithChildren<NavigationOptions>;

export const LayoutNavigation: React.FC<Props> = ({ items }) => {
  const totalColumns = items.reduce((acc, item) => acc + item.span, 0);

  return (
    <div className="z-10 w-full flex justify-center items-center">
      <div
        className="w-full md:w-[400px] grid gap-3 md:gap-4"
        style={{ gridTemplateColumns: `repeat(${totalColumns}, minmax(0, 1fr))` }}
      >
        {items.map(({ span, ...rest }, index) => (
          <div key={index} style={{ gridColumn: `span ${span} / span ${span}` }}>
            <NavigationLink {...rest} />
          </div>
        ))}
      </div>
    </div>
  );
};
