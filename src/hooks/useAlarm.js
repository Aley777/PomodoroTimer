import { useRef } from "react";

import workCompleteSound from "../assets/work-complete.wav";
import breakCompleteSound from "../assets/break-complete.wav";

export default function useAlarm() {
  const workAlarmRef = useRef(new Audio(workCompleteSound));
  const breakAlarmRef = useRef(new Audio(breakCompleteSound));

  const playWorkAlarm = () => {
    workAlarmRef.current.currentTime = 0;
    workAlarmRef.current.play().catch(() => {});
  };

  const playBreakAlarm = () => {
    breakAlarmRef.current.currentTime = 0;
    breakAlarmRef.current.play().catch(() => {});
  };

  return {
    playWorkAlarm,
    playBreakAlarm,
  };
}