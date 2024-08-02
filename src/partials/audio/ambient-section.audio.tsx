import type { AmbientSection as IAmbientSection } from "@prisma/client";

type Props = IAmbientSection & {
  color: string;
  totalDuration: number;
  currentProgress: number;
};

export const AmbientSection: React.FC<Props> = ({ totalDuration, currentProgress, color, start, end, description }) => {
  const state = currentProgress < start ? "unvisited" : currentProgress > end ? "visited" : "current";
  const internalProgress =
    currentProgress < start ? 0 : currentProgress > end ? 1 : (currentProgress - start) / (end - start);
  const mainContainerStyles: React.CSSProperties = {
    width: `${((end - start) / totalDuration) * 100}%`,
    left: `${(start / totalDuration) * 100}%`,
  };

  const visitedContainerStyles: React.CSSProperties = {
    backgroundColor: "#404044",
    width: state === "current" ? `${internalProgress * 100}%` : "100%",
  };

  const unvisitedContainerStyles: React.CSSProperties = {
    display: state === "visited" ? "none" : "block",
    backgroundColor: color,
    width: state === "current" ? `${(1 - internalProgress) * 100}%` : "100%",
    left: state === "current" ? `${internalProgress * 100}%` : "0%",
  };

  return (
    <div style={mainContainerStyles} className="absolute z-10 h-3 bottom-6 left-0 rounded-[4px] overflow-hidden">
      <div style={visitedContainerStyles} className="absolute h-full bg-blue-50" />
      <div style={unvisitedContainerStyles} className="absolute h-full bg-blue-50" />
    </div>
  );
};
