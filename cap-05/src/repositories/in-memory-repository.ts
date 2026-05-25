// src/repositories/in-memory-repository.ts
// Repositorio genérico em memória.
// Demonstra: generics com constraint (T extends Entity).

import { Entity } from '../types/entity';

export class InMemoryRepository<T extends Entity> {
  private items: T[] = [];

  findById(id: string): T | null {
    return this.items.find(item => item.id === id) ?? null;
  }

  findAll(): T[] {
    return [...this.items];
  }

  save(item: T): T {
    const existingIndex = this.items.findIndex(i => i.id === item.id);
    if (existingIndex >= 0) {
      this.items[existingIndex] = item;
    } else {
      this.items.push(item);
    }
    return item;
  }

  delete(id: string): boolean {
    const index = this.items.findIndex(item => item.id === id);
    if (index < 0) return false;
    this.items.splice(index, 1);
    return true;
  }
}
