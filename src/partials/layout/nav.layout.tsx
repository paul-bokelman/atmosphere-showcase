import type { ButtonProps } from "~/components/button";
import { Button } from "~/components/button";

type Item = ButtonProps & {
  span: number;
};
export type NavigationOptions = {
  items: Item[];
};
type Props = React.PropsWithChildren<NavigationOptions>;

export const LayoutNavigation: React.FC<Props> = ({ items }) => {
  const totalColumns = items.reduce((acc, item) => acc + item.span, 0);

  return (
    <div className="w-full absolute bottom-0 flex justify-center">
      <div className="w-[400px] grid gap-4" style={{ gridTemplateColumns: `repeat(${totalColumns}, minmax(0, 1fr))` }}>
        {items.map((item, index) => (
          <div key={index} style={{ gridColumn: `span ${item.span} / span ${item.span}` }}>
            <Button {...item} />
          </div>
        ))}
      </div>
    </div>
  );
};
