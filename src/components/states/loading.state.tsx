import { PiSpinnerBold } from "react-icons/pi";

type Props = {
  message?: string;
};
export const Loading: React.FC<Props> = ({ message }) => {
  return (
    <div className="flex items-center gap-2 text-secondary text-base">
      <PiSpinnerBold className="animate-spin" />
      <span>{message ?? "Loading..."}</span>
    </div>
  );
};
