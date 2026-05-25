// src/controllers/task-controller.ts
// Introduzido no cap-04: controllers com tipos de Request e Response.
// Demonstra: mapTaskToResponse, assinaturas claras com interface.

import { Request, Response } from 'express';
import { Task, TaskResponse, CreateTaskRequest, UpdateTaskRequest } from '../types/task';

// Transforma o tipo interno Task (com Date) para o tipo de resposta (com string).
// TypeScript verifica que a transformacao esta completa.
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

// Armazenamento em memória (substituido no cap-09)
const tasks: Task[] = [];

export function createTask(req: Request, res: Response): void {
  const body = req.body as CreateTaskRequest;

  if (!body.title || !body.userId) {
    res.status(400).json({ error: 'title e userId sao obrigatorios' });
    return;
  }

  const task: Task = {
    id: crypto.randomUUID(),
    title: body.title,
    description: body.description ?? null,
    status: 'pending',
    userId: body.userId,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  tasks.push(task);
  res.status(201).json({ data: mapTaskToResponse(task) });
}

export function getTask(req: Request, res: Response): void {
  const task = tasks.find(t => t.id === req.params.id);

  if (!task) {
    res.status(404).json({ error: 'Task nao encontrada' });
    return;
  }

  res.json({ data: mapTaskToResponse(task) });
}

export function listTasks(_req: Request, res: Response): void {
  res.json({ data: tasks.map(mapTaskToResponse) });
}

export function updateTask(req: Request, res: Response): void {
  const task = tasks.find(t => t.id === req.params.id);

  if (!task) {
    res.status(404).json({ error: 'Task nao encontrada' });
    return;
  }

  const body = req.body as UpdateTaskRequest;

  if (body.title !== undefined) task.title = body.title;
  if (body.description !== undefined) task.description = body.description;
  if (body.status !== undefined) task.status = body.status;
  task.updatedAt = new Date();

  res.json({ data: mapTaskToResponse(task) });
}

export function deleteTask(req: Request, res: Response): void {
  const index = tasks.findIndex(t => t.id === req.params.id);

  if (index < 0) {
    res.status(404).json({ error: 'Task nao encontrada' });
    return;
  }

  tasks.splice(index, 1);
  res.status(204).send();
}
