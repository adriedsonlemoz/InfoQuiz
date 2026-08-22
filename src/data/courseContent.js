export const COURSE_CONTENT = {
  "basico": {
    "intro": "Informática é o estudo do uso de sistemas computacionais para receber, processar, armazenar e transmitir informações. Para entender qualquer computador, celular ou tablet, vale começar por três ideias: hardware, software e sistema operacional.",
    "secoes": [
      {
        "titulo": "Hardware e software trabalham juntos",
        "texto": "Hardware é a parte física do dispositivo: processador, memória, tela, teclado, armazenamento e outros componentes. Software é a parte lógica: sistema operacional, aplicativos e instruções. Um depende do outro; sem software o hardware não sabe o que executar, e sem hardware o software não tem onde funcionar."
      },
      {
        "titulo": "Entrada, processamento, armazenamento e saída",
        "texto": "Muitos sistemas seguem um fluxo simples. O usuário fornece dados por dispositivos de entrada, como teclado ou microfone. O computador processa esses dados, pode armazená-los em SSD ou outro meio e apresenta o resultado por dispositivos de saída, como monitor ou caixa de som."
      },
      {
        "titulo": "Arquivos, pastas e contas",
        "texto": "Arquivos guardam informações e normalmente possuem nome e extensão. Pastas ajudam a organizar arquivos e outras pastas. Contas de usuário separam preferências, arquivos e permissões de pessoas diferentes no mesmo sistema."
      }
    ],
    "tutorial": {
      "titulo": "Reconhecendo o que existe no seu dispositivo",
      "passos": [
        "Observe três itens físicos, como tela, teclado e carregador: todos são hardware.",
        "Abra três aplicativos: eles são software.",
        "Localize uma pasta e um arquivo dentro dela. Observe o nome e a extensão do arquivo.",
        "Abra as configurações do sistema e veja o nome do sistema operacional e a versão instalada."
      ]
    }
  },
  "hardware": {
    "intro": "Hardware é o conjunto de componentes físicos de um sistema. Cada peça tem uma função específica e o desempenho final depende do equilíbrio entre processamento, memória, armazenamento, vídeo, energia e refrigeração.",
    "secoes": [
      {
        "titulo": "Processador e memória RAM",
        "texto": "A CPU executa instruções e coordena grande parte do processamento. A memória RAM mantém temporariamente dados que estão sendo usados. Mais RAM pode ajudar quando muitos programas ficam abertos, mas ela não substitui um processador adequado nem um armazenamento rápido."
      },
      {
        "titulo": "SSD, HD e armazenamento",
        "texto": "SSDs e HDs mantêm os dados mesmo sem energia. SSDs usam memória eletrônica e normalmente oferecem menor tempo de acesso e maior velocidade. HDs usam discos magnéticos e partes móveis. Capacidade é medida em unidades como GB e TB."
      },
      {
        "titulo": "Placa-mãe, GPU, fonte e refrigeração",
        "texto": "A placa-mãe conecta os componentes. A GPU é especializada em processamento gráfico e paralelo. A fonte converte e distribui energia. Dissipadores e ventoinhas removem calor para que o equipamento opere dentro de temperaturas seguras."
      }
    ],
    "tutorial": {
      "titulo": "Verificando o hardware no Windows",
      "passos": [
        "Pressione Ctrl + Shift + Esc para abrir o Gerenciador de Tarefas.",
        "Abra a guia Desempenho.",
        "Confira CPU, Memória, Disco e GPU, quando disponíveis.",
        "Observe a quantidade de RAM, o tipo de disco e a utilização dos componentes enquanto abre um aplicativo."
      ]
    }
  },
  "windows": {
    "intro": "O Windows é um sistema operacional com interface gráfica. Ele organiza arquivos, executa programas, gerencia dispositivos e oferece ferramentas para configurar, atualizar e proteger o computador.",
    "secoes": [
      {
        "titulo": "Explorador de Arquivos",
        "texto": "O Explorador de Arquivos permite navegar por unidades, pastas e arquivos. Atalhos úteis incluem Win + E para abrir o Explorador, Ctrl + C para copiar, Ctrl + X para recortar, Ctrl + V para colar e Ctrl + Z para desfazer em muitos contextos."
      },
      {
        "titulo": "Janelas e multitarefa",
        "texto": "Aplicativos podem ser minimizados sem serem fechados. Alt + Tab alterna entre janelas abertas e Win + L bloqueia a sessão. O Gerenciador de Tarefas mostra processos e uso de CPU, memória, disco e rede."
      },
      {
        "titulo": "Atualizações e configurações",
        "texto": "A área Configurações reúne opções de rede, contas, privacidade, dispositivos e atualização. Manter o Windows atualizado é importante porque atualizações podem corrigir vulnerabilidades, falhas e problemas de compatibilidade."
      }
    ],
    "tutorial": {
      "titulo": "Organizando arquivos com segurança",
      "passos": [
        "Crie uma pasta chamada Treino InfoQuiz.",
        "Dentro dela, crie duas subpastas: Documentos e Imagens.",
        "Copie um arquivo para Documentos usando Ctrl + C e Ctrl + V.",
        "Renomeie a cópia e depois use Ctrl + Z para desfazer a última alteração.",
        "Exclua um arquivo de teste e confira se ele apareceu na Lixeira."
      ]
    }
  },
  "internet": {
    "intro": "Internet é uma rede mundial formada por muitas redes interconectadas. A Web é um dos serviços que funcionam sobre essa infraestrutura e é acessada principalmente por navegadores.",
    "secoes": [
      {
        "titulo": "Navegador, site e buscador",
        "texto": "Chrome, Edge, Firefox e Safari são navegadores. Google Search e Bing são mecanismos de busca acessados dentro do navegador. Uma URL identifica um recurso na Web e pode conter protocolo, domínio, caminho e parâmetros."
      },
      {
        "titulo": "DNS, IP e HTTPS",
        "texto": "Dispositivos se comunicam por endereços de rede. O DNS traduz nomes de domínio para endereços usados na comunicação. HTTPS usa TLS para proteger os dados em trânsito e autenticar o servidor, mas não garante que todo conteúdo de um site seja confiável."
      },
      {
        "titulo": "Cookies, cache e privacidade",
        "texto": "Cookies podem guardar sessão, preferências e identificadores. O cache armazena cópias temporárias para acelerar carregamentos. O modo privado reduz registros locais da sessão, mas não torna o usuário invisível para provedores, redes ou sites."
      }
    ],
    "tutorial": {
      "titulo": "Lendo um endereço antes de confiar",
      "passos": [
        "Observe o domínio principal do site antes de digitar senha ou dados pessoais.",
        "Desconfie de endereços com letras trocadas ou palavras extras tentando imitar uma marca.",
        "Confira se a conexão usa HTTPS, lembrando que isso protege a transmissão, não a honestidade do site.",
        "Em caso de dúvida, abra o serviço pelo aplicativo oficial ou digite manualmente o endereço conhecido."
      ]
    }
  },
  "word": {
    "intro": "O Microsoft Word é um processador de texto usado para criar documentos como trabalhos, currículos, relatórios e cartas. Mais importante do que decorar botões é entender estrutura, formatação e organização do documento.",
    "secoes": [
      {
        "titulo": "Texto, parágrafos e estilos",
        "texto": "Um documento é formado por caracteres e parágrafos. Negrito, itálico, tamanho e cor alteram a aparência. Estilos permitem aplicar conjuntos consistentes de formatação a títulos e textos, facilitando inclusive a criação de sumários automáticos."
      },
      {
        "titulo": "Alinhamento e paginação",
        "texto": "Parágrafos podem ser alinhados à esquerda, ao centro, à direita ou justificados. Quebras de página iniciam conteúdo na página seguinte de forma estável e são melhores do que pressionar Enter repetidamente."
      },
      {
        "titulo": "Revisão e saída",
        "texto": "Localizar e Substituir ajuda a corrigir termos repetidos. O corretor ortográfico é útil, mas não substitui revisão humana. Antes de imprimir ou gerar PDF, confira margens, paginação e a visualização de impressão."
      }
    ],
    "tutorial": {
      "titulo": "Criando um documento bem organizado",
      "passos": [
        "Digite um título e aplique um estilo de título.",
        "Crie dois parágrafos e ajuste o espaçamento entre eles.",
        "Adicione uma lista com marcadores para três itens.",
        "Insira uma quebra de página antes de uma nova seção.",
        "Abra a visualização de impressão e confira se o conteúdo está distribuído como esperado."
      ]
    }
  },
  "excel": {
    "intro": "O Excel é uma ferramenta de planilhas voltada à organização, cálculo e análise de dados. A unidade básica é a célula, identificada pelo encontro entre coluna e linha, como A1.",
    "secoes": [
      {
        "titulo": "Células, fórmulas e referências",
        "texto": "Fórmulas começam com = e podem usar valores, operadores, funções e referências. Referências relativas, como A1, podem se ajustar ao copiar uma fórmula. Referências absolutas, como $A$1, fixam coluna e linha."
      },
      {
        "titulo": "Funções e organização",
        "texto": "Funções como SOMA e MÉDIA agilizam cálculos. Cabeçalhos claros ajudam a entender tabelas. Classificação reorganiza linhas e filtros mostram apenas registros que atendem a critérios sem apagar os demais."
      },
      {
        "titulo": "Visualização e validação",
        "texto": "Gráficos ajudam a identificar comparações e tendências. Uma sequência de #### pode significar que a coluna está estreita para o valor exibido. Sempre confira se fórmulas usam o intervalo correto antes de confiar no resultado."
      }
    ],
    "tutorial": {
      "titulo": "Montando uma planilha simples",
      "passos": [
        "Na célula A1 escreva Produto e em B1 escreva Valor.",
        "Preencha três produtos nas linhas seguintes e seus valores na coluna B.",
        "Em B5 digite =SOMA(B2:B4) para calcular o total.",
        "Em B6 digite =MÉDIA(B2:B4) para calcular a média.",
        "Aplique um filtro nos cabeçalhos e teste ordenar os valores do menor para o maior."
      ]
    }
  },
  "seguranca": {
    "intro": "Segurança digital combina tecnologia, processos e comportamento. Muitos ataques exploram pressa, confiança e reutilização de senhas, por isso hábitos simples podem reduzir bastante o risco.",
    "secoes": [
      {
        "titulo": "Senhas e autenticação",
        "texto": "Use senhas longas e diferentes para cada serviço. Um gerenciador de senhas facilita isso. Ative autenticação em dois fatores sempre que possível e nunca compartilhe códigos de verificação recebidos por SMS, aplicativo ou e-mail."
      },
      {
        "titulo": "Phishing e engenharia social",
        "texto": "Phishing tenta convencer a vítima a abrir um link, fornecer uma senha, instalar algo ou enviar dinheiro. Golpistas usam urgência, medo e autoridade. Antes de agir, confirme remetente, domínio e contexto por outro canal confiável."
      },
      {
        "titulo": "Atualizações e backups",
        "texto": "Atualizações corrigem falhas conhecidas. Backups ajudam na recuperação após exclusão, defeito ou ransomware. A regra 3-2-1 recomenda três cópias dos dados, em dois tipos de mídia, com uma cópia fora do local principal."
      }
    ],
    "tutorial": {
      "titulo": "Checklist rápido antes de clicar",
      "passos": [
        "Pare e leia a mensagem inteira, especialmente se houver urgência ou ameaça.",
        "Confira o endereço do remetente e o domínio do link.",
        "Não abra anexos inesperados sem confirmar a origem.",
        "Se a mensagem pedir dinheiro ou código de acesso, confirme com a pessoa ou empresa por outro canal.",
        "Em caso de suspeita de invasão, troque a senha, encerre sessões e revise os métodos de recuperação."
      ]
    }
  },
  "redes": {
    "intro": "Redes permitem que dispositivos troquem dados. Em casa, celular, computador, TV e outros aparelhos normalmente se conectam a uma rede local, que por sua vez pode acessar a internet por um roteador.",
    "secoes": [
      {
        "titulo": "LAN, Ethernet e Wi-Fi",
        "texto": "LAN é uma rede local. Ethernet é uma tecnologia muito usada em conexões cabeadas. Wi-Fi é uma família de tecnologias sem fio baseada em padrões IEEE 802.11; o nome Wi-Fi não é oficialmente uma sigla para “Wireless Fidelity”."
      },
      {
        "titulo": "IP, roteador e switch",
        "texto": "Endereços IP são usados para comunicação lógica. Roteadores encaminham pacotes entre redes. Switches interligam dispositivos dentro de uma rede local. Endereços MAC atuam na camada de enlace e ajudam a identificar interfaces nessa comunicação local."
      },
      {
        "titulo": "Velocidade, largura de banda e latência",
        "texto": "Largura de banda indica capacidade de transmissão; latência indica atraso. Uma conexão pode ter alta largura de banda e ainda apresentar atraso. Em Wi-Fi, 2,4 GHz tende a oferecer maior alcance, enquanto 5 GHz costuma oferecer mais capacidade em distâncias menores e com menos obstáculos."
      }
    ],
    "tutorial": {
      "titulo": "Mapeando sua rede doméstica",
      "passos": [
        "Identifique qual equipamento recebe a conexão do provedor e qual faz o roteamento.",
        "Veja quais dispositivos estão conectados por cabo e quais usam Wi-Fi.",
        "Nas configurações de rede do seu aparelho, procure o endereço IP local.",
        "Faça um teste de velocidade e observe separadamente download, upload e latência."
      ]
    }
  },
  "programacao": {
    "intro": "Programar é transformar uma solução em instruções que um computador consegue executar. Bons programas nascem de problemas bem definidos, algoritmos claros, código organizado e testes.",
    "secoes": [
      {
        "titulo": "Algoritmos e controle de fluxo",
        "texto": "Algoritmos descrevem uma sequência de passos. Variáveis guardam valores. Condicionais escolhem caminhos e laços repetem ações. Essas estruturas aparecem em praticamente todas as linguagens de programação."
      },
      {
        "titulo": "Funções, dados e sintaxe",
        "texto": "Funções agrupam lógica reutilizável. Arrays armazenam coleções de valores. Cada linguagem possui regras de sintaxe; erros nessas regras podem impedir a execução ou compilação do código."
      },
      {
        "titulo": "Bugs, testes e versionamento",
        "texto": "Bug é um defeito ou comportamento inesperado. O termo já era usado antes dos computadores eletrônicos; o inseto encontrado em 1947 ficou famoso como um caso de debugging, não como a origem da palavra. Testes e controle de versão ajudam a detectar regressões e acompanhar mudanças."
      }
    ],
    "tutorial": {
      "titulo": "Pensando como um programador",
      "passos": [
        "Escolha uma tarefa simples, como decidir se um aluno foi aprovado.",
        "Liste as entradas necessárias, por exemplo nota e presença.",
        "Escreva a regra em pseudocódigo usando uma condição SE/SENÃO.",
        "Teste com exemplos que devem passar e exemplos que devem falhar.",
        "Só depois transforme o pseudocódigo na linguagem de programação escolhida."
      ]
    }
  },
  "banco": {
    "intro": "Bancos de dados armazenam informações de forma organizada para que aplicações possam consultar, incluir, alterar e remover dados com segurança e eficiência.",
    "secoes": [
      {
        "titulo": "Tabelas, linhas e colunas",
        "texto": "Em bancos relacionais, tabelas organizam dados em linhas e colunas. Uma linha representa um registro; uma coluna representa um atributo. A chave primária identifica cada registro de forma única."
      },
      {
        "titulo": "Relacionamentos e SQL",
        "texto": "Chaves estrangeiras conectam tabelas e ajudam a preservar integridade referencial. SQL é uma linguagem usada para definir estruturas, consultar e manipular dados. SELECT consulta, INSERT adiciona, UPDATE altera e DELETE remove registros."
      },
      {
        "titulo": "Índices, transações e backup",
        "texto": "Índices podem acelerar consultas, embora aumentem uso de espaço e custo de escrita. Transações agrupam operações relacionadas para preservar consistência. Backups devem ser protegidos e testados para garantir que a restauração realmente funcione."
      }
    ],
    "tutorial": {
      "titulo": "Modelando uma lista de alunos",
      "passos": [
        "Crie mentalmente uma tabela Alunos com id, nome e email.",
        "Use id como chave primária para identificar cada aluno.",
        "Imagine outra tabela Cursos com id e nome.",
        "Uma tabela Matriculas pode relacionar aluno e curso por chaves estrangeiras.",
        "Pense em uma consulta SELECT que mostre apenas alunos de um curso específico usando um filtro."
      ]
    }
  },
  "nuvem": {
    "intro": "Computação em nuvem fornece recursos de tecnologia por meio de infraestrutura remota. Ela pode oferecer armazenamento, máquinas virtuais, bancos de dados, plataformas e aplicativos sem que o cliente precise operar todas as camadas físicas.",
    "secoes": [
      {
        "titulo": "SaaS, PaaS e IaaS",
        "texto": "SaaS entrega o aplicativo como serviço. PaaS oferece uma plataforma gerenciada para desenvolver e executar aplicações. IaaS oferece infraestrutura como máquinas virtuais, rede e armazenamento, deixando mais responsabilidades de configuração ao cliente."
      },
      {
        "titulo": "Escalabilidade e disponibilidade",
        "texto": "Escalabilidade permite ajustar capacidade à demanda. Alta disponibilidade usa redundância e distribuição para reduzir interrupções. Regiões e zonas de disponibilidade ajudam a desenhar sistemas resistentes a falhas localizadas."
      },
      {
        "titulo": "Responsabilidade, backup e custos",
        "texto": "Segurança na nuvem segue um modelo de responsabilidade compartilhada: o provedor protege certas camadas e o cliente continua responsável por dados, acessos e configurações sob seu controle. Sincronização não substitui backup. Recursos também devem ser monitorados para evitar custos desnecessários."
      }
    ],
    "tutorial": {
      "titulo": "Escolhendo um serviço de nuvem",
      "passos": [
        "Defina se você precisa apenas usar um aplicativo, executar seu próprio código ou controlar servidores.",
        "Verifique onde os dados serão armazenados e quais regiões estão disponíveis.",
        "Revise autenticação, permissões e opções de backup.",
        "Confira limites, modelo de cobrança e alertas de custo.",
        "Planeje como recuperar dados e continuar operando se um componente falhar."
      ]
    }
  },
  "ia": {
    "intro": "Inteligência artificial reúne técnicas que permitem a sistemas realizar tarefas como reconhecer padrões, prever resultados, compreender linguagem e gerar conteúdo. Nem toda automação é IA e nenhum modelo deve ser tratado como infalível.",
    "secoes": [
      {
        "titulo": "Treinamento e inferência",
        "texto": "No aprendizado de máquina, modelos ajustam parâmetros a partir de dados e objetivos. Esse processo é o treinamento. Depois, quando o modelo recebe uma nova entrada e produz uma previsão ou resposta, ocorre a inferência."
      },
      {
        "titulo": "IA generativa e modelos de linguagem",
        "texto": "IA generativa produz novos conteúdos com base em padrões aprendidos. Modelos de linguagem de grande escala, os LLMs, trabalham com linguagem e podem responder perguntas, resumir, escrever e auxiliar com código. Um prompt é a instrução e o contexto fornecidos ao modelo."
      },
      {
        "titulo": "Vieses, alucinações e privacidade",
        "texto": "Modelos podem apresentar vieses, omitir contexto ou gerar informações falsas com aparência convincente, chamadas de alucinações. Resultados importantes precisam de verificação humana. Dados pessoais e confidenciais também exigem cuidado antes de serem enviados a qualquer serviço de IA."
      }
    ],
    "tutorial": {
      "titulo": "Usando IA de forma responsável",
      "passos": [
        "Explique claramente o objetivo e forneça contexto suficiente no prompt.",
        "Peça que o modelo indique incertezas quando o assunto exigir precisão.",
        "Verifique fatos importantes em fontes confiáveis.",
        "Não envie senhas, documentos confidenciais ou dados pessoais desnecessários.",
        "Use a resposta como apoio e mantenha revisão humana antes de tomar decisões relevantes."
      ]
    }
  }
};
