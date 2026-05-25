// src/services/task-service.ts
// Cap-07: servico com retorno Result<T>.
// Erros previsíveis (nao encontrado, inválido) sao retornados, nao lancados.

import { Task, TaskStatus, CreateTaskInput, UpdateTaskInput } from '../types/task';
import { Result } from '../types/result';

// Armazenamento em memória (substituido pelo Prisma no cap-09)
const tasks: Task[] = [];

export function createTask(input: CreateTaskInput): Result<Task> {
  if (!input.title.trim()) {
    return { type: 'failure', error: 'Título nao pode ser vazio', code: 'VALIDATION_ERROR' };
  }

  const task: Task = {
    id: crypto.randomUUID(),
    title: input.title,
    description: input.description ?? null,
    status: input.status ?? 'pending',
    userId: input.userId,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  tasks.push(task);
  return { type: 'success', data: task };
}

export function findTask(id: string): Result<Task> {
  const task = tasks.find(t => t.id === id);

  if (!task) {
    return { type: 'failure', error: 'Task nao encontrada', code: 'NOT_FOUND' };
  }

  return { type: 'success', data: task };
}

export function listTasks(): Result<Task[]> {
  return { type: 'success', data: [...tasks] };
}

export function updateTask(id: string, input: UpdateTaskInput): Result<Task> {
  const task = tasks.find(t => t.id === id);

  if (!task) {
    return { type: 'failure', error: 'Task nao encontrada', code: 'NOT_FOUND' };
  }

  if (input.title !== undefined) task.title = input.title;
  if (input.description !== undefined) task.description = input.description;
  if (input.status !== undefined) task.status = input.status;
  task.updatedAt = new Date();

  return { type: 'success', data: task };
}

export function deleteTask(id: string): Result<void> {
  const index = tasks.findIndex(t => t.id === id);

  if (index < 0) {
    return { type: 'failure', error: 'Task nao encontrada', code: 'NOT_FOUND' };
  }

  tasks.splice(index, 1);
  return { type: 'success', data: undefined };
}
