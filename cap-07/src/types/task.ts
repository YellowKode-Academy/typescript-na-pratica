// src/types/task.ts
// Cap-07: reutilizado do cap-06 (Utility Types).

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

export type CreateTaskInput = Omit<Task, 'id' | 'createdAt' | 'updatedAt'>;

export type UpdateTaskInput = Partial<
  Pick<Task, 'title' | 'description' | 'status'>
>;

export type TaskResponse = Omit<Task, 'createdAt' | 'updatedAt'> & {
  createdAt: string;
  updatedAt: string;
};
