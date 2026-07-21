function SessionHistory({ sessionHistory }) {
  return (
    <div className="session-history">
      <h3 className="history-title">Recent Sessions</h3>

      {sessionHistory.length === 0 ? (
        <p className="history-empty">
          No completed sessions yet.
        </p>
      ) : (
        <div className="history-list">
          {sessionHistory.map((session) => (
            <div
              key={session.id}
              className="history-item"
            >
              <div className="history-left">
                <span className="history-icon">
                  {session.type === "Work"
                    ? "🍅"
                    : "☕"}
                </span>

                <div>
                  <strong>{session.type}</strong>
                  <p>{session.completedAt}</p>
                </div>
              </div>

              <span className="history-time">
    ✓
</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SessionHistory;