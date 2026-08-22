import fs from 'node:fs';
import path from 'node:path';

const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
const versionName = packageJson.version;
const parts = versionName.split('.').map((part) => Number.parseInt(part, 10));
if (parts.length !== 3 || parts.some((part) => !Number.isInteger(part) || part < 0 || part > 99)) {
  throw new Error(`Versão semântica inválida para Android: ${versionName}`);
}

const versionCode = (parts[0] * 10000) + (parts[1] * 100) + parts[2];
const gradleCandidates = [
  path.join('android', 'app', 'build.gradle'),
  path.join('android', 'app', 'build.gradle.kts'),
];
const gradlePath = gradleCandidates.find((candidate) => fs.existsSync(candidate));
if (!gradlePath) throw new Error('Arquivo Gradle do Android não encontrado.');

let gradle = fs.readFileSync(gradlePath, 'utf8');
const hasVersionCode = /versionCode\s*(?:=\s*)?\d+/.test(gradle);
const hasVersionName = /versionName\s*(?:=\s*)?["'][^"']+["']/.test(gradle);
if (!hasVersionCode || !hasVersionName) {
  throw new Error('Não foi possível localizar versionCode/versionName no Gradle.');
}

gradle = gradle
  .replace(/versionCode\s*=\s*\d+/g, `versionCode = ${versionCode}`)
  .replace(/versionCode\s+\d+/g, `versionCode ${versionCode}`)
  .replace(/versionName\s*=\s*["'][^"']+["']/g, `versionName = "${versionName}"`)
  .replace(/versionName\s+["'][^"']+["']/g, `versionName "${versionName}"`);

fs.writeFileSync(gradlePath, gradle);

const manifestPath = path.join('android', 'app', 'src', 'main', 'AndroidManifest.xml');
if (!fs.existsSync(manifestPath)) throw new Error('AndroidManifest.xml não encontrado.');
let manifest = fs.readFileSync(manifestPath, 'utf8');

// Retira a declaração padrão e também força o merger do Android a remover
// INTERNET caso alguma biblioteca tente adicioná-la ao manifesto final.
manifest = manifest.replace(/\s*<uses-permission\s+android:name=["']android\.permission\.INTERNET["'][^>]*\/>/g, '');
if (!manifest.includes('xmlns:tools=')) {
  manifest = manifest.replace(/<manifest\b/, '<manifest xmlns:tools="http://schemas.android.com/tools"');
}
const internetRemovalRule = '  <uses-permission android:name="android.permission.INTERNET" tools:node="remove" />';
if (!manifest.includes('android.permission.INTERNET')) {
  manifest = manifest.replace(/(<manifest[^>]*>)/, `$1\n${internetRemovalRule}`);
}
fs.writeFileSync(manifestPath, manifest);

// Aplica os ícones pré-gerados no projeto Android criado pelo Capacitor.
// Removemos os XMLs adaptativos padrão para impedir que o launcher continue
// usando o ícone do Capacitor em Android 8+; o sistema passa a usar os PNGs
// ic_launcher/ic_launcher_round abaixo, aplicando a máscara do dispositivo.
const densityDirs = ['mdpi', 'hdpi', 'xhdpi', 'xxhdpi', 'xxxhdpi'];
for (const density of densityDirs) {
  const sourceDir = path.join('resources', 'android-icons', density);
  const targetDir = path.join('android', 'app', 'src', 'main', 'res', `mipmap-${density}`);
  const launcherSource = path.join(sourceDir, 'ic_launcher.png');
  const roundSource = path.join(sourceDir, 'ic_launcher_round.png');

  if (!fs.existsSync(launcherSource) || !fs.existsSync(roundSource)) {
    throw new Error(`Ícones Android ausentes para a densidade ${density}.`);
  }

  fs.mkdirSync(targetDir, { recursive: true });
  fs.copyFileSync(launcherSource, path.join(targetDir, 'ic_launcher.png'));
  fs.copyFileSync(roundSource, path.join(targetDir, 'ic_launcher_round.png'));
}

const adaptiveIconDir = path.join('android', 'app', 'src', 'main', 'res', 'mipmap-anydpi-v26');
for (const fileName of ['ic_launcher.xml', 'ic_launcher_round.xml']) {
  const adaptivePath = path.join(adaptiveIconDir, fileName);
  if (fs.existsSync(adaptivePath)) fs.rmSync(adaptivePath);
}

console.log(
  `Android preparado: versionName=${versionName}, versionCode=${versionCode}, ` +
  'INTERNET removida e ícone InfoQuiz aplicado.',
);
