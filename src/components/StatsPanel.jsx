function StatsPanel({
  completedSessions,
  dailyGoal,
  goalProgress,
  increaseGoal,
  decreaseGoal,
  handleResetSessions,
}) {
  return (
    <div className="stats-container">
      <div className="goal-panel">
        <div className="goal-top">
          <div>
            <p className="card-label">Daily Goal</p>

            <h3>
              {completedSessions} / {dailyGoal}
              <span> Sessions</span>
            </h3>
          </div>

          <div className="goal-actions">
            <button
              onClick={decreaseGoal}
              className="goal-button"
            >
              −
            </button>

            <button
              onClick={increaseGoal}
              className="goal-button"
            >
              +
            </button>
          </div>
        </div>

        <div className="goal-progress-bar">
          <div
            className="goal-progress-fill"
            style={{ width: `${goalProgress}%` }}
          />
        </div>

        <p className="goal-helper-text">
          {completedSessions >= dailyGoal
            ? "Daily goal completed 🎉"
            : `Complete ${
                dailyGoal - completedSessions
              } more session(s) to reach your goal.`}
        </p>
      </div>

      <div className="session-panel">
        <div>
          <p className="card-label">
            Completed Sessions
          </p>

          <h2>{completedSessions}</h2>
        </div>

        <button
          onClick={handleResetSessions}
          className="ghost-button"
        >
          Clear
        </button>
      </div>
    </div>
  );
}

export default StatsPanel;