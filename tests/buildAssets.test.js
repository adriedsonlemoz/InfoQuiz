import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));

test('versão do projeto está atualizada para 1.6.1', () => {
  assert.equal(pkg.version, '1.6.1');
});

test('ícones oficiais existem para web e todas as densidades Android', () => {
  const files = [
    'resources/app-icon.png',
    'public/favicon.png',
    'public/apple-touch-icon.png',
    'public/icon-192.png',
    'public/icon-512.png',
    ...['mdpi', 'hdpi', 'xhdpi', 'xxhdpi', 'xxxhdpi'].flatMap((density) => [
      path.join('resources', 'android-icons', density, 'ic_launcher.png'),
      path.join('resources', 'android-icons', density, 'ic_launcher_round.png'),
    ]),
  ];

  for (const file of files) {
    assert.ok(fs.existsSync(file), `Asset ausente: ${file}`);
    const signature = fs.readFileSync(file).subarray(0, 8);
    assert.deepEqual([...signature], [137, 80, 78, 71, 13, 10, 26, 10], `${file} não é PNG válido`);
  }
});
