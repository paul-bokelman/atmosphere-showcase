import type { Chapter } from "~/types";
import * as React from "react";
import { AudioProgressBar, MoveChapterButton, PlayPauseButton } from "~/partials/audio";

function formatDurationDisplay(duration: number) {
  const min = Math.floor(duration / 60);
  const sec = Math.floor(duration - min * 60);

  const formatted = [min, sec].map((n) => (n < 10 ? "0" + n : n)).join(":");

  return formatted;
}

interface AudioPlayerProps {
  color: string;
  currentChapter: Chapter;
  chapterIndex: number;
  totalChapters: number;
  onNext: () => void;
  onPrev: () => void;
}

export const AudioPlayer = ({
  color,
  currentChapter,
  chapterIndex,
  totalChapters,
  onNext,
  onPrev,
}: AudioPlayerProps) => {
  const audioRef = React.useRef<HTMLAudioElement | null>(null);

  console.log("currentChapter", currentChapter);

  const [isReady, setIsReady] = React.useState(false);
  const [duration, setDuration] = React.useState(0);
  const [currentProgress, setCurrentProgress] = React.useState(0);
  const [buffered, setBuffered] = React.useState(0);
  const [isPlaying, setIsPlaying] = React.useState(false);

  const durationDisplay = formatDurationDisplay(duration);
  const elapsedDisplay = formatDurationDisplay(currentProgress);

  React.useEffect(() => {
    audioRef.current?.pause();

    const timeout = setTimeout(() => {
      audioRef.current?.play();
    }, 500);

    return () => {
      clearTimeout(timeout);
    };
  }, [chapterIndex]);

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
    <div className="relative flex flex-col gap-8">
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

      <div className="w-full grid grid-cols-2 md:grid-cols-3 items-center">
        <span className="text-secondary">Chapter {chapterIndex + 1}</span>
        <div className="flex items-center gap-8 ml-auto md:mx-auto">
          <MoveChapterButton direction="prev" onClick={handlePrev} disabled={chapterIndex === 0} />
          <PlayPauseButton
            color={color}
            disabled={!isReady}
            onClick={togglePlayPause}
            state={isPlaying ? "playing" : isReady ? "paused" : "loading"}
          />
          <MoveChapterButton direction="next" onClick={handleNext} disabled={chapterIndex === totalChapters - 1} />
        </div>
      </div>
    </div>
  );
};
