# InfoQuiz — React + Vite + Capacitor

SPA educacional gamificada em React, Vite e Capacitor, preparada para web, GitHub Pages e Android. A versão 1.5.0 torna os efeitos sonoros locais, extrai regras puras de energia/quiz e adiciona testes automatizados sem alterar o conteúdo do curso.

## Desenvolvimento

```bash
npm install
npm run dev
```

## Build web

```bash
npm run build
```

A saída final é gerada em `dist/` e pode ser publicada em hospedagens estáticas.


## Testes automatizados

A suíte usa o test runner nativo do Node e não depende de Vitest/Jest:

```bash
npm test
```

Para testar e depois gerar o build:

```bash
npm run check
```

Os testes cobrem recarga/consumo de energia, migração e progresso por módulo, limite/seleção de perguntas, cronômetro e registro de respostas.

## Android com Capacitor

Na primeira vez:

```bash
npm install
npm run cap:add:android
```

Depois de alterar o React:

```bash
npm run cap:sync
```

Para abrir no Android Studio:

```bash
npm run cap:open
```

Ou execute:

```bash
npm run android
```

## Estrutura atual

```text
src/
├── App.jsx                    # orquestra o fluxo do quiz
├── CourseApp.jsx              # orquestra o material teórico
├── main.jsx                   # alterna entre curso e quiz
├── config/
│   └── theme.js
├── data/
│   ├── achievements.js
│   ├── courseContent.js
│   ├── modules.js
│   └── questions.js
├── energy/
│   └── energy.js
├── hooks/
│   ├── usePlayerData.js
│   └── useQuizSession.js
├── quiz/
│   └── quizSession.js
├── progress/
│   └── moduleProgress.js
├── screens/
│   ├── course/
│   │   ├── CourseHomeScreen.jsx
│   │   └── CourseLessonScreen.jsx
│   └── quiz/
│       ├── AboutScreen.jsx
│       ├── AchievementsScreen.jsx
│       ├── DiplomaScreen.jsx
│       ├── HubScreen.jsx
│       ├── IntroScreen.jsx
│       ├── ModuleStartScreen.jsx
│       ├── QuizScreen.jsx
│       ├── ResultScreen.jsx
│       ├── ReviewScreen.jsx
│       └── StatsScreen.jsx
├── storage/
│   └── playerStorage.js
└── styles.css

public/
└── audio/                     # efeitos sonoros locais/offline

tests/                         # testes com node --test
├── energy.test.js
├── progress.test.js
└── quizSession.test.js
```

## Melhorias da migração React/Vite/Capacitor

- React e Material UI instalados por npm em vez de CDN.
- Babel removido do navegador.
- Curso e Quiz fazem parte da mesma SPA.
- Fluxo Curso → Avaliação sem abrir uma segunda aba.
- Progresso persistido e normalizado com `saveVersion`.
- Energia isolada em hook próprio.
- Revisão remove corretamente questões acertadas.
- Pausa e saída não sobrepõem diálogos.
- Reset remove apenas o save do InfoQuiz.
- Botão de contato usa a API de clipboard quando disponível.

## Refatoração 1.1.0

- Perguntas, módulos, aulas e conquistas extraídos dos componentes principais.
- Tema compartilhado.
- Persistência centralizada.
- Normalização de saves antigos.
- Polling de `localStorage` removido do curso.

## Refatoração 1.2.0

- `App.jsx` reduzido de 705 para cerca de 120 linhas.
- `CourseApp.jsx` reduzido de 229 para menos de 40 linhas.
- Dez telas do quiz movidas para `src/screens/quiz/`.
- Duas telas do curso movidas para `src/screens/course/`.
- Corrigida a prop ausente do botão **Material de Estudo**.
- Removido um trecho inválido que havia sobrado no `CourseApp.jsx` após a retirada do polling.
- Corrigida contagem duplicada de avaliações ao abrir o gabarito e voltar ao resultado.
- Adicionada proteção para módulo teórico inválido.
- Imports relativos e sintaxe JS/JSX validados após a separação.

## Refatoração 1.3.0

- Motor da prova extraído de `QuizScreen.jsx` para `useQuizSession.js`.
- Cronômetro, vidas, pontuação, streak, poderes, respostas e encerramento passam a ser responsabilidade do hook.
- Timers e callbacks temporizados são cancelados ao sair da tela.
- Finalização duplicada da mesma sessão é bloqueada.
- Gabarito registra e mostra resposta marcada, timeout e questão pulada.
- Embaralhamento passou a usar Fisher–Yates em vez de `sort(() => Math.random())`.

## Refatoração 1.4.0

- Save passou para `saveVersion: 2`.
- Cada módulo possui tentativas, melhor nota, melhor percentual, última tentativa e estado de conclusão.
- A migração identifica conclusões antigas pelo desbloqueio do módulo seguinte, sem inventar notas que não existiam no save anterior.
- Painel e tela de início exibem progresso individual.
- Estatísticas mostram conclusão geral e desempenho dos 12 módulos.
- A aprovação exibida ao usuário agora informa explicitamente o mínimo de 60%.


## Refatoração 1.5.0

- Efeitos de acerto, erro e vitória migrados para `public/audio/`; não há mais áudio remoto.
- Efeitos sonoros foram gerados localmente para evitar dependência externa e problemas de licença.
- Regras de energia extraídas para `src/energy/energy.js`.
- Consumo de energia centralizado em `consumeEnergy()`, removendo números mágicos e duplicação.
- Regras puras da sessão extraídas para `src/quiz/quizSession.js`.
- `useQuizSession` passa a reutilizar funções testáveis para embaralhamento, seleção, tempo e registro de respostas.
- Adicionada suíte com 15 testes automatizados usando `node --test`.
- Criados scripts `npm test` e `npm run check`.
- Código-fonte e assets do app deixam de possuir URLs remotas, permitindo funcionamento offline após o build.

## Próximos passos sugeridos

- Criar histórico das últimas avaliações com data, nota e módulo.
- Adicionar testes de componentes e fluxo completo quando as dependências npm estiverem disponíveis.
- Gerar e versionar o projeto nativo `android/` após `cap add android`.

> React, Material UI, Babel, fontes e efeitos sonoros não são carregados por CDN. Depois do build, os assets usados pelo app ficam locais.

## Gerar APK pelo GitHub Actions

O projeto inclui `.github/workflows/build-apk.yml`.

1. Envie o projeto completo para a branch `main` do GitHub.
2. Abra a aba **Actions** do repositório.
3. Selecione **Build Android APK**.
4. Clique em **Run workflow** para gerar manualmente, ou faça um novo push para `main`.
5. Quando a execução terminar, abra-a e baixe o artefato **InfoQuiz-Android-APK**.
6. Dentro do artefato estará `InfoQuiz-debug.apk`, pronto para instalação e testes em Android.

> Este workflow gera um APK **debug**, adequado para instalar e testar. Publicação na Play Store exige uma versão release assinada (APK/AAB) e configuração segura da chave de assinatura.
