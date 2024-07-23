// convert minutes to hours, minutes, and seconds
export const secondsToTimestamp = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  return `${hours}:${minutes}:${remainingSeconds}`;
};
