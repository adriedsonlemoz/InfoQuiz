# Changelog

## 1.6.1

### Ícone e identidade visual
- Novo ícone oficial do InfoQuiz adicionado em `resources/app-icon.png`.
- Favicon, Apple Touch Icon e versões web 192/512 px adicionadas em `public/`.
- Recursos Android `ic_launcher` e `ic_launcher_round` gerados para mdpi, hdpi, xhdpi, xxhdpi e xxxhdpi.
- `scripts/prepare-android.mjs` agora aplica automaticamente o ícone no projeto Android criado pelo Capacitor e remove os XMLs adaptativos padrão para evitar que o ícone antigo continue sendo usado em Android 8+.

### GitHub Actions / dependências
- Corrigida a falha `npm ci` com código `EUSAGE` causada pelo `package-lock.json` incompleto da 1.6.0.
- O workflow agora executa `npm install --package-lock-only --ignore-scripts` antes de `npm ci`, sincronizando o lockfile no runner antes da instalação limpa.
- Mantidas versões diretas fixadas no `package.json`.

### Android e versão
- Versão atualizada para 1.6.1.
- `versionName=1.6.1` e `versionCode=10601` aplicados automaticamente ao APK.
- Nome do artefato passa a ser `InfoQuiz-1.6.1-debug.apk`.

### Qualidade
- Testes adicionados para validar versão do projeto e presença/assinatura PNG dos assets de ícone.
- Suíte total: 44 testes.

## 1.6.0

### Conteúdo e avaliações
- Banco ampliado de 60 para 180 questões: 15 por módulo e sorteio de 5 por avaliação.
- Revisão factual das perguntas e explicações, incluindo Wi-Fi, IP, HTTPS, SQL, chaves primárias/estrangeiras, SaaS e o histórico do termo “bug”.
- Materiais explicativos dos 12 módulos reescritos com introduções mais claras, três seções de teoria e mini tutoriais práticos.
- Texto de aprovação padronizado para a regra real: pelo menos 60% e uma vida restante.

### Interface e experiência
- Tema visual renovado com base azul/verde, reduzindo o uso de preto puro.
- Tela de avaliação compactada para caber melhor em celulares; alternativas passam a ocupar grade 2×2.
- Feedback de resposta usa cores menos agressivas e backdrop opaco para evitar flashes por trás do diálogo.
- Ações 50/50, +10s e Pular recebem efeito sonoro neutro próprio.
- Mensagens de resultado e ajuda revisadas para ficarem mais claras.

### Progresso e backup
- Save atualizado para `saveVersion: 3`, preservando compatibilidade com o formato anterior.
- Exportação do progresso para JSON e importação com validação de formato.
- Backup inclui progresso, estatísticas, conquistas, energia e lista de revisão.

### Android, offline e build
- Versão atualizada para 1.6.0.
- Script `scripts/prepare-android.mjs` sincroniza `versionName=1.6.0` e `versionCode=10600`.
- O mesmo script remove a permissão `android.permission.INTERNET` do manifesto gerado antes do build.
- Dependências diretas fixadas e `package-lock.json` adicionado; GitHub Actions passa a instalar com `npm ci`.
- Nome do APK no artefato inclui a versão: `InfoQuiz-1.6.0-debug.apk`.

### Qualidade
- Testes de conteúdo validam 15 perguntas únicas e completas em cada módulo.
- Testes de backup validam exportação, restauração e rejeição de arquivos inválidos.
- Suíte total: 42 testes.

## 1.5.2

### Correção do GitHub Actions / APK
- Corrigida a ordem do workflow de Android: a plataforma `android/` agora é criada antes do `actions/setup-java` com cache do Gradle.
- Evita o erro `No file ... matched to [**/*.gradle*, **/gradle-wrapper.properties ...]` em repositórios que ainda não versionam a pasta nativa Android.
- Runner fixado em `ubuntu-24.04` para reduzir variações de imagem durante a geração do APK.
- Mantidos testes, build Vite, sincronização do Capacitor, `assembleDebug` e upload de `InfoQuiz-debug.apk`.

## 1.5.0

- Efeitos sonoros remotos substituídos por arquivos locais em `public/audio/`.
- Removidas URLs externas do código e dos assets necessários ao funcionamento do app.
- Regras de recarga, contador e consumo de energia extraídas para `src/energy/energy.js`.
- Consumo de energia centralizado, incluindo início correto da recarga ao gastar bateria cheia.
- Regras puras do quiz extraídas para `src/quiz/quizSession.js`.
- Registro de respostas passa a reutilizar uma função única para acerto, timeout e pulo.
- Adicionada suíte de 15 testes automatizados com o test runner nativo do Node.
- Scripts `npm test` e `npm run check` adicionados.

## 1.4.0

- Save atualizado para versão 2 com migração automática.
- Progresso individual criado para os 12 módulos.
- Cada avaliação registra tentativas, melhor nota, melhor percentual, última nota e conclusão.
- Saves antigos preservam módulos concluídos sem inventar notas históricas.
- Painel passa a mostrar status, melhor percentual e tentativas por módulo.
- Tela de início do módulo mostra o histórico antes de uma nova avaliação.
- Estatísticas ganham progresso geral do curso e detalhamento dos 12 módulos.
- Critério de aprovação exibido na interface alinhado à regra real de 60%.

## 1.3.0

- Motor da sessão de quiz extraído para `src/hooks/useQuizSession.js`.
- `QuizScreen.jsx` deixa de controlar diretamente cronômetro, vidas, pontuação, streak, poderes e progressão de perguntas.
- Embaralhamento de perguntas e alternativas centralizado no hook com Fisher–Yates.
- Timers e timeouts da sessão são limpos ao desmontar a tela, evitando callbacks antigos após sair da prova.
- Respostas da sessão agora são registradas no resultado, incluindo resposta marcada, timeout e pulo.
- Gabarito passa a mostrar a resposta do aluno e o status de cada questão quando esse histórico está disponível.
- Encerramento da sessão protegido contra finalização duplicada.

## 1.2.0

- Separação completa das telas de Quiz e Curso em componentes próprios.
- `App.jsx` passa a atuar apenas como orquestrador de estado e navegação.
- `CourseApp.jsx` simplificado e corrigido.
- Correção do botão Material de Estudo após a migração para componentes.
- Correção de contabilização duplicada ao retornar do gabarito para o resultado.
- Proteção contra módulo teórico inexistente.

## 1.1.0

- Extração de perguntas, módulos, aulas, conquistas e tema.
- Persistência centralizada com normalização de save.
- Hook de progresso e energia.
- Remoção do polling de localStorage.

## 1.5.1

### GitHub Actions / Android
- Adicionado `.github/workflows/build-apk.yml`.
- O workflow pode ser executado manualmente pela aba Actions e também roda em push/pull request para `main`.
- Instala Node.js e Java 17, executa os testes, gera o build Vite, cria/sincroniza a plataforma Android do Capacitor e compila `app-debug.apk` com Gradle.
- O APK é publicado como artefato `InfoQuiz-Android-APK` por 30 dias.
