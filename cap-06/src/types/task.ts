// src/types/task.ts
// Cap-06: tipos derivados com Utility Types.
// Principio DRY aplicado ao sistema de tipos.

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

// Input de criacao: exclui campos gerados pelo servidor
// Omit: mais conciso quando os campos excluidos sao minoria
export type CreateTaskInput = Omit<Task, 'id' | 'createdAt' | 'updatedAt'>;

// Input de atualizacao: apenas campos editáveis, todos opcionais
// Partial<Pick<...>>: evita que id e userId sejam opcionais
export type UpdateTaskInput = Partial<
  Pick<Task, 'title' | 'description' | 'status'>
>;

// Resposta da API: Date convertido para string (serialização JSON)
// Omit + intersection: substitui apenas os campos de data
export type TaskResponse = Omit<Task, 'createdAt' | 'updatedAt'> & {
  createdAt: string;
  updatedAt: string;
};

// Contagem por status: Record garante que todos os status estao presentes
export type TaskCountByStatus = Record<TaskStatus, number>;
