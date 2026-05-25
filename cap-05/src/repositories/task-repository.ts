// src/repositories/task-repository.ts
// Instancia do repositorio genérico fixada para Task.
// T = Task: todos os métodos retornam tipos Task concretos (nao any).

import { InMemoryRepository } from './in-memory-repository';
import { Task } from '../types/task';

export const taskRepository = new InMemoryRepository<Task>();
