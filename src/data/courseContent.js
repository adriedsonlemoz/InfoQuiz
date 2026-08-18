export const COURSE_CONTENT = {
            basico: {
                intro: "Bem-vindo ao mundo da informática! Um computador, na sua essência, é uma máquina capaz de receber dados, processá-los e devolver um resultado. Para que tudo isso aconteça, ele se divide em duas partes fundamentais que trabalham sempre juntas: o Hardware e o Software.",
                secoes: [
                    {
                        titulo: "Hardware vs Software",
                        texto: "O Hardware é toda a parte física do computador. Se você pode tocar, chutar ou segurar, é hardware (como o monitor, o teclado e o mouse). Já o Software é a parte lógica, os programas. Você não pode 'tocar' no Google Chrome ou no Windows, você apenas interage com eles através da tela."
                    }
                ],
                tutorial: {
                    titulo: "Como diferenciar o Sistema Operacional dos Aplicativos",
                    passos: [
                        "Pense no Sistema Operacional (ex: Windows, Android) como o 'gerente' do computador.",
                        "Ele é o primeiro software a ser carregado quando você liga a máquina.",
                        "Os aplicativos (ex: Word, WhatsApp, jogos) são os 'funcionários'. Eles precisam do gerente (Sistema Operacional) para poderem funcionar e acessar o hardware (como a câmera ou a tela)."
                    ]
                }
            },
            hardware: {
                intro: "O hardware é o corpo do computador. Mas para esse corpo ter memória de longo prazo, ele precisa de armazenamento. Hoje, a grande batalha é entre o HD e o SSD.",
                secoes: [
                    {
                        titulo: "HD vs SSD: Velocidade é tudo",
                        texto: "O HD (Hard Disk) usa discos magnéticos e agulhas, sendo lento e barulhento. O SSD (Solid State Drive) usa chips eletrônicos, sendo silencioso, resistente e incrivelmente rápido."
                    },
                    {
                        titulo: "Por que meu PC está lento?",
                        texto: "Geralmente, o 'gargalo' de um computador antigo é o HD. Trocar um HD antigo por um SSD novo é a forma mais barata e eficaz de fazer um computador de 5 anos atrás parecer novo de novo."
                    }
                ],
                tutorial: {
                    titulo: "Identificando seu hardware no Windows",
                    passos: [
                        "1. Pressione Ctrl + Shift + Esc para abrir o Gerenciador de Tarefas.",
                        "2. Vá na aba 'Desempenho'.",
                        "3. Clique em 'Disco'.",
                        "4. Veja o tipo (HDD ou SSD) no canto superior da janela."
                    ]
                }
            },
            windows: {
                intro: "O Windows é o Sistema Operacional mais utilizado no mundo para computadores pessoais. Ele usa uma interface gráfica, o que significa que você interage com ele usando um mouse para clicar em ícones e janelas coloridas, em vez de digitar códigos em uma tela preta.",
                secoes: [
                    {
                        titulo: "Área de Trabalho e Arquivos",
                        texto: "A Área de Trabalho (Desktop) é a sua tela inicial. A partir dela, você usa o 'Windows Explorer' (ou Explorador de Arquivos) para navegar pelas suas pastas. Dominar atalhos de teclado nesta área é o segredo para ser um usuário rápido e eficiente."
                    }
                ],
                tutorial: {
                    titulo: "Tutorial Prático: Copiar e Colar (O Segredo do Ctrl)",
                    passos: [
                        "1. Selecione um arquivo ou texto clicando sobre ele.",
                        "2. Pressione e segure a tecla 'Ctrl' no teclado.",
                        "3. Sem soltar o 'Ctrl', dê um toque na tecla 'C' (Isso Copia a informação para a memória invisível do PC).",
                        "4. Vá até o local onde deseja colocar a cópia (uma nova pasta ou linha de texto).",
                        "5. Segure 'Ctrl' e dê um toque na tecla 'V' (Isso Cola o arquivo)."
                    ]
                }
            },
            internet: {
                intro: "A Internet não é uma nuvem mágica; ela é a maior estrutura física já construída pela humanidade. Trata-se de milhares de cabos submarinos cruzando os oceanos para conectar o seu celular a computadores do outro lado do mundo.",
                secoes: [
                    {
                        titulo: "Como os sites são encontrados (IP e DNS)",
                        texto: "Cada computador na internet tem um número de telefone único, chamado IP (ex: 142.250.190.46). Como é difícil decorar números, inventaram o DNS (Sistema de Nomes de Domínio). O DNS é como a 'agenda de contatos' da internet: ele traduz o nome 'google.com' para o número IP do servidor deles automaticamente."
                    },
                    {
                        titulo: "Navegadores (Browsers)",
                        texto: "O Navegador (como Chrome, Edge ou Safari) é o 'tradutor'. O servidor envia um monte de códigos e textos bagunçados para você, e o navegador traduz isso em cores, botões e imagens bonitas na sua tela."
                    }
                ],
                tutorial: {
                    titulo: "Como ler o endereço de um site (URL)",
                    passos: [
                        "1. HTTPS: Significa que a conexão é segura (criptografada). Nunca coloque senhas em sites que mostrem apenas 'HTTP' (sem o S).",
                        "2. Domínio: É o nome principal (ex: 'bancodobrasil').",
                        "3. Extensão: Indica o tipo do site ('.com' é comercial, '.edu' é educação, '.gov' é governo).",
                        "4. País: O final indica a origem do site ('.br' é Brasil, '.pt' é Portugal)."
                    ]
                }
            },
            word: {
                intro: "O Microsoft Word é o editor de textos mais famoso do mundo. Ele serve para criar desde currículos simples até livros inteiros. O seu grande trunfo é mostrar na tela do computador exatamente como o papel sairá na impressora.",
                secoes: [
                    {
                        titulo: "Formatação Básica",
                        texto: "Saber alinhar textos (esquerda, centro, direita ou justificado) e usar estilos de fonte (Negrito, Itálico, Sublinhado) separa um documento amador de um profissional."
                    }
                ],
                tutorial: {
                    titulo: "Como formatar um título com destaque",
                    passos: [
                        "1. Digite o título no Word e selecione todo o texto com o mouse.",
                        "2. Pressione 'Ctrl + N' para deixá-lo em Negrito (as letras ficam mais grossas).",
                        "3. No menu superior, clique no botão de 'Centralizar' (ou use Ctrl + E).",
                        "4. Altere o tamanho da fonte para 16 ou 18 para dar peso visual ao título."
                    ]
                }
            },
            excel: {
                intro: "O Excel é o rei das planilhas eletrônicas. Diferente do Word, que é focado em texto, o Excel é feito para organizar dados e fazer cálculos matemáticos automaticamente. A tela é dividida em milhares de 'caixinhas' chamadas Células.",
                secoes: [
                    {
                        titulo: "Linhas, Colunas e Células",
                        texto: "As colunas são representadas por letras (A, B, C...) e as linhas por números (1, 2, 3...). O cruzamento de uma coluna com uma linha forma a célula (ex: A1). Para fazer contas, usamos as Fórmulas."
                    }
                ],
                tutorial: {
                    titulo: "Como criar sua primeira fórmula de soma",
                    passos: [
                        "1. Clique na célula A1 e digite o número 10.",
                        "2. Clique na célula A2 e digite o número 20.",
                        "3. Clique na célula A3 (onde você quer o resultado).",
                        "4. Digite exatamente assim: =A1+A2 e aperte Enter.",
                        "5. O Excel mostrará o número 30 automaticamente!"
                    ]
                }
            },
            seguranca: {
                intro: "Na internet moderna, o elo mais fraco da segurança não é o antivírus nem o computador: é o usuário humano. Hackers descobriram que é muito mais fácil enganar uma pessoa para ela entregar a senha do que tentar quebrar a criptografia de um sistema.",
                secoes: [
                    {
                        titulo: "A Isca (Phishing)",
                        texto: "O Phishing (pescaria) é o golpe mais comum do mundo. O golpista cria um e-mail ou uma página idêntica à do seu banco, com uma mensagem urgente ('Sua conta será bloqueada!'). O desespero faz a vítima digitar a senha na página falsa, entregando-a diretamente para o bandido."
                    },
                    {
                        titulo: "Engenharia Social",
                        texto: "É a arte de manipular pessoas. Um exemplo clássico é o golpe do WhatsApp, onde o bandido se passa por um familiar pedindo dinheiro emprestado. Nunca confie apenas na foto do perfil."
                    }
                ],
                tutorial: {
                    titulo: "Como criar uma senha de elite (e não esquecê-la)",
                    passos: [
                        "Senhas como '123456' ou a sua data de nascimento são quebradas em 1 segundo por robôs.",
                        "Técnica do Fraseado: Invente uma frase que faça sentido só para você e use as iniciais.",
                        "Exemplo: 'Meu cachorro Rex nasceu em 2015 e é lindo!'",
                        "Transformando em senha: 'McRne2015eel!'",
                        "O resultado é uma senha forte, com maiúsculas, minúsculas, números e símbolos, e fácil de memorizar."
                    ]
                }
            },
            redes: {
                intro: "Imagine o mundo sem conexões: cada computador seria uma ilha isolada. As Redes de Computadores nasceram para permitir que essas ilhas trocassem informações. Hoje, do seu celular até o servidor do YouTube, tudo está interligado.",
                secoes: [
                    {
                        titulo: "Tipos de Redes (LAN e WAN)",
                        texto: "Uma rede pequena, como o Wi-Fi da sua casa ou do seu escritório, é chamada de LAN (Rede de Área Local). Quando conectamos várias LANs ao redor do mundo inteiro, criamos uma WAN (Rede de Área Ampla). A Internet é, basicamente, a maior WAN do planeta."
                    },
                    {
                        titulo: "Roteador e Wi-Fi",
                        texto: "O Roteador é o 'diretor de trânsito' da sua casa. Ele recebe o cabo de fibra ótica da rua e distribui a internet para o seu celular e TV. O Wi-Fi é apenas a tecnologia de rádio que o roteador usa para enviar esses dados pelo ar, sem precisar de cabos espalhados pela sala."
                    }
                ],
                tutorial: {
                    titulo: "Como descobrir o 'RG' (IP) do seu computador",
                    passos: [
                        "Cada aparelho conectado ganha um número na rede, chamado IP.",
                        "1. No Windows, clique no botão Iniciar e digite 'CMD' (Prompt de Comando) e aperte Enter.",
                        "2. Na tela preta que abrir, digite o comando: ipconfig e aperte Enter.",
                        "3. Procure pela linha 'Endereço IPv4'. O número lá (ex: 192.168.1.15) é a identidade do seu PC na sua casa!",
                        "Dica: Os hackers não conseguem invadir sua casa só com esse número local."
                    ]
                }
            },
            programacao: {
                intro: "Computadores são máquinas incrivelmente rápidas, mas totalmente 'burras'. Eles não fazem nada sozinhos. A Programação é a arte de escrever regras e passos bem detalhados para que o computador saiba exatamente o que fazer. Nós chamamos isso de 'escrever código'.",
                secoes: [
                    {
                        titulo: "Algoritmos e Lógica",
                        texto: "Antes de escrever o código, usamos a Lógica. Um Algoritmo é como uma receita de bolo: 1) Pegue a farinha, 2) Quebre os ovos, 3) Asse. Se você mandar o computador assar antes de quebrar os ovos, o programa vai dar 'Bug' (erro)."
                    },
                    {
                        titulo: "Variáveis (As Caixas Mágicas)",
                        texto: "Na programação, usamos algo chamado 'Variável'. Imagine uma caixa de papelão onde você escreve 'Idade' do lado de fora, e coloca o número '25' dentro. O computador guarda essa caixa na memória e, toda vez que precisar da sua idade, ele olha lá dentro."
                    }
                ],
                tutorial: {
                    titulo: "Seu primeiro contato com Código (HTML)",
                    passos: [
                        "Você pode ver o código que cria qualquer site no mundo agora mesmo!",
                        "1. Abra qualquer site pelo computador (ex: Google).",
                        "2. Clique com o botão DIREITO do mouse em qualquer lugar vazio da página.",
                        "3. Escolha a opção 'Inspecionar' ou 'Exibir código-fonte'.",
                        "4. Uma tela lateral vai se abrir cheia de textos coloridos (isso é o HTML). É exatamente assim que os programadores constroem a internet!"
                    ]
                }
            },
            banco: {
                intro: "Sempre que você faz login em um site, curte uma foto ou faz uma transferência bancária, essas informações não ficam flutuando no ar. Elas são guardadas de forma extremamente organizada em um Banco de Dados (Database).",
                secoes: [
                    {
                        titulo: "Tabelas e Relações",
                        texto: "A forma mais comum de organizar dados é no modelo Relacional. Pense em planilhas gigantes interligadas. Uma tabela de 'Clientes' se conecta a uma tabela de 'Pedidos'. Assim, o sistema sabe exatamente o que o Joãozinho comprou."
                    },
                    {
                        titulo: "A Linguagem SQL",
                        texto: "Para falar com esse banco de dados, os programadores usam uma linguagem chamada SQL. Com um comando curto, é possível buscar 'todos os clientes de São Paulo que compraram ontem' em questão de milissegundos."
                    }
                ],
                tutorial: {
                    titulo: "Entendendo a Chave Primária (Primary Key)",
                    passos: [
                        "1. Em um banco, duas pessoas podem se chamar 'Maria Silva'.",
                        "2. Para não enviar a compra para a Maria errada, o banco exige uma 'Chave Primária'.",
                        "3. A chave primária é um identificador único, como o CPF ou o Código do Cliente.",
                        "4. Regra de ouro: Nenhuma linha na tabela pode ter uma chave primária repetida ou vazia!"
                    ]
                }
            },
            nuvem: {
                intro: "Esqueça a ideia de olhar para o céu. A 'Nuvem' é, na verdade, o computador de outra pessoa. Computação em nuvem significa alugar servidores gigantescos localizados em galpões de alta segurança para rodar seus sistemas ou guardar seus arquivos através da internet.",
                secoes: [
                    {
                        titulo: "Por que as empresas amam a Nuvem?",
                        texto: "Antes, uma empresa precisava comprar servidores caríssimos. Se o site fizesse sucesso na Black Friday, o servidor travava. Na nuvem (como a Amazon AWS), se o site bombar, a empresa aperta um botão e 'aluga' mais 10 servidores temporários por algumas horas. Isso se chama Escalabilidade."
                    },
                    {
                        titulo: "O Modelo SaaS",
                        texto: "SaaS significa 'Software como Serviço'. É quando você não precisa instalar nada no seu PC para usar um programa. O Google Docs e a Netflix são exemplos de SaaS rodando 100% na nuvem."
                    }
                ],
                tutorial: {
                    titulo: "Salvando um arquivo na nuvem gratuitamente",
                    passos: [
                        "1. Tenha uma conta Google (Gmail).",
                        "2. Acesse drive.google.com no seu navegador.",
                        "3. Clique em 'Novo' e depois em 'Upload de arquivo'.",
                        "4. Pronto! Seu arquivo agora está em um servidor seguro do Google e você pode acessá-lo de qualquer celular do mundo."
                    ]
                }
            },
            ia: {
                intro: "A Inteligência Artificial (IA) é a fronteira final da computação. O objetivo não é criar robôs com sentimentos, mas sim sistemas capazes de analisar montanhas de dados, reconhecer padrões complexos e tomar decisões ou criar conteúdos de forma autônoma.",
                secoes: [
                    {
                        titulo: "Machine Learning (O Robô que Aprende)",
                        texto: "A magia moderna da IA está no Machine Learning. Em vez de programarmos a regra exata, nós damos 100 mil fotos de gatos para o computador e dizemos: 'Encontre o padrão'. Ele cria a própria fórmula matemática para reconhecer orelhas e focinhos."
                    },
                    {
                        titulo: "IA Generativa e o ChatGPT",
                        texto: "Nos últimos anos, a IA aprendeu a 'falar' e 'criar'. IAs generativas leem todo o texto disponível na internet para aprender como as palavras se conectam. Ao pedir para o ChatGPT escrever um poema, ele está calculando estatisticamente qual palavra faz mais sentido colocar a seguir."
                    }
                ],
                tutorial: {
                    titulo: "O segredo do Prompt Perfeito",
                    passos: [
                        "1. 'Prompt' é o comando que você digita para a IA.",
                        "2. Seja claro sobre o Papel: 'Aja como um professor de matemática...'",
                        "3. Dê contexto: '...e me explique frações...'",
                        "4. Defina o tom: '...usando analogias com fatias de pizza para uma criança de 10 anos'.",
                        "5. Quanto melhor e mais detalhado o seu prompt, melhor será a resposta da IA."
                    ]
                }
            }
        };
