import type { AmbientSection as IAmbientSection } from "@prisma/client";
import { AmbientSection } from "~/partials/audio";

interface ProgressCSSProps extends React.CSSProperties {
  "--progress-width": number;
  "--buffered-width": number;
  "--thumb-offset": number;
  "--accent-color": string;
}

type Props = React.ComponentPropsWithoutRef<"input"> & {
  color: string;
  duration: number;
  currentProgress: number;
  buffered: number;
  ambientSections: IAmbientSection[];
};

export const AudioProgressBar: React.FC<Props> = (props) => {
  const { duration, currentProgress, buffered, ambientSections, ...rest } = props;

  const progressBarWidth = isNaN(currentProgress / duration) ? 0 : currentProgress / duration;
  const bufferedWidth = isNaN(buffered / duration) ? 0 : buffered / duration;

  const progressStyles: ProgressCSSProps = {
    "--progress-width": progressBarWidth,
    "--buffered-width": bufferedWidth,
    "--thumb-offset": progressBarWidth > 0.75 ? 3 : progressBarWidth < 0.25 ? -4 : 0,
    "--accent-color": props.color,
  };

  return (
    <div className="absolute h-2 -top-[4px] left-0 right-0 group">
      {ambientSections.map((section, index) => (
        <AmbientSection
          key={index}
          color={props.color}
          {...section}
          totalDuration={duration}
          currentProgress={currentProgress}
        />
      ))}
      <input
        type="range"
        name="progress"
        className={`progress-bar rounded-full absolute inset-0 w-full m-0 h-full appearance-none cursor-pointer bg-[#404044] transition-all before:absolute before:inset-0 before:h-full accent-[var(--accent-color)] before:bg-[var(--accent-color)] before:origin-left after:absolute after:h-full after:bg-white/20`}
        style={progressStyles}
        min={0}
        max={duration}
        value={currentProgress}
        {...rest}
      />
    </div>
  );
};
