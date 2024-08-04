import * as React from "react";
import type { GetBookChapterPayload } from "~/pages/api/books";
import { AudioProgressBar, MoveChapterButton, PlayPauseButton } from "~/partials/audio";

function formatDurationDisplay(duration: number) {
  const min = Math.floor(duration / 60);
  const sec = Math.floor(duration - min * 60);

  const formatted = [min, sec].map((n) => (n < 10 ? "0" + n : n)).join(":");

  return formatted;
}

interface AudioPlayerProps {
  color: string;
  currentChapter: GetBookChapterPayload["chapter"];
  chapterNumber: number;
  nextChapterDisabled: boolean;
  prevChapterDisabled: boolean;
  onNext: () => void;
  onPrev: () => void;
}

export const AudioPlayer = ({
  color,
  currentChapter,
  chapterNumber,
  nextChapterDisabled,
  prevChapterDisabled,
  onNext,
  onPrev,
}: AudioPlayerProps) => {
  const audioRef = React.useRef<HTMLAudioElement | null>(null);

  const [isReady, setIsReady] = React.useState(false);
  const [duration, setDuration] = React.useState(0);
  const [currentProgress, setCurrentProgress] = React.useState(0);
  const [buffered, setBuffered] = React.useState(0);
  const [isPlaying, setIsPlaying] = React.useState(false);

  const durationDisplay = formatDurationDisplay(duration);
  const elapsedDisplay = formatDurationDisplay(currentProgress);

  React.useEffect(() => {
    audioRef.current?.pause();
    setIsPlaying(false);
    setBuffered(0);
    setCurrentProgress(0);
  }, [chapterNumber]);

  const handleNext = () => {
    onNext();
  };

  const handlePrev = () => {
    onPrev();
  };

  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current?.pause();
      setIsPlaying(false);
    } else {
      audioRef.current?.play();
      setIsPlaying(true);
    }
  };

  const handleBufferProgress: React.ReactEventHandler<HTMLAudioElement> = (e) => {
    const audio = e.currentTarget;
    const dur = audio.duration;
    if (dur > 0) {
      for (let i = 0; i < audio.buffered.length; i++) {
        if (audio.buffered.start(audio.buffered.length - 1 - i) < audio.currentTime) {
          const bufferedLength = audio.buffered.end(audio.buffered.length - 1 - i);
          setBuffered(bufferedLength);
          break;
        }
      }
    }
  };

  React.useEffect(() => {
    if (!audioRef.current) return;

    audioRef.current.src = currentChapter.audio;
    audioRef.current.load();
  }, [currentChapter]);

  return (
    <div className="relative flex flex-col gap-4 md:gap-8">
      <audio
        ref={audioRef}
        preload="metadata"
        onDurationChange={(e) => setDuration(e.currentTarget.duration)}
        onPlaying={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={handleNext}
        onCanPlay={(e) => {
          setIsReady(true);
        }}
        onTimeUpdate={(e) => {
          setCurrentProgress(e.currentTarget.currentTime);
          handleBufferProgress(e);
        }}
        onProgress={handleBufferProgress}
      >
        <source type="audio/mpeg" src={currentChapter.audio} />
      </audio>

      <div className="relative flex items-center gap-4 justify-between">
        <span className="text-secondary text-sm w-10">{elapsedDisplay}</span>
        <div className="relative w-full -top-0.5">
          <AudioProgressBar
            color={color}
            duration={duration}
            currentProgress={currentProgress}
            ambientSections={currentChapter.ambientSections}
            buffered={buffered}
            onChange={(e) => {
              if (!audioRef.current) return;
              audioRef.current.currentTime = e.currentTarget.valueAsNumber;
              setCurrentProgress(e.currentTarget.valueAsNumber);
            }}
          />
        </div>
        <span className="text-secondary text-sm">{durationDisplay}</span>
      </div>

      <div className="w-full grid grid-cols-2 items-center">
        <span className="text-sm md:text-base text-secondary w-[75%] truncate">{currentChapter.name}</span>
        <div className="flex items-center justify-end w-full md:w-auto gap-4 md:gap-8">
          <MoveChapterButton direction="prev" onClick={handlePrev} disabled={prevChapterDisabled} />
          <PlayPauseButton
            color={color}
            disabled={!isReady}
            onClick={togglePlayPause}
            state={isPlaying ? "playing" : isReady ? "paused" : "loading"}
          />
          <MoveChapterButton direction="next" onClick={handleNext} disabled={nextChapterDisabled} />
        </div>
      </div>
    </div>
  );
};
