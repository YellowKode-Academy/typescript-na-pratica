// src/types/task.ts
// Cap-10: reutilizado do cap-06 (Utility Types).

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
