import test from 'node:test';
import assert from 'node:assert/strict';
import {
  BACKUP_FORMAT,
  createDefaultPlayerData,
  createPlayerBackup,
  parsePlayerBackup,
  PLAYER_SAVE_VERSION,
} from '../src/storage/playerStorage.js';

test('backup exporta e restaura dados normalizados', () => {
  const player = createDefaultPlayerData();
  player.nome = 'Aluno Teste';
  player.energia = 3;
  player.stats.acertos = 12;

  const backupText = createPlayerBackup(player, '1.6.1');
  const envelope = JSON.parse(backupText);
  const restored = parsePlayerBackup(backupText);

  assert.equal(envelope.format, BACKUP_FORMAT);
  assert.equal(envelope.appVersion, '1.6.1');
  assert.equal(restored.nome, 'Aluno Teste');
  assert.equal(restored.energia, 3);
  assert.equal(restored.stats.acertos, 12);
  assert.equal(restored.saveVersion, PLAYER_SAVE_VERSION);
});

test('backup rejeita JSON que não pertence ao InfoQuiz', () => {
  assert.throws(() => parsePlayerBackup('{"hello":"world"}'), /backup válido/i);
});
