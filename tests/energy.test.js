import test from 'node:test';
import assert from 'node:assert/strict';
import {
  applyEnergyRecharge,
  consumeEnergy,
  ENERGY_COOLDOWN_MS,
  formatEnergyTimer,
  getEnergyRemainingMs,
  MAX_ENERGY,
} from '../src/energy/energy.js';

test('energia não recarrega antes de 10 minutos', () => {
  const start = 1_000_000;
  const player = { energia: 2, ultimaVezEnergia: start };
  const result = applyEnergyRecharge(player, start + ENERGY_COOLDOWN_MS - 1);
  assert.strictEqual(result, player);
});

test('energia recarrega uma unidade por intervalo completo', () => {
  const start = 1_000_000;
  const player = { energia: 1, ultimaVezEnergia: start };
  const now = start + ENERGY_COOLDOWN_MS * 2 + 5_000;
  const result = applyEnergyRecharge(player, now);
  assert.equal(result.energia, 3);
  assert.equal(result.ultimaVezEnergia, start + ENERGY_COOLDOWN_MS * 2);
});

test('energia nunca ultrapassa o máximo e ancora o relógio ao chegar em 5/5', () => {
  const start = 1_000_000;
  const now = start + ENERGY_COOLDOWN_MS * 5;
  const result = applyEnergyRecharge({ energia: 4, ultimaVezEnergia: start }, now);
  assert.equal(result.energia, MAX_ENERGY);
  assert.equal(result.ultimaVezEnergia, now);
});

test('contador informa o tempo restante para a próxima energia', () => {
  const start = 1_000_000;
  const player = { energia: 3, ultimaVezEnergia: start };
  const remaining = getEnergyRemainingMs(player, start + 90_000);
  assert.equal(remaining, ENERGY_COOLDOWN_MS - 90_000);
  assert.equal(formatEnergyTimer(remaining), '(8:30)');
});


test('consumir energia cheia inicia o relógio naquele instante', () => {
  const now = 5_000_000;
  const player = { energia: MAX_ENERGY, ultimaVezEnergia: 100 };
  const result = consumeEnergy(player, now);
  assert.equal(result.energia, MAX_ENERGY - 1);
  assert.equal(result.ultimaVezEnergia, now);
});

test('consumir energia parcial preserva o ciclo de recarga existente', () => {
  const player = { energia: 3, ultimaVezEnergia: 1_000 };
  const result = consumeEnergy(player, 9_000);
  assert.equal(result.energia, 2);
  assert.equal(result.ultimaVezEnergia, 1_000);
});
