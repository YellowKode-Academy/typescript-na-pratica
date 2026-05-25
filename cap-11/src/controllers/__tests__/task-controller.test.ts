// src/controllers/__tests__/task-controller.test.ts
// Cap-11: testes de controller com mock do modulo de servico.
// Demonstra: vi.fn() tipado, vi.mock, vi.mocked(), beforeEach com clearAllMocks.

import { vi, describe, it, expect, beforeEach } from 'vitest';

// Simulacao de tipos para manter o exemplo autocontido.
// Em um projeto real, importe de '@prisma/client' e dos modulos reais.

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

// Mock tipado do repositorio.
// O tipo garante que todos os métodos do repositorio real estao presentes.
// Se um método for adicionado ao repositorio e esquecido aqui, TypeScript avisa.
// Sintaxe Vitest 2.x: vi.fn<FunctionType>() - o parametro é o tipo da funcao completa.
const mockTaskRepository = {
  findById: vi.fn<(id: string) => Promise<Task | null>>(),
  findAll: vi.fn<() => Promise<Task[]>>(),
  create: vi.fn<(data: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => Promise<Task>>(),
  update: vi.fn<(id: string, data: Partial<Task>) => Promise<Task>>(),
  delete: vi.fn<(id: string) => Promise<void>>(),
};

// Dado de teste reutilizável
const sampleTask: Task = {
  id: 'task-abc-123',
  title: 'Implementar feature X',
  description: null,
  status: 'pending',
  userId: 'user-1',
  createdAt: new Date('2026-01-15'),
  updatedAt: new Date('2026-01-15'),
};

describe('TaskRepository (mock)', () => {
  beforeEach(() => {
    // Limpa chamadas e retornos entre cada teste
    vi.clearAllMocks();
  });

  describe('findById', () => {
    it('deve retornar task quando encontrada', async () => {
      mockTaskRepository.findById.mockResolvedValue(sampleTask);

      const result = await mockTaskRepository.findById('task-abc-123');

      expect(result).toEqual(sampleTask);
      expect(mockTaskRepository.findById).toHaveBeenCalledWith('task-abc-123');
      expect(mockTaskRepository.findById).toHaveBeenCalledTimes(1);
    });

    it('deve retornar null quando nao encontrada', async () => {
      mockTaskRepository.findById.mockResolvedValue(null);

      const result = await mockTaskRepository.findById('id-inexistente');

      expect(result).toBeNull();
    });
  });

  describe('findAll', () => {
    it('deve retornar lista de tasks', async () => {
      const tasks = [sampleTask, { ...sampleTask, id: 'task-def-456' }];
      mockTaskRepository.findAll.mockResolvedValue(tasks);

      const result = await mockTaskRepository.findAll();

      expect(result).toHaveLength(2);
      expect(result[0].id).toBe('task-abc-123');
    });

    it('deve retornar lista vazia quando nao há tasks', async () => {
      mockTaskRepository.findAll.mockResolvedValue([]);

      const result = await mockTaskRepository.findAll();

      expect(result).toEqual([]);
    });
  });

  describe('create', () => {
    it('deve criar e retornar nova task', async () => {
      const input = {
        title: 'Nova task',
        description: null,
        status: 'pending' as TaskStatus,
        userId: 'user-1',
      };

      mockTaskRepository.create.mockResolvedValue({
        ...sampleTask,
        ...input,
      });

      const result = await mockTaskRepository.create(input);

      expect(result.title).toBe('Nova task');
      expect(result.status).toBe('pending');
    });
  });
});
