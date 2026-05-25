import { Task, CreateTaskInput, UpdateTaskInput } from '../types/task';

export class PrismaTaskRepository {
  async findById(id: string): Promise<Task | null> {
    throw new Error('Não implementado — substitua pela implementação real com Prisma');
  }

  async findAll(): Promise<Task[]> {
    throw new Error('Não implementado — substitua pela implementação real com Prisma');
  }

  async create(data: CreateTaskInput): Promise<Task> {
    throw new Error('Não implementado — substitua pela implementação real com Prisma');
  }

  async update(id: string, data: UpdateTaskInput): Promise<Task> {
    throw new Error('Não implementado — substitua pela implementação real com Prisma');
  }

  async delete(id: string): Promise<void> {
    throw new Error('Não implementado — substitua pela implementação real com Prisma');
  }
}
