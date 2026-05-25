import { Task, CreateTaskInput, UpdateTaskInput } from '../types/task';

const tasks: Task[] = [];

export function createTask(
  title: string,
  userId: string,
  description?: string
): Task {
  return {
    id: crypto.randomUUID(),
    title,
    description: description ?? null,
    status: 'pending',
    userId,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}

export function findTask(id: string): Task | null {
  return tasks.find(t => t.id === id) ?? null;
}

export function listTasks(): Task[] {
  return [...tasks];
}
