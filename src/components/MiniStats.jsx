function MiniStats({
  currentMode,
  progressPercentage,
  dailyGoal,
}) {
  return (
    <div className="mini-stats">
      <div className="mini-stat-card">
        <span>Mode</span>
        <strong>{currentMode}</strong>
      </div>

      <div className="mini-stat-card">
        <span>Progress</span>
        <strong>{Math.round(progressPercentage)}%</strong>
      </div>

      <div className="mini-stat-card">
        <span>Goal</span>
        <strong>{dailyGoal}</strong>
      </div>
    </div>
  );
}

export default MiniStats;