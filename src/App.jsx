import { useEffect, useState } from "react";
import "./App.css";

const POMODORO_TIME = 25 * 60;

function App() {
  const [timeLeft, setTimeLeft] = useState(POMODORO_TIME);
  const [isRunning, setIsRunning] = useState(false);

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

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    return `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds
    ).padStart(2, "0")}`;
  };

  const handleStartPause = () => {
    setIsRunning((prev) => !prev);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(POMODORO_TIME);
  };

  return (
    <main className="app">
      <section className="timer-card">
        <p className="eyebrow">Pomodoro Timer</p>

        <h1>Focus Session</h1>

        <div className="timer-display">{formatTime(timeLeft)}</div>

        <div className="button-group">
          <button onClick={handleStartPause} className="primary-button">
            {isRunning ? "Pause" : timeLeft === POMODORO_TIME ? "Start" : "Resume"}
          </button>

          <button onClick={handleReset} className="secondary-button">
            Reset
          </button>
        </div>
      </section>
    </main>
  );
}

export default App;