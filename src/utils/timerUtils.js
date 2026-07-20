export const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  return `${String(minutes).padStart(2, "0")}:${String(
    remainingSeconds
  ).padStart(2, "0")}`;
};

export const calculateProgress = (timeLeft, totalTime) => {
  return ((totalTime - timeLeft) / totalTime) * 100;
};

export const calculateGoalProgress = (
  completedSessions,
  dailyGoal
) => {
  return Math.min(
    (completedSessions / dailyGoal) * 100,
    100
  );
};