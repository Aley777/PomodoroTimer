import { useEffect, useRef, useState } from "react";
import "./App.css";

const TIMER_MODES = {
  work: {
    label: "Work",
    title: "Focus Session",
    minutes: 0.1,
  },
  shortBreak: {
    label: "Short Break",
    title: "Quick Break",
    minutes: 0.05,
  },
  longBreak: {
    label: "Long Break",
    title: "Deep Rest",
    minutes: 0.05,
  },
};

function App() {
  const [activeMode, setActiveMode] = useState("work");
  const [timeLeft, setTimeLeft] = useState(TIMER_MODES.work.minutes * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [completedSessions, setCompletedSessions] = useState(0);
  const [statusMessage, setStatusMessage] = useState(
    "Ready to start your focus session."
  );

  const sessionCountedRef = useRef(false);

  const currentMode = TIMER_MODES[activeMode];
  const totalTime = currentMode.minutes * 60;
  const progressPercentage = ((totalTime - timeLeft) / totalTime) * 100;

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
    if (timeLeft !== 0 || sessionCountedRef.current) return;

    sessionCountedRef.current = true;

    if (activeMode === "work") {
      setCompletedSessions((prevSessions) => {
        const nextSessions = prevSessions + 1;
        const nextMode = nextSessions % 4 === 0 ? "longBreak" : "shortBreak";

        setActiveMode(nextMode);
        setTimeLeft(TIMER_MODES[nextMode].minutes * 60);
        setStatusMessage(
          nextMode === "longBreak"
            ? "Great job! Take a longer break."
            : "Nice work! Time for a short break."
        );

        return nextSessions;
      });

      return;
    }

    setActiveMode("work");
    setTimeLeft(TIMER_MODES.work.minutes * 60);
    setStatusMessage("Break finished. Ready for another focus session.");
  }, [timeLeft, activeMode]);

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
    setStatusMessage(`${TIMER_MODES[mode].label} mode selected.`);
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

  const handleResetSessions = () => {
    setCompletedSessions(0);
    setStatusMessage("Completed sessions cleared.");
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
        <p className="status-message">{statusMessage}</p>

        <div className="timer-display">{formatTime(timeLeft)}</div>

        <div className="progress-wrapper">
          <div className="progress-info">
            <span>Progress</span>
            <span>{Math.round(progressPercentage)}%</span>
          </div>

          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>

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