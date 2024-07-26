import type { ServerError } from "~/types";
import axios from "axios";

// convert minutes to hours, minutes, and seconds
export const secondsToTimestamp = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  return `${hours}:${minutes}:${remainingSeconds}`;
};

// handler server errors
export const handleQueryError = (error: unknown): { status: "error" } & ServerError => {
  if (axios.isAxiosError(error)) {
    return {
      status: "error",
      message: error.message,
    };
  } else {
    return {
      status: "error",
      message: "An unknown error occurred",
    };
  }
};
