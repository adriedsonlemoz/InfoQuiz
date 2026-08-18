# Changelog

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
