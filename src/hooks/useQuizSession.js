import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  createAnswerRecord,
  createQuestions,
  getQuestionTime,
  shuffle,
} from '../quiz/quizSession.js';

export function useQuizSession({
  data,
  setPlayerData,
  gameConfig,
  setGameResults,
  setScreen,
  triggerAchievement,
  playAudio,
}) {
  const [questions] = useState(() => createQuestions(gameConfig, data.revisao));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lives, setLives] = useState(3);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(() => getQuestionTime(gameConfig.mode, 0, 3));
  const [isPaused, setIsPaused] = useState(false);
  const [powers, setPowers] = useState({ p5050: false, pTime: false, pSkip: false });
  const [hiddenOptions, setHiddenOptions] = useState([]);
  const [feedback, setFeedback] = useState(null);
  const [isShaking, setIsShaking] = useState(false);
  const [streak, setStreak] = useState(0);
  const [answers, setAnswers] = useState([]);

  const timerRef = useRef(null);
  const feedbackTimeoutRef = useRef(null);
  const shakeTimeoutRef = useRef(null);
  const finishingRef = useRef(false);

  const currentQuestion = questions[currentIndex] || null;

  const currentOptions = useMemo(() => {
    if (!currentQuestion) return [];
    return shuffle(currentQuestion.o);
  }, [currentQuestion]);

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const finishSession = useCallback((resultLives = lives) => {
    if (finishingRef.current) return;
    finishingRef.current = true;
    clearTimer();
    setGameResults({
      score,
      vidas: resultLives,
      questions,
      answers,
      maxScore: questions.length * 10,
    });
    setScreen('end');
  }, [answers, clearTimer, lives, questions, score, setGameResults, setScreen]);

  const handleAnswer = useCallback((option) => {
    if (!currentQuestion || feedback || finishingRef.current) return;

    clearTimer();
    const isCorrect = option === currentQuestion.c;

    setFeedback({ show: false, isOk: isCorrect, opt: option, q: currentQuestion });
    setAnswers((current) => [
      ...current,
      createAnswerRecord(currentQuestion, option, { timedOut: option === null }),
    ]);

    if (isCorrect) {
      playAudio('snd-acerto');

      if (gameConfig.mode === 'avaliacao') {
        const nextStreak = streak + 1;
        setScore((current) => current + 10);
        setStreak(nextStreak);
        if (nextStreak === 5) triggerAchievement('hacker');

        setPlayerData((player) => ({
          ...player,
          stats: { ...player.stats, acertos: player.stats.acertos + 1 },
          revisao: player.revisao.filter((item) => item.q !== currentQuestion.q),
        }));
      } else if (gameConfig.cat === 'revisao') {
        setPlayerData((player) => ({
          ...player,
          revisao: player.revisao.filter((item) => item.q !== currentQuestion.q),
        }));
      }
    } else {
      playAudio('snd-erro');
      setIsShaking(true);
      shakeTimeoutRef.current = window.setTimeout(() => setIsShaking(false), 400);

      if (gameConfig.mode === 'avaliacao') {
        setLives((current) => Math.max(0, current - 1));
        setStreak(0);
        setPlayerData((player) => {
          const review = player.revisao.some((item) => item.q === currentQuestion.q)
            ? player.revisao
            : [...player.revisao, currentQuestion];

          return {
            ...player,
            stats: { ...player.stats, erros: player.stats.erros + 1 },
            revisao: review,
          };
        });
      }
    }

    feedbackTimeoutRef.current = window.setTimeout(() => {
      setFeedback((current) => current ? { ...current, show: true } : null);
    }, 800);
  }, [clearTimer, currentQuestion, feedback, gameConfig.cat, gameConfig.mode, playAudio, setPlayerData, streak, triggerAchievement]);

  const nextQuestion = useCallback(() => {
    if (finishingRef.current) return;

    setFeedback(null);
    const isLastQuestion = currentIndex + 1 >= questions.length;
    const outOfLives = lives <= 0 && gameConfig.mode === 'avaliacao';

    if (isLastQuestion || outOfLives) {
      finishSession();
      return;
    }

    setCurrentIndex((current) => current + 1);
  }, [currentIndex, finishSession, gameConfig.mode, lives, questions.length]);

  const useFiftyFifty = useCallback(() => {
    if (!currentQuestion || powers.p5050 || isPaused || feedback) return;
    const wrongOptions = shuffle(currentOptions.filter((option) => option !== currentQuestion.c));
    setPowers((current) => ({ ...current, p5050: true }));
    setHiddenOptions(wrongOptions.slice(0, 2));
    playAudio('snd-acao');
  }, [currentOptions, currentQuestion, feedback, isPaused, playAudio, powers.p5050]);

  const useExtraTime = useCallback(() => {
    if (powers.pTime || isPaused || feedback) return;
    setPowers((current) => ({ ...current, pTime: true }));
    setTimeLeft((current) => current + 10);
    playAudio('snd-acao');
  }, [feedback, isPaused, playAudio, powers.pTime]);

  const skipQuestion = useCallback(() => {
    if (!currentQuestion || powers.pSkip || isPaused || feedback || finishingRef.current) return;

    setPowers((current) => ({ ...current, pSkip: true }));
    setAnswers((current) => [
      ...current,
      createAnswerRecord(currentQuestion, null, { skipped: true }),
    ]);
    playAudio('snd-acao');

    const isLastQuestion = currentIndex + 1 >= questions.length;
    if (isLastQuestion) {
      // O estado de answers ainda não foi renderizado; inclui manualmente o salto no resultado.
      if (!finishingRef.current) {
        finishingRef.current = true;
        clearTimer();
        setGameResults({
          score,
          vidas: lives,
          questions,
          answers: [
            ...answers,
            createAnswerRecord(currentQuestion, null, { skipped: true }),
          ],
          maxScore: questions.length * 10,
        });
        setScreen('end');
      }
      return;
    }

    setFeedback(null);
    setCurrentIndex((current) => current + 1);
  }, [answers, clearTimer, currentIndex, currentQuestion, feedback, isPaused, lives, playAudio, powers.pSkip, questions, score, setGameResults, setScreen]);

  const pause = useCallback(() => setIsPaused(true), []);
  const resume = useCallback(() => setIsPaused(false), []);

  useEffect(() => {
    if (
      gameConfig.mode === 'treino'
      || isPaused
      || feedback
      || !currentQuestion
      || finishingRef.current
    ) {
      clearTimer();
      return undefined;
    }

    timerRef.current = window.setInterval(() => {
      setTimeLeft((current) => Math.max(0, current - 1));
    }, 1000);

    return clearTimer;
  }, [clearTimer, currentQuestion, feedback, gameConfig.mode, isPaused]);

  useEffect(() => {
    if (
      timeLeft === 0
      && !feedback
      && gameConfig.mode !== 'treino'
      && currentQuestion
      && !finishingRef.current
    ) {
      handleAnswer(null);
    }
  }, [currentQuestion, feedback, gameConfig.mode, handleAnswer, timeLeft]);

  useEffect(() => {
    if (gameConfig.mode === 'treino') return;
    setTimeLeft(getQuestionTime(gameConfig.mode, streak, lives));
    setHiddenOptions([]);
  }, [currentIndex, gameConfig.mode, lives, streak]);

  useEffect(() => () => {
    clearTimer();
    if (feedbackTimeoutRef.current) window.clearTimeout(feedbackTimeoutRef.current);
    if (shakeTimeoutRef.current) window.clearTimeout(shakeTimeoutRef.current);
  }, [clearTimer]);

  return {
    questions,
    currentQuestion,
    currentOptions,
    currentIndex,
    lives,
    score,
    timeLeft,
    isPaused,
    powers,
    hiddenOptions,
    feedback,
    isShaking,
    streak,
    answers,
    handleAnswer,
    nextQuestion,
    useFiftyFifty,
    useExtraTime,
    skipQuestion,
    pause,
    resume,
  };
}
