import { useState } from "react";

export default function useTimer(timerModes) {
  const [activeMode, setActiveMode] = useState("work");

  const [timeLeft, setTimeLeft] = useState(
    timerModes.work.minutes * 60
  );

  const [isRunning, setIsRunning] = useState(false);

  return {
    activeMode,
    setActiveMode,

    timeLeft,
    setTimeLeft,

    isRunning,
    setIsRunning,
  };
}