// src/services/task-service.ts
// Servico de tarefas - cap-03.
// Demonstra: parametros tipados, retorno explícito, operador ??.

import { Task, TaskStatus } from '../types/task';

// Armazenamento em memória (substituido pelo Prisma no cap-09)
const tasks: Task[] = [];

export function createTask(
  title: string,
  userId: string,
  description?: string
): Task {
  const task: Task = {
    id: crypto.randomUUID(),
    title,
    description: description ?? null,
    status: 'pending',
    userId,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  tasks.push(task);
  return task;
}

export function findTaskById(id: string): Task | null {
  const task = tasks.find(t => t.id === id);
  return task ?? null;
}

export function listTasks(): Task[] {
  return [...tasks];
}

export function updateTaskStatus(id: string, status: TaskStatus): Task | null {
  const task = tasks.find(t => t.id === id);
  if (!task) return null;
  task.status = status;
  task.updatedAt = new Date();
  return task;
}

export function deleteTask(id: string): boolean {
  const index = tasks.findIndex(t => t.id === id);
  if (index < 0) return false;
  tasks.splice(index, 1);
  return true;
}
