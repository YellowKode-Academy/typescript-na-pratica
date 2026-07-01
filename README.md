<p align="center">

[![Capa do Livro](cover.jpg)](https://www.amazon.com.br/dp/B0GX6W5ZCV)

> **[Disponivel na Amazon.com.br](https://www.amazon.com.br/dp/B0GX6W5ZCV)** — R$24,97

---

  <img src="capa.jpg" alt="TypeScript na Prática" width="320"/>
</p>

<h1 align="center">TypeScript na Prática</h1>

<p align="center">
  Repositório companion do livro publicado por
  <a href="https://github.com/kelvinbiffi">@kelvinbiffi</a>
  e <a href="https://github.com/YellowKode-Academy">@YellowKode-Academy</a>
</p>

<p align="center">
  <a href="https://www.amazon.com.br">Disponível na Amazon KDP</a>
</p>

---

## Sobre este repositório

Contém todo o código TypeScript referenciado no livro, do capítulo 2 ao 12. Cada diretório `cap-XX/` contém os arquivos criados ou modificados naquele capítulo.

O projeto central do livro é a **task-api**: uma API REST com Express que começa em JavaScript puro e é tipificada progressivamente até ter type safety em todas as camadas, testes com Vitest e CI que bloqueia merges com erros de tipo.

## Setup

```bash
git clone https://github.com/YellowKode-Academy/typescript-na-pratica
cd typescript-na-pratica/cap-02
npm install
cp .env.example .env
# Edite .env com a DATABASE_URL
npm run dev
```

## Variáveis de ambiente

Copie `.env.example` para `.env` e preencha:

```
DATABASE_URL=postgresql://user:password@localhost:5432/task_api
PORT=3000
NODE_ENV=development
```

O `DATABASE_URL` só é necessário a partir do cap-09 (Prisma). Para caps 02 a 08, o projeto usa armazenamento em memória e não precisa de banco.

**Opções para `DATABASE_URL`:**
- **Local (Docker):** `docker run -e POSTGRES_PASSWORD=postgres -p 5432:5432 postgres:16`
  → `postgresql://postgres:postgres@localhost:5432/task_api`
- **Nuvem gratuita:** [Supabase](https://supabase.com/dashboard) → New Project → Settings → Database → Connection string
- **Railway:** [railway.app](https://railway.app) → New Project → PostgreSQL → Connect

## Estrutura por capítulo

| Capítulo | Diretório | O que você constrói |
|---|---|---|
| 1 | (conceitual) | Por que TypeScript: 3 bugs que o compilador previne |
| 2 | `cap-02/` | Configuração: `tsconfig.json`, `allowJs`, `strict` gradual |
| 3 | `cap-03/` | Interface Task, inferência de tipos e `any` vs `unknown` |
| 4 | `cap-04/` | Interface vs type alias, tipos de Request e Response |
| 5 | `cap-05/` | Generics: `Repository<T>` e `ApiResponse<T>` |
| 6 | `cap-06/` | Utility Types: `Omit`, `Partial`, `Pick`, `Record` |
| 7 | `cap-07/` | Type Guards, narrowing e `Result<T>` |
| 8 | `cap-08/` | Tipando Express: `TypedBody`, declaration merging |
| 9 | `cap-09/` | Prisma como gerador de tipos, `PrismaTaskRepository` |
| 10 | `cap-10/` | Erros tipados: `AppError`, `Result<T,E>`, `assertNever` |
| 11 | `cap-11/` | Testes com Vitest e mocks tipados |
| 12 | `cap-12/` | CI/CD: GitHub Actions com `tsc --noEmit` como barreira |

## Stack

Node.js 20+, Express 5, TypeScript 5.4+, tsx, Prisma 5, Vitest, Railway, GitHub Actions.

## Autor

Criado por [@kelvinbiffi](https://github.com/kelvinbiffi) para a série de livros técnicos da [@YellowKode-Academy](https://github.com/YellowKode-Academy).
