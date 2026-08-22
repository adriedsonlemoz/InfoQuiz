import { ACHIEVEMENTS } from '../data/achievements.js';
import { DEFAULT_UNLOCKED_MODULES } from '../data/modules.js';
import { createDefaultModuleProgress, normalizeModuleProgress } from '../progress/moduleProgress.js';
import { MAX_ENERGY } from '../energy/energy.js';

export const PLAYER_STORAGE_KEY = 'infoquiz_v2';
export const PLAYER_SAVE_VERSION = 3;
export const BACKUP_FORMAT = 'infoquiz-player-backup';

export function createDefaultPlayerData() {
  return {
    saveVersion: PLAYER_SAVE_VERSION,
    nome: '',
    avatar: '👨‍💻',
    energia: MAX_ENERGY,
    ultimaVezEnergia: Date.now(),
    modulosDesbloqueados: { ...DEFAULT_UNLOCKED_MODULES },
    moduleProgress: createDefaultModuleProgress(),
    stats: { partidasJogadas: 0, acertos: 0, erros: 0 },
    achievements: Object.fromEntries(ACHIEVEMENTS.map(({ id }) => [id, false])),
    revisao: [],
  };
}

export function normalizePlayerData(raw) {
  const defaults = createDefaultPlayerData();
  if (!raw || typeof raw !== 'object') return defaults;

  return {
    ...defaults,
    ...raw,
    saveVersion: PLAYER_SAVE_VERSION,
    nome: typeof raw.nome === 'string' ? raw.nome.slice(0, 80) : defaults.nome,
    avatar: typeof raw.avatar === 'string' ? raw.avatar.slice(0, 8) : defaults.avatar,
    energia: Number.isFinite(raw.energia) ? Math.min(MAX_ENERGY, Math.max(0, raw.energia)) : defaults.energia,
    ultimaVezEnergia: Number.isFinite(raw.ultimaVezEnergia) ? raw.ultimaVezEnergia : defaults.ultimaVezEnergia,
    modulosDesbloqueados: { ...defaults.modulosDesbloqueados, ...(raw.modulosDesbloqueados || {}) },
    moduleProgress: normalizeModuleProgress(raw.moduleProgress, raw),
    stats: { ...defaults.stats, ...(raw.stats || {}) },
    achievements: { ...defaults.achievements, ...(raw.achievements || {}) },
    revisao: Array.isArray(raw.revisao) ? raw.revisao : [],
  };
}

export function loadPlayerData() {
  try {
    const saved = localStorage.getItem(PLAYER_STORAGE_KEY);
    return saved ? normalizePlayerData(JSON.parse(saved)) : createDefaultPlayerData();
  } catch {
    return createDefaultPlayerData();
  }
}

export function savePlayerData(data) {
  localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(normalizePlayerData(data)));
}

export function clearPlayerData() {
  localStorage.removeItem(PLAYER_STORAGE_KEY);
}

export function createPlayerBackup(data, appVersion = 'unknown') {
  return JSON.stringify({
    format: BACKUP_FORMAT,
    formatVersion: 1,
    appVersion,
    exportedAt: new Date().toISOString(),
    player: normalizePlayerData(data),
  }, null, 2);
}

export function parsePlayerBackup(text) {
  let parsed;
  try {
    parsed = JSON.parse(text);
  } catch {
    throw new Error('O arquivo não contém um JSON válido.');
  }

  if (!parsed || parsed.format !== BACKUP_FORMAT || !parsed.player) {
    throw new Error('Este arquivo não é um backup válido do InfoQuiz.');
  }

  return normalizePlayerData(parsed.player);
}
