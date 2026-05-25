// src/services/__tests__/task-service.test.ts
// Cap-11: testes do servico de tarefas com Vitest.
// Demonstra: testes de funcoes puras, verificacao de tipos em testes.

import { describe, it, expect } from 'vitest';

// Implementacao inline para manter o exemplo autocontido neste capitulo.
// Em um projeto real, importe de '../task-service'.

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

function createTask(
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

describe('createTask', () => {
  it('deve criar uma task com status pending por padrao', () => {
    const task = createTask('Escrever documentacao', 'user-1');

    expect(task.title).toBe('Escrever documentacao');
    expect(task.status).toBe('pending');
    expect(task.userId).toBe('user-1');
    expect(task.id).toBeDefined();
    expect(task.createdAt).toBeInstanceOf(Date);
  });

  it('deve aceitar description opcional', () => {
    const task = createTask('Tarefa', 'user-1', 'Detalhe da tarefa');

    expect(task.description).toBe('Detalhe da tarefa');
  });

  it('deve retornar null para description quando nao fornecida', () => {
    const task = createTask('Tarefa', 'user-1');

    expect(task.description).toBeNull();
  });

  it('deve gerar id único por task', () => {
    const task1 = createTask('Tarefa 1', 'user-1');
    const task2 = createTask('Tarefa 2', 'user-1');

    expect(task1.id).not.toBe(task2.id);
  });

  it('deve ter createdAt igual a updatedAt na criacao', () => {
    const task = createTask('Tarefa', 'user-1');

    // Timestamps podem diferir por milissegundos; verificar que sao próximos
    const diff = Math.abs(task.updatedAt.getTime() - task.createdAt.getTime());
    expect(diff).toBeLessThan(10);
  });
});
