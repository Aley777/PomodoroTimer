function TimerRing({
  time,
  mode,
  progressPercentage,
}) {
  return (
    <div className="timer-ring">
      <svg
        className="progress-ring"
        width="320"
        height="320"
      >
        <circle
          className="progress-ring-bg"
          strokeWidth="8"
          fill="transparent"
          r="140"
          cx="160"
          cy="160"
        />

        <circle
          className="progress-ring-fill"
          strokeWidth="8"
          fill="transparent"
          r="140"
          cx="160"
          cy="160"
          strokeDasharray={879.2}
          strokeDashoffset={
            879.2 -
            (progressPercentage / 100) * 879.2
          }
        />
      </svg>

      <div className="timer-content">
        <div className="timer-display">
          {time}
        </div>

        <span className="timer-mode-label">
          {mode}
        </span>
      </div>
    </div>
  );
}

export default TimerRing;