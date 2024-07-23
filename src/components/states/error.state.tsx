import { BiSolidErrorAlt } from "react-icons/bi";

type Props = {
  message?: string;
};
export const Error: React.FC<Props> = ({ message }) => {
  return (
    <div className="flex items-center gap-2 text-red-500 text-base">
      <BiSolidErrorAlt />
      <span>{message ?? "Loading..."}</span>
    </div>
  );
};
