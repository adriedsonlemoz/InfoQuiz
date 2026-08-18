export const MAX_ENERGY = 5;
export const ENERGY_COOLDOWN_MS = 10 * 60 * 1000;

export function applyEnergyRecharge(player, now = Date.now()) {
  if (!player || typeof player !== 'object') return player;
  if (player.energia >= MAX_ENERGY) return player;

  const lastEnergyAt = Number.isFinite(player.ultimaVezEnergia)
    ? player.ultimaVezEnergia
    : now;
  const elapsed = Math.max(0, now - lastEnergyAt);
  const gained = Math.floor(elapsed / ENERGY_COOLDOWN_MS);

  if (gained <= 0) return player;

  const energia = Math.min(MAX_ENERGY, player.energia + gained);
  return {
    ...player,
    energia,
    ultimaVezEnergia: energia >= MAX_ENERGY
      ? now
      : lastEnergyAt + gained * ENERGY_COOLDOWN_MS,
  };
}


export function consumeEnergy(player, now = Date.now()) {
  if (!player || typeof player !== 'object' || player.energia <= 0) return player;

  const wasFull = player.energia >= MAX_ENERGY;
  return {
    ...player,
    energia: Math.max(0, player.energia - 1),
    ultimaVezEnergia: wasFull ? now : player.ultimaVezEnergia,
  };
}

export function getEnergyRemainingMs(player, now = Date.now()) {
  if (!player || player.energia >= MAX_ENERGY) return 0;
  const lastEnergyAt = Number.isFinite(player.ultimaVezEnergia)
    ? player.ultimaVezEnergia
    : now;
  return Math.max(0, ENERGY_COOLDOWN_MS - Math.max(0, now - lastEnergyAt));
}

export function formatEnergyTimer(remainingMs) {
  const safeRemaining = Math.max(0, Number.isFinite(remainingMs) ? remainingMs : 0);
  const minutes = Math.floor(safeRemaining / 60000);
  const seconds = Math.floor((safeRemaining % 60000) / 1000);
  return `(${minutes}:${String(seconds).padStart(2, '0')})`;
}
