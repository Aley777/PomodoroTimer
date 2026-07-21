import { useRef } from "react";

import workCompleteSound from "../assets/work-complete.wav";
import breakCompleteSound from "../assets/break-complete.wav";

export default function useAlarm(soundEnabled) {
  const workAlarmRef = useRef(new Audio(workCompleteSound));
  const breakAlarmRef = useRef(new Audio(breakCompleteSound));

  const playWorkAlarm = () => {
    if (!soundEnabled) return;

    workAlarmRef.current.currentTime = 0;
    workAlarmRef.current.play();
  };

  const playBreakAlarm = () => {
    if (!soundEnabled) return;

    breakAlarmRef.current.currentTime = 0;
    breakAlarmRef.current.play();
  };

  return {
    playWorkAlarm,
    playBreakAlarm,
  };
}