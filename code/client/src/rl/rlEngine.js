const difficulties = ["easy", "medium", "hard"];
const results = ["correct", "wrong"];
const timeCategories = ["fast", "moderate", "slow"];

// Generate all possible states
const states = [];
difficulties.forEach((d) => {
  results.forEach((r) => {
    timeCategories.forEach((t) => {
      states.push(`${d}-${r}-${t}`);
    });
  });
});

// Actions are same as difficulties
const actions = difficulties;

// Q-table initialization
const qTable = {};
states.forEach((state) => {
  qTable[state] = { easy: 0, medium: 0, hard: 0 };
});

// Hyperparameters
const alpha = 0.7;
const gamma = 0.8;
const epsilon = 0.2;

// Get time category
function getTimeCategory(timeTaken) {
  if (timeTaken <= 15) return "fast";
  if (timeTaken <= 30) return "moderate";
  return "slow";
}

// Get reward
function getReward(difficulty, correct, timeTaken) {
  const baseReward = correct ? 10 : -5;
  const bonus = { easy: 0, medium: 5, hard: 10 };
  const timeBonus = correct && timeTaken <= 30 ? 5 : 0;
  const timePenalty = timeTaken > 30 ? 5 : 0;

  return (
    baseReward + (correct ? bonus[difficulty] : 0) + timeBonus - timePenalty
  );
}

// Choose next action
function chooseAction(state) {
  const [prevDifficulty, result, timeCat] = state.split("-");

  // Rule-based escalation/de-escalation
  if (result === "correct" && ["fast", "moderate"].includes(timeCat)) {
    if (prevDifficulty === "easy") return "medium";
    if (prevDifficulty === "medium") return "hard";
    return "hard";
  }

  if (result === "wrong") {
    if (prevDifficulty === "hard") return "medium";
    if (prevDifficulty === "medium") return "easy";
    return "easy";
  }

  // ε-greedy exploration
  if (Math.random() < epsilon) {
    return actions[Math.floor(Math.random() * actions.length)];
  }

  const stateActions = qTable[state];
  return Object.entries(stateActions).reduce(
    (best, [action, val]) => (val > best[1] ? [action, val] : best),
    ["", -Infinity]
  )[0];
}

// Update Q-table
function updateQTable(prevState, action, reward, nextState) {
  const maxFutureQ = Math.max(...Object.values(qTable[nextState]));
  const currentQ = qTable[prevState][action];
  qTable[prevState][action] =
    currentQ + alpha * (reward + gamma * maxFutureQ - currentQ);
}

// Exported runner
export function getNextDifficulty({ prevDifficulty, wasCorrect, timeTaken }) {
  const timeCat = getTimeCategory(timeTaken);
  const prevResult = wasCorrect ? "correct" : "wrong";
  const prevState = `${prevDifficulty}-${prevResult}-${timeCat}`;

  const nextDifficulty = chooseAction(prevState);
  const reward = getReward(nextDifficulty, wasCorrect, timeTaken);
  const nextState = `${nextDifficulty}-${
    wasCorrect ? "correct" : "wrong"
  }-${getTimeCategory(timeTaken)}`;

  updateQTable(prevState, nextDifficulty, reward, nextState);

  return {
    currentState: prevState,
    nextDifficulty,
    reward,
    nextState,
  };
}
