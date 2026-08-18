export const QUESTION_BANK = {
            basico: [
                {q:'O que é o Hardware de um computador?', c:'A parte física', o:['A parte física', 'Os programas', 'A internet', 'O usuário'], d:'Hardware é tudo o que você pode tocar (mouse, teclado, tela).'},
                {q:'O que é um Software?', c:'Os programas e aplicativos', o:['Os programas e aplicativos', 'O gabinete', 'Os cabos de rede', 'A memória RAM'], d:'Software é a parte lógica, aquilo que você não toca, apenas vê na tela.'},
                {q:'Qual a função principal do Sistema Operacional?', c:'Gerenciar os recursos do PC', o:['Gerenciar os recursos do PC', 'Criar planilhas', 'Navegar na web', 'Limpar o teclado'], d:'Ele é o software principal que faz a ponte entre o usuário e as peças do computador.'},
                {q:'O que significa PC?', c:'Personal Computer (Computador Pessoal)', o:['Personal Computer (Computador Pessoal)', 'Processador Central', 'Painel de Controle', 'Protocolo de Comunicação'], d:'Termo criado para diferenciar computadores de uso doméstico dos grandes servidores.'},
                {q:'Qual dispositivo é usado para digitar textos?', c:'Teclado', o:['Teclado', 'Mouse', 'Monitor', 'Impressora'], d:'O teclado é o principal periférico de entrada de dados.'}
            ],
            hardware: [
                {q:'Qual peça é considerada o "Cérebro" do computador?', c:'CPU (Processador)', o:['CPU (Processador)', 'Placa de Vídeo', 'Disco Rígido (HD)', 'Fonte de Alimentação'], d:'A CPU é responsável por realizar todos os cálculos matemáticos e lógicos.'},
                {q:'Para que serve a Memória RAM?', c:'Armazenar dados temporários de uso rápido', o:['Armazenar dados temporários de uso rápido', 'Guardar arquivos para sempre', 'Gerar imagens na tela', 'Resfriar o computador'], d:'Ela perde os dados quando o PC é desligado. É a "mesa de trabalho" do PC.'},
                {q:'Qual destes é um dispositivo de ARMAZENAMENTO permanente?', c:'SSD', o:['SSD', 'Memória RAM', 'Placa Mãe', 'Cooler'], d:'SSDs e HDs guardam seus arquivos mesmo após o PC ser desligado.'},
                {q:'Qual a função da Placa-Mãe?', c:'Interligar todas as peças do PC', o:['Interligar todas as peças do PC', 'Acessar a internet', 'Digitar textos', 'Salvar fotos'], d:'É a base onde processador, memória e outras placas são conectadas.'},
                {q:'O que é um periférico de SAÍDA?', c:'Monitor', o:['Monitor', 'Mouse', 'Teclado', 'Microfone'], d:'Um periférico de saída exibe os resultados do processamento (tela, som, impressão).'}
            ],
            windows: [
                {q:'Qual atalho de teclado é usado para COPIAR um arquivo?', c:'Ctrl + C', o:['Ctrl + C', 'Ctrl + V', 'Ctrl + X', 'Ctrl + Z'], d:'O clássico atalho de cópia.'},
                {q:'O que faz o atalho Ctrl + Z?', c:'Desfaz a última ação', o:['Desfaz a última ação', 'Apaga o arquivo', 'Copia um texto', 'Fecha a janela'], d:'O salva-vidas de qualquer usuário quando comete um erro.'},
                {q:'Onde os arquivos deletados vão por padrão no Windows?', c:'Lixeira', o:['Lixeira', 'Área de Trabalho', 'Painel de Controle', 'Disco Local C'], d:'Eles ficam lá até a lixeira ser esvaziada.'},
                {q:'O que é a Área de Trabalho (Desktop)?', c:'A tela principal após ligar o PC', o:['A tela principal após ligar o PC', 'Um editor de textos', 'A pasta de imagens', 'O navegador de internet'], d:'É o seu ambiente inicial de trabalho no sistema.'},
                {q:'Como se chama o gerenciador de arquivos do Windows?', c:'Windows Explorer', o:['Windows Explorer', 'Google Chrome', 'Bloco de Notas', 'Prompt de Comando'], d:'É o programa usado para navegar pelas pastas e arquivos do sistema.'}
            ],
            internet: [
                {q:'O que é um Navegador (Browser)?', c:'Programa para acessar sites web', o:['Programa para acessar sites web', 'Um tipo de antivírus', 'Um cabo de rede', 'Uma rede social'], d:'Exemplos: Google Chrome, Edge, Firefox.'},
                {q:'O que significa a sigla WWW?', c:'World Wide Web', o:['World Wide Web', 'Web Word Window', 'World Web Wireless', 'Windows Web Worker'], d:'A teia mundial de computadores que forma a internet.'},
                {q:'Qual símbolo é obrigatório em um endereço de e-mail?', c:'@ (Arroba)', o:['@ (Arroba)', '# (Hashtag)', '& (E comercial)', '* (Asterisco)'], d:'O @ separa o nome do usuário do provedor de e-mail.'},
                {q:'O que indica o "S" no protocolo HTTPS?', c:'Segurança (Criptografia)', o:['Segurança (Criptografia)', 'Sistema', 'Servidor', 'Social'], d:'Garante que a comunicação entre você e o site é criptografada.'},
                {q:'O que é um provedor de internet (ISP)?', c:'Empresa que fornece acesso à internet', o:['Empresa que fornece acesso à internet', 'Um roteador Wi-Fi', 'O Google', 'Um tipo de vírus'], d:'Ex: Claro, Vivo, provedores locais.'}
            ],
            word: [
                {q:'Para que serve o Microsoft Word?', c:'Editar e formatar textos', o:['Editar e formatar textos', 'Fazer cálculos matemáticos', 'Criar apresentações de slides', 'Navegar na internet'], d:'É o editor de textos mais popular do mundo.'},
                {q:'Qual atalho deixa o texto em NEGRITO no Word (em PT-BR)?', c:'Ctrl + N', o:['Ctrl + N', 'Ctrl + B', 'Ctrl + I', 'Ctrl + S'], d:'No Word em português, usa-se N para Negrito. (Em inglês é Ctrl+B).'},
                {q:'Como salvar um documento rapidamente?', c:'Ctrl + B', o:['Ctrl + B', 'Ctrl + S', 'Ctrl + P', 'Ctrl + C'], d:'Atenção: No Word em português, Salvar é Ctrl + B. Em vários outros programas é Ctrl + S (Save).'},
                {q:'O que é a formatação de alinhamento "Justificado"?', c:'Alinha o texto nas margens esquerda e direita', o:['Alinha o texto nas margens esquerda e direita', 'Centraliza o texto', 'Alinha apenas à esquerda', 'Cria um recuo no parágrafo'], d:'Deixa o texto "quadrado", encostando nas duas margens.'},
                {q:'Qual a extensão padrão de um arquivo do Word atual?', c:'.docx', o:['.docx', '.xlsx', '.txt', '.pdf'], d:'Desde a versão 2007, o padrão passou a ser o .docx.'}
            ],
            excel: [
                {q:'Para que serve o Excel?', c:'Criar e gerenciar planilhas eletrônicas', o:['Criar e gerenciar planilhas eletrônicas', 'Editar imagens', 'Gravar áudios', 'Criar banco de dados relacionais complexos'], d:'É a principal ferramenta para cálculos e organização de dados em tabelas.'},
                {q:'Toda fórmula no Excel deve começar com qual símbolo?', c:'= (Igual)', o:['= (Igual)', '+ (Mais)', '* (Asterisco)', '/ (Barra)'], d:'Se você não colocar o igual, o Excel entenderá como um texto comum.'},
                {q:'O que é uma Célula no Excel?', c:'A interseção de uma linha com uma coluna', o:['A interseção de uma linha com uma coluna', 'Um arquivo novo', 'A barra de fórmulas', 'O menu principal'], d:'Exemplo de célula: A1, B4, C10.'},
                {q:'Qual função soma os valores de um intervalo?', c:'=SOMA()', o:['=SOMA()', '=ADICAO()', '=TOTAL()', '=CALCULAR()'], d:'A função mais básica e usada do sistema.'},
                {q:'Como é representada a Linha e a Coluna, respectivamente?', c:'Coluna por Letras, Linha por Números', o:['Coluna por Letras, Linha por Números', 'Coluna por Números, Linha por Letras', 'Ambas por Letras', 'Ambas por Números'], d:'Por isso dizemos Célula "A" (coluna) "1" (linha).'}
            ],
            seguranca: [
                {q:'O que é um Antivírus?', c:'Programa que detecta e remove malwares', o:['Programa que detecta e remove malwares', 'Uma peça do computador', 'Um tipo de site de compras', 'Um gerenciador de e-mails'], d:'Essencial para manter o PC seguro contra vírus e ameaças.'},
                {q:'O que é Phishing?', c:'Golpe para roubar dados imitando sites reais', o:['Golpe para roubar dados imitando sites reais', 'Uma técnica de formatação no Word', 'Um tipo de conexão de rede', 'Ato de formatar o PC'], d:'O criminoso lança uma "isca" (e-mail falso do banco) para fisgar sua senha.'},
                {q:'O que é recomendável para criar uma senha forte?', c:'Misturar letras, números e símbolos', o:['Misturar letras, números e símbolos', 'Usar a data de nascimento', 'Usar o nome do cachorro', 'Anotar em um post-it no monitor'], d:'Quanto mais variada, mais difícil de ser adivinhada ou quebrada por hackers.'},
                {q:'O que é Backup?', c:'Cópia de segurança dos arquivos', o:['Cópia de segurança dos arquivos', 'O retorno rápido de um e-mail', 'Um vírus que apaga dados', 'A parte de trás do computador'], d:'Sempre tenha cópias de arquivos importantes na nuvem ou em um HD externo.'},
                {q:'O que é SPAM?', c:'Mensagens indesejadas enviadas em massa', o:['Mensagens indesejadas enviadas em massa', 'Um arquivo oculto no sistema', 'Uma marca de teclado', 'Um protocolo de download'], d:'Geralmente são propagandas ou tentativas de golpes no seu e-mail.'}
            ],
            redes: [
                {q:'O que significa a sigla Wi-Fi?', c:'Conexão de rede sem fio', o:['Conexão de rede sem fio', 'Windows Firewall', 'Web Fiber', 'Worldwide Frequency'], d:'Tecnologia que permite dispositivos se conectarem à internet sem cabos.'},
                {q:'O que é um endereço IP?', c:'O "RG" de um dispositivo na rede', o:['O "RG" de um dispositivo na rede', 'Um tipo de cabo', 'Um antivírus', 'O processador do roteador'], d:'IP (Internet Protocol) é o número que identifica cada computador na internet.'},
                {q:'Qual a função do Roteador?', c:'Distribuir o sinal de internet para os aparelhos', o:['Distribuir o sinal de internet para os aparelhos', 'Armazenar fotos', 'Resfriar o computador', 'Imprimir documentos'], d:'Ele "roteia" (encaminha) os dados da internet para o seu celular ou PC.'},
                {q:'O que é uma rede LAN?', c:'Rede Local (ex: dentro de uma casa)', o:['Rede Local (ex: dentro de uma casa)', 'Rede Mundial', 'Rede Espacial', 'Rede de Celulares'], d:'LAN significa Local Area Network (Rede de Área Local).'},
                {q:'Para que serve o comando "Ping"?', c:'Testar a conexão com outro computador/site', o:['Testar a conexão com outro computador/site', 'Apagar arquivos temporários', 'Acelerar o processador', 'Desligar o PC'], d:'Ele envia um pacote e mede quanto tempo demora para voltar, testando se a rede está ativa.'}
            ],
            programacao: [
                {q:'O que é um Algoritmo?', c:'Uma sequência passo a passo para resolver um problema', o:['Uma sequência passo a passo para resolver um problema', 'Um erro no computador', 'Uma peça de hardware', 'Uma marca de processador'], d:'Pense no algoritmo como uma "receita de bolo" para o computador seguir.'},
                {q:'O que significa o termo "Bug" na programação?', c:'Um erro ou falha no código', o:['Um erro ou falha no código', 'Um vírus de internet', 'Uma nova funcionalidade', 'O banco de dados'], d:'A palavra surgiu quando um inseto real (bug) causou um curto-circuito em um computador antigo.'},
                {q:'Para que serve uma Variável?', c:'Guardar um dado na memória temporariamente', o:['Guardar um dado na memória temporariamente', 'Desligar a tela', 'Enviar um e-mail', 'Mudar a cor do site'], d:'É como uma "caixinha" onde o programador guarda uma informação (ex: o nome do usuário).'},
                {q:'O que é o HTML?', c:'Linguagem de marcação para criar páginas web', o:['Linguagem de marcação para criar páginas web', 'Uma linguagem de banco de dados', 'Um sistema operacional', 'Um navegador de internet'], d:'É a estrutura básica de todo site que você acessa na internet.'},
                {q:'Qual destas é uma linguagem de programação famosa?', c:'Python', o:['Python', 'Windows', 'Photoshop', 'Excel'], d:'Python é amplamente usada hoje em dia, especialmente em dados e Inteligência Artificial.'}
            ],
            banco: [
                {q:'O que é um Banco de Dados?', c:'Sistema para armazenar e organizar informações', o:['Sistema para armazenar e organizar informações', 'Um site de compras', 'O lugar onde fica a bateria', 'Um antivírus'], d:'É onde o Facebook guarda os posts, o banco guarda seu saldo, etc.'},
                {q:'O que é a linguagem SQL?', c:'Linguagem usada para consultar banco de dados', o:['Linguagem usada para consultar banco de dados', 'Linguagem para criar design', 'Um protocolo de rede', 'Uma marca de hardware'], d:'SQL significa Structured Query Language (Linguagem de Consulta Estruturada).'},
                {q:'No banco de dados relacional, como os dados são organizados?', c:'Em Tabelas (Linhas e Colunas)', o:['Em Tabelas (Linhas e Colunas)', 'Em parágrafos de texto', 'Em vídeos curtos', 'Em imagens soltas'], d:'É muito parecido com o formato de organização de uma planilha do Excel.'},
                {q:'O que é uma "Chave Primária" (Primary Key)?', c:'Um código único que identifica um registro (ex: CPF)', o:['Um código único que identifica um registro (ex: CPF)', 'A senha do banco de dados', 'O programa para abrir o banco', 'A nuvem de armazenamento'], d:'Garante que não existam duas linhas exatamente idênticas na tabela.'},
                {q:'O que a sigla SGBD significa?', c:'Sistema Gerenciador de Banco de Dados', o:['Sistema Gerenciador de Banco de Dados', 'Sistema Global de Backup Diário', 'Servidor de Gestão Baseada em Dados', 'Software Gratuito de Busca Direta'], d:'Exemplos de SGBD: MySQL, Oracle, PostgreSQL.'}
            ],
            nuvem: [
                {q:'O que é "Computação em Nuvem" (Cloud Computing)?', c:'Usar servidores pela internet para guardar e processar dados', o:['Usar servidores pela internet para guardar e processar dados', 'Armazenar arquivos no pendrive', 'Conectar o PC diretamente na antena', 'Um sistema meteorológico'], d:'Os arquivos não ficam no seu PC, ficam em computadores distantes acessados via rede.'},
                {q:'Qual destes é um serviço clássico de armazenamento em nuvem?', c:'Google Drive', o:['Google Drive', 'Adobe Photoshop', 'Microsoft Paint', 'Google Chrome'], d:'OneDrive, Google Drive e Dropbox são exemplos populares.'},
                {q:'O que é o modelo SaaS (Software as a Service)?', c:'Usar um software online pagando assinatura, sem instalar nada', o:['Usar um software online pagando assinatura, sem instalar nada', 'Comprar um CD de instalação', 'Baixar um arquivo pirata', 'Montar um servidor físico'], d:'Exemplo: Netflix ou o próprio Microsoft Office online.'},
                {q:'Qual a maior vantagem da Nuvem para as empresas?', c:'Escalabilidade (crescer e diminuir recursos fácil)', o:['Escalabilidade (crescer e diminuir recursos fácil)', 'Funciona sem internet', 'É 100% à prova de hackers', 'Não consome energia elétrica'], d:'Se a empresa cresce, basta alugar mais espaço na nuvem com um clique.'},
                {q:'Qual destas empresas lidera o mercado mundial de Cloud?', c:'Amazon (AWS)', o:['Amazon (AWS)', 'Sony', 'Intel', 'HP'], d:'A Amazon Web Services (AWS) é a maior provedora de infraestrutura em nuvem do mundo.'}
            ],
            ia: [
                {q:'O que é Inteligência Artificial (IA)?', c:'Máquinas simulando capacidade humana de aprender e decidir', o:['Máquinas simulando capacidade humana de aprender e decidir', 'Robôs físicos com sentimentos', 'Um jogo de videogame', 'Um banco de dados comum'], d:'É a área da ciência da computação voltada à criação de sistemas "inteligentes".'},
                {q:'O que é o ChatGPT?', c:'Um modelo de linguagem criado pela OpenAI', o:['Um modelo de linguagem criado pela OpenAI', 'Um antivírus potente', 'Um navegador web', 'Uma linguagem de programação'], d:'Ele utiliza IA para gerar textos conversacionais quase humanos.'},
                {q:'O que significa o termo "Machine Learning"?', c:'Aprendizado de Máquina (a IA aprende com dados)', o:['Aprendizado de Máquina (a IA aprende com dados)', 'Máquina de Escrever Moderna', 'Um tipo de placa mãe', 'Conserto de computadores'], d:'Em vez de ser programada passo a passo, a IA analisa milhares de dados e aprende o padrão.'},
                {q:'O que são os "Viéses" (Bias) na Inteligência Artificial?', c:'Preconceitos ou erros que a IA herda dos dados humanos', o:['Preconceitos ou erros que a IA herda dos dados humanos', 'As peças quebradas do robô', 'O cabo de energia da IA', 'A senha do programador'], d:'Se a IA for treinada com dados racistas ou machistas, ela repetirá esses comportamentos.'},
                {q:'O que é o "Teste de Turing"?', c:'Teste para ver se uma máquina consegue se passar por humano', o:['Teste para ver se uma máquina consegue se passar por humano', 'Teste de velocidade do Wi-Fi', 'Teste para ver se o PC roda jogos', 'Exame de matemática'], d:'Criado por Alan Turing em 1950, foca na capacidade da máquina exibir comportamento indistinguível de um humano.'}
            ]
        };
