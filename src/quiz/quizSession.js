import { QUESTION_BANK } from '../data/questions.js';

export const QUESTION_LIMIT = 5;
export const DEFAULT_TIME = 20;
export const STREAK_TIME = 15;
export const LAST_LIFE_TIME = 25;

export function shuffle(list, random = Math.random) {
  const copy = [...list];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(random() * (index + 1));
    [copy[index], copy[randomIndex]] = [copy[randomIndex], copy[index]];
  }
  return copy;
}

export function createQuestions(gameConfig, reviewQuestions = [], questionBank = QUESTION_BANK, random = Math.random) {
  const source = gameConfig.cat === 'revisao'
    ? reviewQuestions
    : questionBank[gameConfig.cat] || [];

  return shuffle(source, random).slice(0, QUESTION_LIMIT);
}

export function getQuestionTime(mode, streak, lives) {
  if (mode === 'treino') return DEFAULT_TIME;
  if (streak >= 3) return STREAK_TIME;
  if (lives === 1) return LAST_LIFE_TIME;
  return DEFAULT_TIME;
}

export function createAnswerRecord(question, selectedAnswer, options = {}) {
  const { timedOut = false, skipped = false } = options;
  return {
    question: question.q,
    selectedAnswer,
    correctAnswer: question.c,
    isCorrect: selectedAnswer === question.c && !timedOut && !skipped,
    timedOut: Boolean(timedOut),
    skipped: Boolean(skipped),
  };
}
