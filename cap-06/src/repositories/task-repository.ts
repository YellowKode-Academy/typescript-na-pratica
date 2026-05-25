import { InMemoryRepository } from './in-memory-repository';
import { Task } from '../types/task';

export const taskRepository = new InMemoryRepository<Task>();
