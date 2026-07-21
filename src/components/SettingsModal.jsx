function SettingsModal({
  workMinutes,
  shortBreakMinutes,
  longBreakMinutes,
  setWorkMinutes,
  setShortBreakMinutes,
  setLongBreakMinutes,
  handleSaveSettings,
  closeSettings,
  soundEnabled,
setSoundEnabled,
}) {
  return (
    <div className="modal-overlay">
      <div className="settings-modal">
        <div className="modal-header">
          <h2>Settings</h2>

          <button
            className="close-button"
            onClick={closeSettings}
          >
            ×
          </button>
        </div>

        <div className="settings-form">

          <label>
            Work Session

            <input
              type="number"
              min="1"
              max="120"
              value={workMinutes}
              onChange={(e) =>
                setWorkMinutes(
                  Math.min(
                    120,
                    Math.max(1, Number(e.target.value))
                  )
                )
              }
            />
          </label>

          <label>
            Short Break

            <input
              type="number"
              min="1"
              max="60"
              value={shortBreakMinutes}
              onChange={(e) =>
                setShortBreakMinutes(
                  Math.min(
                    60,
                    Math.max(1, Number(e.target.value))
                  )
                )
              }
            />
          </label>

          <label>
            Long Break

            <input
              type="number"
              min="1"
              max="120"
              value={longBreakMinutes}
              onChange={(e) =>
                setLongBreakMinutes(
                  Math.min(
                    120,
                    Math.max(1, Number(e.target.value))
                  )
                )
              }
            />
          </label>

          <div className="setting-row">
  <span>Enable Sound</span>

  <button
    className={`toggle-button ${
      soundEnabled ? "active" : ""
    }`}
    onClick={() =>
      setSoundEnabled(!soundEnabled)
    }
  >
    {soundEnabled ? "ON" : "OFF"}
  </button>
</div>

          <button
            className="primary-button"
            onClick={handleSaveSettings}
          >
            Save
          </button>

        </div>
      </div>
    </div>
  );
}

export default SettingsModal;