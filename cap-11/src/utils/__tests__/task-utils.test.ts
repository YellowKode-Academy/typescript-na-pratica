// src/utils/__tests__/task-utils.test.ts
// Cap-11: testes de funcoes utilitárias puras.
// Demonstra: mock de Task tipado, verificacao de tipos em testes.

import { describe, it, expect } from 'vitest';

// Tipos e funcoes inline para manter o exemplo autocontido.

type TaskStatus = 'pending' | 'in_progress' | 'done';

interface Task {
  id: string;
  title: string;
  description: string | null;
  status: TaskStatus;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

interface TaskResponse {
  id: string;
  title: string;
  description: string | null;
  status: TaskStatus;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

function mapTaskToResponse(task: Task): TaskResponse {
  return {
    id: task.id,
    title: task.title,
    description: task.description,
    status: task.status,
    userId: task.userId,
    createdAt: task.createdAt.toISOString(),
    updatedAt: task.updatedAt.toISOString(),
  };
}

function isValidTaskStatus(value: unknown): value is TaskStatus {
  return value === 'pending' || value === 'in_progress' || value === 'done';
}

// O tipo Task garante que o mock satisfaz o mesmo contrato do codigo real.
// Se Task ganhar um campo obrigatório, este mock precisa ser atualizado.
const mockTask: Task = {
  id: 'task-1',
  title: 'Tarefa de teste',
  description: null,
  status: 'pending',
  userId: 'user-1',
  createdAt: new Date('2026-01-01'),
  updatedAt: new Date('2026-01-01'),
};

describe('mapTaskToResponse', () => {
  it('deve converter Date para string ISO', () => {
    const response = mapTaskToResponse(mockTask);

    expect(typeof response.createdAt).toBe('string');
    expect(response.createdAt).toBe('2026-01-01T00:00:00.000Z');
  });

  it('deve preservar todos os campos da task', () => {
    const response = mapTaskToResponse(mockTask);

    expect(response.id).toBe(mockTask.id);
    expect(response.title).toBe(mockTask.title);
    expect(response.status).toBe(mockTask.status);
    expect(response.userId).toBe(mockTask.userId);
    expect(response.description).toBeNull();
  });
});

describe('isValidTaskStatus', () => {
  it('deve aceitar valores válidos', () => {
    expect(isValidTaskStatus('pending')).toBe(true);
    expect(isValidTaskStatus('in_progress')).toBe(true);
    expect(isValidTaskStatus('done')).toBe(true);
  });

  it('deve rejeitar valores inválidos', () => {
    expect(isValidTaskStatus('cancelled')).toBe(false);
    expect(isValidTaskStatus('')).toBe(false);
    expect(isValidTaskStatus(null)).toBe(false);
    expect(isValidTaskStatus(undefined)).toBe(false);
    expect(isValidTaskStatus(42)).toBe(false);
  });
});
