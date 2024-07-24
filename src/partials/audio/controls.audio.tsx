import React from "react";
import cn from "classnames";
import { PiSpinnerBold } from "react-icons/pi";
import { BsPauseFill } from "react-icons/bs";
import { HiMiniPlay } from "react-icons/hi2";

type MoveChapterButtonProps = React.ComponentPropsWithoutRef<"button"> & {
  direction: "next" | "prev";
};

export const MoveChapterButton: React.FC<MoveChapterButtonProps> = (props) => {
  const { direction, className, ...rest } = props;
  const ariaLabel = direction === "next" ? "go to next" : "go to previous";
  const classes = cn(
    "rounded-full flex items-center justify-center ring-offset-slate-900 focus:outline-none disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100 hover:scale-110 active:scale-95 transition-transform",
    { "rotate-180": direction === "prev" },
    className
  );

  return (
    <button aria-label={ariaLabel} {...rest} className={classes}>
      <HiMiniPlay color="#C4C4C4" size={22} />
    </button>
  );
};

type PlayPauseButtonProps = React.ComponentPropsWithoutRef<"button"> & {
  color: string;
  state: "playing" | "paused" | "loading";
};

export const PlayPauseButton: React.FC<PlayPauseButtonProps> = (props) => {
  const { color, state, className, ...rest } = props;
  const ariaLabel = state == "playing" ? "Pause" : "Play";
  const classes = cn(
    "h-12 w-12 rounded-full flex items-center justify-center hover:scale-110 active:scale-95 transition-transform",
    className
  );
  return (
    <button aria-label={ariaLabel} style={{ backgroundColor: color, ...props.style }} className={classes} {...rest}>
      {state === "loading" ? (
        <PiSpinnerBold size={24} className="animate-spin text-white/80" />
      ) : state === "playing" ? (
        <BsPauseFill color="white" size={30} />
      ) : (
        <HiMiniPlay className="relative left-[1px]" color="white" size={23} />
      )}
    </button>
  );
};
