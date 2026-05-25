import { Task, CreateTaskInput, UpdateTaskInput } from '../types/task';
import { taskRepository } from '../repositories/task-repository';

export function createTask(input: CreateTaskInput): Task {
  const task: Task = {
    id: crypto.randomUUID(),
    title: input.title,
    description: input.description ?? null,
    status: input.status ?? 'pending',
    userId: input.userId,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  return taskRepository.save(task);
}

export function findTask(id: string): Task | null {
  return taskRepository.findById(id);
}

export function listTasks(): Task[] {
  return taskRepository.findAll();
}

export function updateTask(id: string, input: UpdateTaskInput): Task | null {
  const task = taskRepository.findById(id);
  if (!task) return null;

  const updated: Task = {
    ...task,
    ...(input.title !== undefined && { title: input.title }),
    ...(input.description !== undefined && { description: input.description }),
    ...(input.status !== undefined && { status: input.status }),
    updatedAt: new Date(),
  };

  return taskRepository.save(updated);
}

export function deleteTask(id: string): boolean {
  return taskRepository.delete(id);
}
