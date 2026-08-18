import { MODULES } from '../data/modules.js';

const clampPercentage = (value) => {
  if (!Number.isFinite(value)) return null;
  return Math.min(100, Math.max(0, Math.round(value)));
};

const normalizeScore = (value) => (Number.isFinite(value) ? Math.max(0, value) : null);

export function createDefaultModuleProgress() {
  return Object.fromEntries(
    MODULES.map(({ id }) => [
      id,
      {
        attempts: 0,
        bestScore: null,
        bestPercentage: null,
        lastScore: null,
        lastPercentage: null,
        completed: false,
        completedAt: null,
        lastPlayedAt: null,
        importedFromLegacy: false,
      },
    ]),
  );
}

export function normalizeModuleProgress(rawProgress, legacyPlayerData = null) {
  const defaults = createDefaultModuleProgress();
  const source = rawProgress && typeof rawProgress === 'object' ? rawProgress : {};

  const normalized = Object.fromEntries(
    MODULES.map(({ id }) => {
      const raw = source[id] && typeof source[id] === 'object' ? source[id] : {};
      const base = defaults[id];

      return [
        id,
        {
          ...base,
          attempts: Number.isFinite(raw.attempts) ? Math.max(0, Math.floor(raw.attempts)) : base.attempts,
          bestScore: normalizeScore(raw.bestScore),
          bestPercentage: clampPercentage(raw.bestPercentage),
          lastScore: normalizeScore(raw.lastScore),
          lastPercentage: clampPercentage(raw.lastPercentage),
          completed: Boolean(raw.completed),
          completedAt: Number.isFinite(raw.completedAt) ? raw.completedAt : null,
          lastPlayedAt: Number.isFinite(raw.lastPlayedAt) ? raw.lastPlayedAt : null,
          importedFromLegacy: Boolean(raw.importedFromLegacy),
        },
      ];
    }),
  );

  // Saves anteriores à v1.4.0 não registravam desempenho por módulo.
  // Quando o módulo seguinte já estava desbloqueado, sabemos apenas que o
  // módulo anterior foi concluído; nota e número de tentativas permanecem
  // desconhecidos para não inventar dados históricos.
  if ((!rawProgress || typeof rawProgress !== 'object') && legacyPlayerData) {
    MODULES.forEach((module, index) => {
      const nextModule = MODULES[index + 1];
      const inferredCompleted = nextModule
        ? Boolean(legacyPlayerData.modulosDesbloqueados?.[nextModule.id])
        : Boolean(legacyPlayerData.achievements?.diplomado);

      if (inferredCompleted) {
        normalized[module.id] = {
          ...normalized[module.id],
          completed: true,
          importedFromLegacy: true,
        };
      }
    });
  }

  return normalized;
}

export function recordModuleEvaluation(moduleProgress, moduleId, result) {
  if (!MODULES.some((module) => module.id === moduleId)) return moduleProgress;

  const normalized = normalizeModuleProgress(moduleProgress);
  const previous = normalized[moduleId];
  const percentage = clampPercentage(result.percentage) ?? 0;
  const score = normalizeScore(result.score) ?? 0;
  const playedAt = Number.isFinite(result.playedAt) ? result.playedAt : Date.now();
  const completed = previous.completed || Boolean(result.approved);

  return {
    ...normalized,
    [moduleId]: {
      ...previous,
      attempts: previous.attempts + 1,
      bestScore: previous.bestScore === null ? score : Math.max(previous.bestScore, score),
      bestPercentage: previous.bestPercentage === null ? percentage : Math.max(previous.bestPercentage, percentage),
      lastScore: score,
      lastPercentage: percentage,
      completed,
      completedAt: previous.completedAt ?? (result.approved ? playedAt : null),
      lastPlayedAt: playedAt,
      importedFromLegacy: false,
    },
  };
}

export function getCompletedModuleCount(moduleProgress) {
  const normalized = normalizeModuleProgress(moduleProgress);
  return MODULES.filter(({ id }) => normalized[id].completed).length;
}
