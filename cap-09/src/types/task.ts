// src/types/task.ts
// Cap-09: no Prisma, os tipos sao gerados a partir do schema.
// Este arquivo re-exporta os tipos do Prisma para manter a mesma interface
// do resto do projeto. Isso evita que o codigo externo importe diretamente de @prisma/client.

// Após rodar 'prisma generate', o Prisma gera em node_modules/@prisma/client:
//
//   export type Task = {
//     id: string;
//     title: string;
//     description: string | null;
//     status: TaskStatus;
//     userId: string;
//     createdAt: Date;
//     updatedAt: Date;
//   }
//
//   export type TaskStatus = 'pending' | 'in_progress' | 'done';

export type { Task, TaskStatus, Prisma } from '@prisma/client';

// Utility types derivados do tipo gerado pelo Prisma
import { Task } from '@prisma/client';

export type TaskResponse = Omit<Task, 'createdAt' | 'updatedAt'> & {
  createdAt: string;
  updatedAt: string;
};
