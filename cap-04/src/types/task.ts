// src/types/task.ts
// Atualizado no cap-04: adiciona interfaces de Request e Response.
// Regra: union de literais usa type; objetos com forma definida usam interface.

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

// Objetos de request: interface (forma definida)
export interface CreateTaskRequest {
  title: string;
  description?: string;
  userId: string;
}

export interface UpdateTaskRequest {
  title?: string;
  description?: string | null;
  status?: TaskStatus;
}

// Objeto de resposta: Date convertido para string (serialização JSON)
export interface TaskResponse {
  id: string;
  title: string;
  description: string | null;
  status: TaskStatus;
  userId: string;
  createdAt: string;
  updatedAt: string;
}
