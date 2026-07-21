import { useEffect, useRef, useState } from "react";
import "./App.css";
import DEFAULT_TIMER_MODES from "./constants/timerModes";
import {
  formatTime,
  calculateProgress,
  calculateGoalProgress,
} from "./utils/timerUtils";
import useAlarm from "./hooks/useAlarm";
import useTimer from "./hooks/useTimer";
import TimerRing from "./components/TimerRing";
import MiniStats from "./components/MiniStats";
import StatsPanel from "./components/StatsPanel";
import SettingsModal from "./components/SettingsModal";
import SessionHistory from "./components/SessionHistory";

function App() {
  const [timerModes, setTimerModes] = useState(() => {
  const saved = localStorage.getItem("timerModes");

  return saved
    ? JSON.parse(saved)
    : DEFAULT_TIMER_MODES;
});

  const {
  activeMode,
  setActiveMode,
  timeLeft,
  setTimeLeft,
  isRunning,
  setIsRunning,
} = useTimer(timerModes);

  const [completedSessions, setCompletedSessions] = useState(() => {
    const savedSessions = localStorage.getItem("completedSessions");
      return savedSessions ? Number(savedSessions) : 0;
      });

  const [sessionHistory, setSessionHistory] = useState(() => {
  const saved = localStorage.getItem("sessionHistory");
  return saved ? JSON.parse(saved) : [];
});

  const [dailyGoal, setDailyGoal] = useState(() => {
    const savedGoal = localStorage.getItem("dailyGoal");
      return savedGoal ? Number(savedGoal) : 4;
    });

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const [workMinutes, setWorkMinutes] = useState(timerModes.work.minutes);

const [shortBreakMinutes, setShortBreakMinutes] = useState(
  timerModes.shortBreak.minutes
);

const [longBreakMinutes, setLongBreakMinutes] = useState(
  timerModes.longBreak.minutes
);

  const [statusMessage, setStatusMessage] = useState(
    "Ready to start your focus session."
    );

  const sessionCountedRef = useRef(false);

const [soundEnabled, setSoundEnabled] = useState(() => {
  const saved = localStorage.getItem("soundEnabled");
  return saved ? JSON.parse(saved) : true;
});

const {
  playWorkAlarm,
  playBreakAlarm,
} = useAlarm(soundEnabled);

  const currentMode = timerModes[activeMode];
  const totalTime = currentMode.minutes * 60;
const progressPercentage = calculateProgress(
  timeLeft,
  totalTime
);

  const goalProgress = calculateGoalProgress(
  completedSessions,
  dailyGoal
);

  useEffect(() => {
    if (!isRunning) return;

    const intervalId = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          setIsRunning(false);
          return 0;
        }

        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [isRunning]);

  useEffect(() => {
    localStorage.setItem("completedSessions", completedSessions);
  }, [completedSessions]);

  useEffect(() => {
    localStorage.setItem("dailyGoal", dailyGoal);
  }, [dailyGoal]);

  useEffect(() => {
  localStorage.setItem(
    "timerModes",
    JSON.stringify(timerModes)
  );
}, [timerModes]);

useEffect(() => {
  localStorage.setItem(
    "sessionHistory",
    JSON.stringify(sessionHistory)
  );
}, [sessionHistory]);

useEffect(() => {
  localStorage.setItem(
    "soundEnabled",
    JSON.stringify(soundEnabled)
  );
}, [soundEnabled]);

  useEffect(() => {
    if (timeLeft !== 0 || sessionCountedRef.current) return;
    if (activeMode === "work") {
  playWorkAlarm();
} else {
  playBreakAlarm();
}

addSessionHistory(currentMode.label);

    sessionCountedRef.current = true;

    if (activeMode === "work") {
      setCompletedSessions((prevSessions) => {
        const nextSessions = prevSessions + 1;
        const nextMode = nextSessions % 4 === 0 ? "longBreak" : "shortBreak";

        setActiveMode(nextMode);
setTimeLeft(timerModes[nextMode].minutes * 60);
        setStatusMessage(
          nextMode === "longBreak"
            ? "Great job! Take a longer break."
            : "Nice work! Time for a short break."
        );

        sessionCountedRef.current = false;

        return nextSessions;
      });

      return;
    }

    setActiveMode("work");
setTimeLeft(timerModes.work.minutes * 60);
    setStatusMessage("Break finished. Ready for another focus session.");

    sessionCountedRef.current = false;

  }, [
  timeLeft,
  activeMode,
  currentMode,
  timerModes,
  playWorkAlarm,
  playBreakAlarm,
]);

  const handleModeChange = (mode) => {
    setActiveMode(mode);
    setIsRunning(false);
setTimeLeft(timerModes[mode].minutes * 60);
setStatusMessage(`${timerModes[mode].label} mode selected.`);
    sessionCountedRef.current = false;
  };

  const handleStartPause = () => {
    if (timeLeft === 0) {
      setTimeLeft(currentMode.minutes * 60);
      sessionCountedRef.current = false;
    }

    setIsRunning((prev) => !prev);
    setStatusMessage(isRunning ? "Timer paused." : "Timer is running.");
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(currentMode.minutes * 60);
    setStatusMessage("Timer reset.");
    sessionCountedRef.current = false;
  };

  const handleSaveSettings = () => {
  setTimerModes({
    work: {
      ...timerModes.work,
      minutes: workMinutes,
    },
    shortBreak: {
      ...timerModes.shortBreak,
      minutes: shortBreakMinutes,
    },
    longBreak: {
      ...timerModes.longBreak,
      minutes: longBreakMinutes,
    },
  });

  // Eğer timer çalışmıyorsa yeni sürenin hemen uygulanmasını sağla
  if (!isRunning) {
    setTimeLeft(
      activeMode === "work"
        ? workMinutes * 60
        : activeMode === "shortBreak"
        ? shortBreakMinutes * 60
        : longBreakMinutes * 60
    );
  }

  setStatusMessage("Settings saved successfully.");
  closeSettings();
};

  const handleResetSessions = () => {
    setCompletedSessions(0);
    localStorage.removeItem("completedSessions");
    setStatusMessage("Completed sessions cleared.");
  };

  const addSessionHistory = (type) => {
  const newSession = {
    id: Date.now(),
    type,
    completedAt: new Date().toLocaleString([], {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
}),
  };

  setSessionHistory((prev) => [
    newSession,
    ...prev.slice(0, 9),
  ]);
};

  const openSettings = () => {
  setWorkMinutes(timerModes.work.minutes);
  setShortBreakMinutes(timerModes.shortBreak.minutes);
  setLongBreakMinutes(timerModes.longBreak.minutes);

  setIsSettingsOpen(true);
};

const closeSettings = () => {
  setIsSettingsOpen(false);
};

  const increaseGoal = () => {
    setDailyGoal((prev) => prev + 1);
  };

  const decreaseGoal = () => {
    if (dailyGoal <= 1) return;

    setDailyGoal((prev) => prev - 1);
  };

  return (
    <main className="app">
      <section className="timer-card">
        <p className="eyebrow">Pomodoro Timer</p>

        <div className="header-actions">
  <button
    className="settings-button"
    onClick={openSettings}
  >
    ⚙ Settings
  </button>
</div>

        <div className="mode-tabs">
          {Object.entries(timerModes).map(([mode, data]) => (
            <button
              key={mode}
              onClick={() => handleModeChange(mode)}
              className={`mode-tab ${activeMode === mode ? "active" : ""}`}
            >
              {data.label}
            </button>
          ))}
        </div>

        <h1>{currentMode.title}</h1>
        <p className="status-message">{statusMessage}</p>

        <TimerRing
  time={formatTime(timeLeft)}
  mode={currentMode.label}
  progressPercentage={progressPercentage}
/>

        <div className="button-group">
  <button onClick={handleStartPause} className="primary-button">
    {isRunning
      ? "Pause"
      : timeLeft === currentMode.minutes * 60
      ? "Start"
      : "Resume"}
  </button>

  <button onClick={handleReset} className="secondary-button">
    Reset
  </button>
</div>

<MiniStats
  currentMode={currentMode.label}
  progressPercentage={progressPercentage}
  dailyGoal={dailyGoal}
/>

        <StatsPanel
  completedSessions={completedSessions}
  dailyGoal={dailyGoal}
  goalProgress={goalProgress}
  increaseGoal={increaseGoal}
  decreaseGoal={decreaseGoal}
  handleResetSessions={handleResetSessions}
/>

<SessionHistory
    sessionHistory={sessionHistory}
/>

{isSettingsOpen && (
  <SettingsModal
    workMinutes={workMinutes}
    shortBreakMinutes={shortBreakMinutes}
    longBreakMinutes={longBreakMinutes}
    setWorkMinutes={setWorkMinutes}
    setShortBreakMinutes={setShortBreakMinutes}
    setLongBreakMinutes={setLongBreakMinutes}
    handleSaveSettings={handleSaveSettings}
    closeSettings={closeSettings}
    soundEnabled={soundEnabled}
setSoundEnabled={setSoundEnabled}
  />
)}

      </section>
    </main>
  );
}

export default App;