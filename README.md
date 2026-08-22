# InfoQuiz 1.6.0 — React + Vite + Capacitor

InfoQuiz é um aplicativo educacional gamificado de informática com **12 módulos**, **180 questões revisadas** e material teórico próprio. O conteúdo, os sons e o progresso ficam locais, permitindo uso do APK sem conexão com a internet.

## Destaques da 1.6.0

- 15 questões por módulo (180 no total); cada avaliação sorteia 5.
- Textos explicativos dos 12 módulos reescritos com conceitos, exemplos e mini tutoriais.
- Correções conceituais em Wi-Fi, IP, HTTPS, SQL, chaves de banco de dados, SaaS, histórico do termo *bug* e outros tópicos.
- Interface renovada com tons azul/verde e menos preto puro.
- Tela da avaliação compactada para celulares, com respostas em grade 2×2 e sem rolagem durante a prova na maioria dos aparelhos.
- Feedback de acerto/erro mais suave e fundo do diálogo opaco para evitar flashes de cor atrás.
- Som neutro para 50/50, +10s e Pular; som de erro fica reservado a respostas incorretas.
- Exportação e importação do progresso em JSON, mantendo compatibilidade com saves antigos.
- Critério de aprovação padronizado na interface: **pelo menos 60% e uma vida restante**.
- Android sincronizado com a versão do `package.json`: `1.6.0` → `versionCode 10600`.
- O workflow remove a permissão Android `INTERNET` antes de compilar o APK.
- Dependências diretas fixadas, `package-lock.json` versionado e GitHub Actions usando `npm ci`.
- Suíte ampliada para **42 testes automatizados**.

## Desenvolvimento

Requer Node.js 20 ou superior.

```bash
npm ci
npm run dev
```

Para validar a lógica:

```bash
npm test
```

Para testar e gerar a versão web:

```bash
npm run check
```

> O build local precisa das dependências npm instaladas. O aplicativo gerado não precisa de internet para acessar perguntas, aulas, sons ou progresso.

## Build web

```bash
npm run build
```

A saída é criada em `dist/`.

## Android com Capacitor

Na primeira geração da plataforma:

```bash
npm run cap:add:android
npm run android:prepare
```

Depois de alterar o React:

```bash
npm run cap:sync
npm run android:prepare
```

O comando `android:prepare` lê a versão do `package.json`, atualiza `versionName`/`versionCode` e aplica a política offline ao manifesto Android.

Para abrir no Android Studio:

```bash
npm run cap:open
```

## Gerar APK pelo GitHub Actions

O workflow está em `.github/workflows/build-apk.yml` e pode rodar manualmente ou em push/pull request para `main`.

Fluxo da automação:

1. instala Node.js 20;
2. instala dependências com `npm ci`;
3. executa os testes;
4. gera o build Vite;
5. cria a plataforma Android se necessário;
6. sincroniza o Capacitor;
7. aplica versão Android e política sem permissão de internet;
8. compila `assembleDebug`;
9. publica `InfoQuiz-1.6.0-debug.apk` no artefato **InfoQuiz-Android-APK**.

> O APK do workflow é **debug**, adequado para instalação e testes. Publicação em loja exige assinatura release e, preferencialmente, AAB.

## Conteúdo e avaliação

Cada um dos 12 módulos possui 15 questões. Uma avaliação usa 5 questões sorteadas e vale até 50 pontos. O módulo é concluído quando o aluno obtém pelo menos 60% e termina com uma ou mais vidas.

Os módulos são:

1. Fundamentos
2. Hardware
3. Windows
4. Internet
5. Microsoft Word
6. Microsoft Excel
7. Segurança Digital
8. Redes de Computadores
9. Lógica e Programação
10. Banco de Dados
11. Cloud Computing
12. Inteligência Artificial

O material de estudo possui introdução, três seções explicativas e um mini tutorial prático por módulo.

## Progresso e backup

O progresso continua salvo localmente na chave `infoquiz_v2`. A versão do save foi atualizada para 3, com normalização automática de dados antigos.

No Painel:

- **Exportar** cria um backup JSON do progresso;
- **Importar** valida e restaura um backup do InfoQuiz;
- **Zerar** remove somente o save do aplicativo.

O backup inclui progresso dos módulos, estatísticas, conquistas, energia e revisão de erros.

## Estrutura principal

```text
src/
├── App.jsx
├── CourseApp.jsx
├── config/theme.js
├── data/
│   ├── achievements.js
│   ├── courseContent.js
│   ├── modules.js
│   └── questions.js
├── energy/energy.js
├── hooks/
│   ├── usePlayerData.js
│   └── useQuizSession.js
├── progress/moduleProgress.js
├── quiz/quizSession.js
├── screens/
│   ├── course/
│   └── quiz/
├── storage/playerStorage.js
└── styles.css

scripts/
└── prepare-android.mjs

public/audio/
├── action.wav
├── error.wav
├── success.wav
└── victory.wav

tests/
├── content.test.js
├── energy.test.js
├── progress.test.js
├── quizSession.test.js
└── storage.test.js
```

## Política offline

O código da aplicação não realiza `fetch`, Axios, WebSocket ou carregamento de recursos por URL externa. React, Material UI e os efeitos sonoros são empacotados/localizados no build. No APK, o workflow também remove a permissão Android de acesso à internet antes da compilação.
