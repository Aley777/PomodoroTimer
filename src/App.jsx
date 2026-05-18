import { useEffect, useState } from "react";
import "./App.css";

const TIMER_MODES = {
  work: {
    label: "Work",
    title: "Focus Session",
    minutes: 25,
  },
  shortBreak: {
    label: "Short Break",
    title: "Quick Break",
    minutes: 5,
  },
  longBreak: {
    label: "Long Break",
    title: "Deep Rest",
    minutes: 15,
  },
};

function App() {
  const [activeMode, setActiveMode] = useState("work");
  const [timeLeft, setTimeLeft] = useState(TIMER_MODES.work.minutes * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [completedSessions, setCompletedSessions] = useState(0);

  const currentMode = TIMER_MODES[activeMode];

  useEffect(() => {
    if (!isRunning) return;

    const intervalId = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          setIsRunning(false);

          if (activeMode === "work") {
            setCompletedSessions((prevSessions) => prevSessions + 1);
          }

          return 0;
        }

        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [isRunning, activeMode]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    return `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds
    ).padStart(2, "0")}`;
  };

  const handleModeChange = (mode) => {
    setActiveMode(mode);
    setIsRunning(false);
    setTimeLeft(TIMER_MODES[mode].minutes * 60);
  };

  const handleStartPause = () => {
    if (timeLeft === 0) {
      setTimeLeft(currentMode.minutes * 60);
    }

    setIsRunning((prev) => !prev);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(currentMode.minutes * 60);
  };

  const handleResetSessions = () => {
    setCompletedSessions(0);
  };

  return (
    <main className="app">
      <section className="timer-card">
        <p className="eyebrow">Pomodoro Timer</p>

        <div className="mode-tabs">
          {Object.entries(TIMER_MODES).map(([mode, data]) => (
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

        <div className="timer-display">{formatTime(timeLeft)}</div>

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

        <div className="session-panel">
          <div>
            <span className="session-label">Completed Sessions</span>
            <strong>{completedSessions}</strong>
          </div>

          <button onClick={handleResetSessions} className="ghost-button">
            Clear
          </button>
        </div>
      </section>
    </main>
  );
}

export default App;