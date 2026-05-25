// src/services/task-service.ts
// Cap-10: servico com erros tipados e Result<T>.
//
// Regras:
// - Erros previsíveis (nao encontrado, inválido): retornar Result com fail()
// - Erros imprevisíveis (banco offline, bug): lancar excecao (catch no error middleware)

import { Task, CreateTaskInput, UpdateTaskInput } from '../types/task';
import { Result, ok, fail } from '../types/result';
import { NotFoundError, ValidationError } from '../errors/app-error';

// Armazenamento em memória (substituido pelo Prisma no cap-09)
const tasks: Task[] = [];

export async function createTask(
  input: CreateTaskInput
): Promise<Result<Task>> {
  if (!input.title.trim()) {
    return fail(new ValidationError('Título nao pode ser vazio'));
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
  return ok(task);
}

export async function getTask(id: string): Promise<Result<Task>> {
  const task = tasks.find(t => t.id === id);

  if (!task) {
    return fail(new NotFoundError('Task', id));
  }

  return ok(task);
}

export async function listTasks(): Promise<Result<Task[]>> {
  return ok([...tasks]);
}

export async function updateTask(
  id: string,
  input: UpdateTaskInput
): Promise<Result<Task>> {
  const task = tasks.find(t => t.id === id);

  if (!task) {
    return fail(new NotFoundError('Task', id));
  }

  if (input.title !== undefined) task.title = input.title;
  if (input.description !== undefined) task.description = input.description;
  if (input.status !== undefined) task.status = input.status;
  task.updatedAt = new Date();

  return ok(task);
}

export async function deleteTask(id: string): Promise<Result<void>> {
  const index = tasks.findIndex(t => t.id === id);

  if (index < 0) {
    return fail(new NotFoundError('Task', id));
  }

  tasks.splice(index, 1);
  return ok(undefined);
}
