# Controlador de Caixa

Sistema web para controle de entradas e saidas financeiras, com cadastro de lancamentos, edicao, exclusao, consulta de movimentos e geracao de relatorios com exportacao em PDF.

## Funcionalidades

- Cadastro de credito (entrada)
- Cadastro de debito (saida)
- Listagem de movimentos com:
  - filtro por texto (nome, categoria, data, etc.)
  - filtro por tipo (`todos`, `credito`, `debito`)
  - resumo financeiro (total de creditos, debitos e saldo)
- Visualizacao detalhada de lancamento
- Edicao de lancamento por ID
- Exclusao de lancamento por ID
- Relatorio por periodo, congregacao e categoria
- Exportacao de relatorio em PDF (jsPDF + autoTable)

## Tecnologias

- Front-end: HTML5, CSS3, JavaScript
- Back-end: PHP (mysqli)
- Banco de dados: MySQL/MariaDB
- Bibliotecas externas:
  - `jspdf`
  - `jspdf-autotable`

## Estrutura do Projeto

```txt
Controlador-de-Caixa/
|-- principal.html
|-- css/
|   |-- style.css
|   |-- sidebar.css
|   |-- relatorios.css
|   `-- descricao.css
|-- js/
|   `-- script.js
`-- php/
    |-- conexao.php
    |-- add_credito.php
    |-- add_debito.php
    |-- movimentos.php
    |-- descricao.php
    |-- editar_lancamento.php
    |-- update_edicao.php
    |-- deletar.php
    `-- relatorios.php
```

## Como Executar Localmente

## Pre-requisitos

- PHP 8+
- MySQL ou MariaDB
- Servidor local (XAMPP, WAMP ou Laragon)

## Passo a passo

1. Clone este repositorio.
2. Copie a pasta do projeto para o diretorio do servidor web (ex.: `htdocs` no XAMPP).
3. Crie um banco de dados chamado `controlador_de_caixa`.
4. Ajuste as credenciais em `php/conexao.php` se necessario:
   - servidor
   - usuario
   - senha
   - nome do banco
5. Inicie Apache e MySQL no seu ambiente local.
6. Acesse no navegador:

```txt
http://localhost/Controlador-de-Caixa/principal.html
```

## Modelo de Dados

Tabela principal: `lancamentos`

Campos:

- `id` (int, PK, auto_increment)
- `data` (date)
- `tipo` (`credito` | `debito`)
- `categoria` (varchar)
- `congregacao` (varchar)
- `nome` (varchar)
- `valor` (decimal)

## Fluxo de Uso

1. Acesse `principal.html`.
2. Cadastre entradas em `add_credito.php` ou saidas em `add_debito.php`.
3. Consulte os registros em `movimentos.php`.
4. Edite ou delete registros em `editar_lancamento.php`.
5. Gere relatorios em `relatorios.php` e exporte para PDF.

## Observacoes Tecnicas

- O projeto utiliza SQL dinamico em alguns filtros (ex.: relatorio). Para producao, recomenda-se padronizar com prepared statements em todos os pontos.
- O arquivo contem textos com possivel problema de encoding em alguns ambientes. Se necessario, padronize os arquivos em UTF-8 sem BOM.

## Melhorias Futuras

- Autenticacao de usuarios
- Controle de perfis/permissoes
- Dashboard com graficos
- Paginacao e ordenacao na listagem
- Validacoes e sanitizacao adicionais no backend
- Testes automatizados

## Licenca

Defina aqui a licenca do projeto (ex.: MIT).
