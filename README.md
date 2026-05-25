# TypeScript na Pratica — Código Companion

Repositório de código do livro **TypeScript na Pratica** (YellowKode Academy).

Cada diretório `cap-XX/` contém os arquivos criados ou modificados naquele capítulo do livro, isolados para facilitar o acompanhamento.

## Projeto

**task-api** — API REST com Express 5 que migra progressivamente de JavaScript para TypeScript.

Stack:
- Express 5
- TypeScript 5.4+
- tsx (dev), tsc (build)
- Prisma 5 + PostgreSQL
- Vitest (testes)

## Como usar os capítulos

Cada diretório é independente e mostra o estado do código naquele ponto do livro. Para rodar um capítulo localmente:

```bash
# Exemplo com cap-02
cd cap-02
npm install
npm run dev
```

Para os capítulos com Prisma (cap-09 em diante), configure o `.env` com `DATABASE_URL`:

```
DATABASE_URL="postgresql://user:password@localhost:5432/task_api"
```

E rode as migrations:

```bash
npx prisma migrate dev
```

## Estrutura dos capítulos

| Diretório | Conteúdo |
|---|---|
| `cap-02/` | tsconfig.json, scripts do package.json, src/health.ts, src/index.ts |
| `cap-03/` | src/types/task.ts, src/services/task-service.ts |
| `cap-04/` | src/types/task.ts com Request/Response, src/controllers/task-controller.ts |
| `cap-05/` | src/types/entity.ts, src/repositories/in-memory-repository.ts, src/types/api-response.ts |
| `cap-06/` | src/types/task.ts com Utility Types (Omit, Partial, Pick, Record) |
| `cap-07/` | src/types/result.ts, servico e controller com Result<T> |
| `cap-08/` | src/types/express-extensions.ts, middlewares de auth e erro, controllers tipados |
| `cap-09/` | prisma/schema.prisma, src/lib/prisma.ts, src/repositories/prisma-task-repository.ts |
| `cap-10/` | src/errors/app-error.ts, Result<T, E> melhorado, src/utils/assert-never.ts |
| `cap-11/` | vitest.config.ts, testes de servico, utils e controller |
| `cap-12/` | .github/workflows/ci-cd.yml, src/index.ts final, package.json completo |

## Referência rápida de comandos

```bash
npm run dev          # tsx watch — reinicia ao salvar
npm run build        # tsc — compila para dist/
npm run start        # node dist/index.js — producao
npm run type-check   # tsc --noEmit — verifica tipos sem compilar
npm test             # vitest run — executa testes
npm run test:watch   # vitest — modo watch
npm run test:coverage # vitest run --coverage
npm run db:generate  # prisma generate — atualiza tipos do Prisma
npm run db:migrate   # prisma migrate dev — aplica migrations
```

## Conceitos por capítulo

- **Cap 02:** `allowJs: true`, migração incremental, tsx vs ts-node
- **Cap 03:** Inferência de tipos, `interface Task`, `any` vs `unknown`
- **Cap 04:** `interface` vs `type`, declaration merging, tipos de Request/Response
- **Cap 05:** Generics, `Repository<T>`, `ApiResponse<T>`
- **Cap 06:** Utility Types: `Partial`, `Pick`, `Omit`, `Record`
- **Cap 07:** Narrowing, type guards, discriminated unions, `Result<T>`
- **Cap 08:** Generics do Express, `TypedBody`, declaration merging em `Request`
- **Cap 09:** Prisma como gerador de tipos, singleton do PrismaClient
- **Cap 10:** Erros tipados, `AppError`, `Result<T, E>`, `assertNever`
- **Cap 11:** Vitest, mocks tipados, `vi.fn()`, `vi.mocked()`
- **Cap 12:** CI com GitHub Actions, `tsc --noEmit` como barreira de deploy
