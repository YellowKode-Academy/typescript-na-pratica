// src/types/task.ts
// Tipos centrais do projeto task-api.
// Introduzido no cap-03: interface Task e TaskStatus.

export type TaskStatus = 'pending' | 'in_progress' | 'done';

export interface Task {
  id: string;
  title: string;
  description: string | null;
  status: TaskStatus;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}
