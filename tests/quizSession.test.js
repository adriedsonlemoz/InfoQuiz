import test from 'node:test';
import assert from 'node:assert/strict';
import {
  createAnswerRecord,
  createQuestions,
  DEFAULT_TIME,
  getQuestionTime,
  LAST_LIFE_TIME,
  QUESTION_LIMIT,
  shuffle,
  STREAK_TIME,
} from '../src/quiz/quizSession.js';

test('shuffle preserva os itens sem mutar a lista original', () => {
  const source = [1, 2, 3, 4];
  const result = shuffle(source, () => 0);
  assert.deepEqual(source, [1, 2, 3, 4]);
  assert.deepEqual([...result].sort(), source);
  assert.notStrictEqual(result, source);
});

test('avaliação usa no máximo cinco perguntas', () => {
  const bank = { modulo: Array.from({ length: 9 }, (_, index) => ({ q: `Q${index}` })) };
  const result = createQuestions({ cat: 'modulo' }, [], bank, () => 0.5);
  assert.equal(result.length, QUESTION_LIMIT);
});

test('revisão usa a lista de erros em vez do banco normal', () => {
  const review = [{ q: 'Erro 1' }, { q: 'Erro 2' }];
  const result = createQuestions({ cat: 'revisao' }, review, { revisao: [{ q: 'ignorar' }] }, () => 0.5);
  assert.equal(result.length, 2);
  assert.deepEqual(new Set(result.map((item) => item.q)), new Set(['Erro 1', 'Erro 2']));
});

test('tempo respeita treino, streak e última vida', () => {
  assert.equal(getQuestionTime('treino', 10, 1), DEFAULT_TIME);
  assert.equal(getQuestionTime('avaliacao', 3, 3), STREAK_TIME);
  assert.equal(getQuestionTime('avaliacao', 0, 1), LAST_LIFE_TIME);
  assert.equal(getQuestionTime('avaliacao', 0, 3), DEFAULT_TIME);
});

test('registro de resposta diferencia acerto, timeout e pulo', () => {
  const question = { q: '2+2?', c: '4' };
  assert.equal(createAnswerRecord(question, '4').isCorrect, true);
  const timeout = createAnswerRecord(question, null, { timedOut: true });
  assert.equal(timeout.isCorrect, false);
  assert.equal(timeout.timedOut, true);
  const skipped = createAnswerRecord(question, null, { skipped: true });
  assert.equal(skipped.skipped, true);
});
