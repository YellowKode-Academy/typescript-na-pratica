import { Task, TaskStatus } from '../types/task';

export function isTask(obj: unknown): obj is Task {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'id' in obj &&
    'title' in obj &&
    'status' in obj &&
    'userId' in obj
  );
}

export function isValidTaskStatus(value: unknown): value is TaskStatus {
  return value === 'pending' || value === 'in_progress' || value === 'done';
}

export function assertIsString(value: unknown): asserts value is string {
  if (typeof value !== 'string') {
    throw new Error(`Esperado string, recebeu ${typeof value}`);
  }
}
