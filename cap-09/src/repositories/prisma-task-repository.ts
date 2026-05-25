// src/repositories/prisma-task-repository.ts
// Cap-09: repositório Prisma para Task.
//
// Os tipos Task e Prisma.TaskCreateInput vem do Prisma (gerados a partir do schema).
// Isso cria um link direto entre o schema do banco e o código TypeScript.
// Se o schema mudar e voce rodar prisma generate, os tipos mudam junto.

import { prisma } from '../lib/prisma';
import { Task, Prisma } from '@prisma/client';

export class PrismaTaskRepository {
  async findById(id: string): Promise<Task | null> {
    return prisma.task.findUnique({ where: { id } });
  }

  async findAll(): Promise<Task[]> {
    return prisma.task.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async create(data: Prisma.TaskCreateInput): Promise<Task> {
    return prisma.task.create({ data });
  }

  async update(id: string, data: Prisma.TaskUpdateInput): Promise<Task> {
    return prisma.task.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<void> {
    await prisma.task.delete({ where: { id } });
  }
}
