# portal-escolar-di-
# Colégio Horizonte — Portal Escolar Integrado

> Primeiro Commit (v0.5): Estruturação inicial do front-end institucional, barra de acessibilidade funcional e protótipo da tela de acesso acadêmico.

O sistema une uma vitrine institucional pública: divulgação de segmentos de ensino, eventos, busca de disciplinas e contato. A uma área restrita de gestão acadêmica para alunos e professores.

## Status Atual do Desenvolvimento (v0.5)
### Implementado neste commit
- Barra de Acessibilidade Persistente: Alternância entre Modo Claro e Modo Escuro e controle dinâmico de tamanho de fonte (A-, A, A+) com armazenamento das preferências no "localStorage".
- Paleta de Cores Contrastante: Variáveis CSS configuradas para atender aos critérios de contraste da WCAG (nível AA/AAA) em ambos os temas.
- Página Institucional (index.html): Cabeçalho de navegação, carrossel de destaques, cartões explicativos de segmentos de ensino, sistema de abas com filtro em tempo real para disciplinas, formulário de contato e rodapé.
- Protótipo de Login (login.html): Tela dedicada para seleção de perfil (Aluno/Professor) e autenticação.

### Em andamento (`WIP` / `TODO`)
- Substituir conteúdos provisórios.
- Adicionar indicadores visuais e rotação automática pausável no carrossel de imagens.
- Refinar media queries para dispositivos móveis com telas menores que 480px.
- Integrar os formulários de contato e login com a API back-end em Python.

## Estrutura de Arquivos
portal-escolar-di/

├── index.html      -Página principal (vitrine institucional e consulta)

├── login.html      -Página de acesso ao portal acadêmico

├── style.css       -Definição de variáveis CSS, temas claro/escuro e layout

├── script.js       -Lógica de acessibilidade, carrossel, abas e simulações

└── README.md       -Documentação do projeto

Nos próximos Commits, serão adicionadas a pasta "docs/" com diagramas BPMN/UML e a estrutura do back-end.

## Passo a Passo da Construção (Versão Inicial)

1. Planejamento Visual e Paleta WCAG: Definição das variáveis CSS em root e data-theme="dark", priorizando tons de azul-marinho (#1E3A8A) e verde-petróleo (#0F766E) para transmitir confiança e foco educacional, garantindo alto contraste entre texto e plano de fundo.
2. Marcação Semântica (HTML5): Estruturação das páginas utilizando tags semânticas para compatibilidade com leitores de tela.
3. Camada de Acessibilidade (JS): Implementação dos controles de escala tipográfica e alternância de tema com persistência no navegador do usuário.
4. Componentes Interativos: Criação da navegação manual do carrossel, alternância de painéis nas abas de pesquisa, filtro dinâmico por palavras-chave e feedback simulado nos formulários.

## Próximos Passos

- 1: Finalização dos componentes visuais pendentes, ajustes finos de responsividade e revisão das heurísticas de Nielsen.
- 2: Conexão com o back-end e implementação da suíte de testes automatizados.

## Autor

Desenvolvido por Mateus Madruga — Segundo semestre em Ciência da Computação (CEUB).
