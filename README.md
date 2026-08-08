# Controlador de Caixa

<p align="center">
  Uma aplicação web para organizar lançamentos financeiros, acompanhar saldos e gerar relatórios por congregação.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Frontend-React%2019-61DAFB?logo=react&logoColor=white" alt="React 19">
  <img src="https://img.shields.io/badge/Backend-FastAPI-009688?logo=fastapi&logoColor=white" alt="FastAPI">
  <img src="https://img.shields.io/badge/Banco%20de%20dados-PostgreSQL-4169E1?logo=postgresql&logoColor=white" alt="PostgreSQL">
  <img src="https://img.shields.io/badge/Status-em%20desenvolvimento-F59E0B" alt="Status: em desenvolvimento">
</p>

## Visão geral

O **Controlador de Caixa** centraliza a gestão financeira de congregações. A plataforma oferece uma interface web protegida por autenticação, com permissões por perfil de acesso e isolamento de dados por congregação.

## Principais recursos

- Autenticação com token JWT e proteção de rotas.
- Painel com totais de créditos, débitos, saldo e quantidade de lançamentos.
- Cadastro, edição, exclusão, busca, filtros e ordenação de lançamentos.
- Gestão de usuários e congregações para administradores.
- Visualização e exportação de relatórios financeiros em PDF.
- Seleção de congregação para administradores; usuários comuns acessam apenas os próprios dados.

## Tecnologias

| Camada | Tecnologias |
| --- | --- |
| Frontend | React 19, Vite, React Router, Axios, React Toastify, jsPDF |
| Backend | Python, FastAPI, SQLAlchemy, Pydantic, Uvicorn |
| Segurança | JWT (`python-jose`) e hash de senhas com bcrypt/Passlib |
| Banco de dados | PostgreSQL via `psycopg2` |
| Deploy | Vercel (frontend) e Render (backend) |

## Estrutura do projeto

```text
controlador-de-caixa/
├── backend/                 # API FastAPI e regras de negócio
│   ├── modules/             # Usuários, congregações, lançamentos e relatórios
│   ├── routes/              # Rotas de autenticação
│   ├── main.py              # Ponto de entrada da API
│   ├── requirements.txt     # Dependências Python
│   └── render.yaml          # Configuração de deploy no Render
├── frontend/                # Aplicação React/Vite
│   ├── src/
│   │   ├── auth/            # Contexto e guardas de rota
│   │   ├── components/      # Componentes reutilizáveis
│   │   ├── modules/         # Páginas e serviços por domínio
│   │   └── utils/           # Toasts e geração de PDF
│   └── package.json
└── README.md
```

## Como executar localmente

### Pré-requisitos

- [Python](https://www.python.org/) 3.10 ou superior
- [Node.js](https://nodejs.org/) 20 ou superior
- Uma instância PostgreSQL acessível

### 1. Clone o repositório

```bash
git clone https://github.com/LuixG-BR/Controlador-de-Caixa.git
cd Controlador-de-Caixa
```

### 2. Configure e execute o backend

No Windows (PowerShell):

```powershell
cd backend
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

No macOS/Linux:

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

Crie `backend/.env` com a URL de conexão do PostgreSQL:

```env
DATABASE_URL=postgresql://USUARIO:SENHA@HOST:5432/NOME_DO_BANCO
```

Em seguida, inicie a API:

```bash
uvicorn main:app --reload
```

A API estará disponível em `http://127.0.0.1:8000`, com documentação interativa em `http://127.0.0.1:8000/docs`.

### 3. Configure e execute o frontend

Abra outro terminal na raiz do projeto:

```bash
cd frontend
npm install
npm run dev
```

Por padrão, o Vite disponibiliza a aplicação em `http://localhost:5173`.

> **Observação:** o cliente está configurado atualmente para consumir a API publicada em `https://controlador-de-caixa.onrender.com`. Para trabalhar com a API local, atualize temporariamente a `baseURL` em `frontend/src/api/api.js` para `http://127.0.0.1:8000`.

## Rotas principais da API

| Método | Rota | Descrição |
| --- | --- | --- |
| `POST` | `/auth/login` | Autentica o usuário e retorna um token JWT. |
| `GET`, `POST`, `PUT`, `PATCH` | `/usuarios` | Consulta e administração de usuários. |
| `GET`, `POST`, `PUT`, `PATCH` | `/congregacao` | Consulta e administração de congregações. |
| `GET`, `POST`, `PUT`, `DELETE` | `/lancamentos` | Gestão de créditos e débitos. |
| `GET` | `/relatorios` | Gera dados consolidados para relatórios. |

As rotas protegidas devem receber o cabeçalho `Authorization: Bearer <token>`.

## Deploy

### Backend — Render

Crie um **Web Service** no Render a partir deste repositório e defina `backend` como diretório raiz. A configuração em [`backend/render.yaml`](backend/render.yaml) instala as dependências e inicia a API com Uvicorn. Cadastre também a variável de ambiente `DATABASE_URL` no painel do Render.

### Frontend — Vercel

Importe este repositório no Vercel e configure `frontend` como **Root Directory**. O Vercel detectará Vite automaticamente; use `npm run build` como comando de build e `dist` como diretório de saída.

Antes do deploy, confirme que a URL configurada em [`frontend/src/api/api.js`](frontend/src/api/api.js) aponta para a API correta do Render.

## Scripts disponíveis

| Diretório | Comando | Ação |
| --- | --- | --- |
| `frontend` | `npm run dev` | Inicia o ambiente de desenvolvimento. |
| `frontend` | `npm run build` | Gera a versão de produção. |
| `frontend` | `npm run lint` | Executa a análise estática com ESLint. |
| `backend` | `uvicorn main:app --reload` | Inicia a API com recarga automática. |

## Contribuição

1. Crie uma branch a partir de `main`.
2. Faça alterações pequenas e coesas.
3. Execute os testes e verificações pertinentes.
4. Abra um pull request descrevendo o problema e a solução.

## Licença

Este projeto ainda não possui uma licença definida.
