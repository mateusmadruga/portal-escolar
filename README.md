# Colégio Horizonte — Portal Escolar Integrado
Aplicação web desenvolvida como projeto unificado para as disciplinas de **Desenvolvimento de Interfaces** e **Engenharia de Software (Projeto Integrador)** do curso de Ciência da Computação — **CEUB (2/2026)**.

## Visão Geral do Sistema

O **Portal Escolar Integrado** combina o portal institucional público da escola com o ambiente acadêmico restrito para alunos e professores:

1. **Portal Institucional (`index.html`):** Carrossel acessível com controle de pausa, cartões explicativos de segmentos e diferenciais, central de consulta com abas e filtro em tempo real, formulário de contato validado com máscara e rodapé institucional.
2. **Autenticação (`login.html`):** Tela de acesso com seleção de perfil (`Aluno` ou `Professor`), visualização de senha e atalhos de preenchimento para demonstração.
3. **Painel Acadêmico (`portal.html`):** Boletim digital para visualização do aluno e diário de classe interativo para o professor lançar notas e frequência com cálculo automático de média e situação (`Aprovado`, `Recuperação`, `Reprovado`).

## Paleta de Cores e Conformidade WCAG

| Tema | Elemento | Código HEX | Relação de Contraste | Nível WCAG |
| :--- | :--- | :--- | :--- | :--- |
| **Modo Claro** | Texto (`#0F172A`) sobre Fundo (`#F8FAFC`) | `#0F172A` / `#F8FAFC` | `17.9 : 1` | AAA |
| **Modo Claro** | Texto (`#FFFFFF`) sobre Primária (`#1E3A8A`) | `#FFFFFF` / `#1E3A8A` | `10.3 : 1` | AAA |
| **Modo Escuro** | Texto (`#F1F5F9`) sobre Fundo (`#0F172A`) | `#F1F5F9` / `#0F172A` | `16.5 : 1` | AAA |
| **Modo Escuro** | Texto (`#0F172A`) sobre Primária (`#60A5FA`) | `#0F172A` / `#60A5FA` | `8.4 : 1` | AAA |
| **Alto Contraste** | Texto (`#FFFFFF`) sobre Fundo (`#000000`) | `#FFFFFF` / `#000000` | `21.0 : 1` | AAA |

### Recursos de Acessibilidade Implementados
- Controle de escala tipográfica (`13px` a `22px`) com persistência em `localStorage`.
- Alternância entre **Modo Claro**, **Modo Escuro** e **Alto Contraste**.
- Link de salto direto ao conteúdo principal (`skip-link`) e foco visível (`:focus-visible`) para navegação por teclado.
- Botão explícito de **Pausar/Retomar** no carrossel automático (critério WCAG 2.2.2).
