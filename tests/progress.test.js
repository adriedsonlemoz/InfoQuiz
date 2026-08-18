import test from 'node:test';
import assert from 'node:assert/strict';
import {
  createDefaultModuleProgress,
  normalizeModuleProgress,
  recordModuleEvaluation,
} from '../src/progress/moduleProgress.js';

test('progresso começa zerado para todos os módulos', () => {
  const progress = createDefaultModuleProgress();
  assert.equal(Object.keys(progress).length, 12);
  assert.equal(progress.basico.attempts, 0);
  assert.equal(progress.basico.completed, false);
});

test('reprovação aumenta tentativas sem concluir o módulo', () => {
  const progress = recordModuleEvaluation(createDefaultModuleProgress(), 'basico', {
    score: 20,
    percentage: 40,
    approved: false,
    playedAt: 100,
  });
  assert.equal(progress.basico.attempts, 1);
  assert.equal(progress.basico.completed, false);
  assert.equal(progress.basico.bestPercentage, 40);
});

test('aprovação mantém a melhor nota mesmo após tentativa pior', () => {
  let progress = recordModuleEvaluation(createDefaultModuleProgress(), 'basico', {
    score: 50,
    percentage: 100,
    approved: true,
    playedAt: 100,
  });
  progress = recordModuleEvaluation(progress, 'basico', {
    score: 30,
    percentage: 60,
    approved: true,
    playedAt: 200,
  });
  assert.equal(progress.basico.attempts, 2);
  assert.equal(progress.basico.completed, true);
  assert.equal(progress.basico.bestPercentage, 100);
  assert.equal(progress.basico.lastPercentage, 60);
  assert.equal(progress.basico.completedAt, 100);
});

test('migração legada infere conclusão sem inventar nota', () => {
  const legacy = {
    modulosDesbloqueados: { basico: true, hardware: true },
    achievements: { diplomado: false },
  };
  const progress = normalizeModuleProgress(undefined, legacy);
  assert.equal(progress.basico.completed, true);
  assert.equal(progress.basico.importedFromLegacy, true);
  assert.equal(progress.basico.bestPercentage, null);
  assert.equal(progress.hardware.completed, false);
});
