// src/controllers/task-controller.ts
// Cap-08: controllers com TypedBody e TypedRequest.
// req.body tem tipo concreto, nao any.

import { Response } from 'express';
import { TypedBody, TypedParams, TypedRequest } from '../types/express-extensions';

// Tipos de task definidos localmente neste capitulo para manter o exemplo autocontido.
// Em um projeto real, estes tipos vem de src/types/task.ts.

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

type CreateTaskInput = {
  title: string;
  description?: string;
};

type UpdateTaskInput = {
  title?: string;
  description?: string | null;
  status?: TaskStatus;
};

// Armazenamento em memória
const tasks: Task[] = [];

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

// POST /tasks
// req.body tem tipo CreateTaskInput: acesso com segurança de tipos
export function createTask(
  req: TypedBody<CreateTaskInput>,
  res: Response
): void {
  // currentUser disponível via declaration merging em express-extensions.ts
  if (!req.currentUser) {
    res.status(401).json({ error: 'Nao autenticado' });
    return;
  }

  const input = req.body;

  if (!input.title) {
    res.status(400).json({ error: 'title é obrigatório' });
    return;
  }

  const task: Task = {
    id: crypto.randomUUID(),
    title: input.title,
    description: input.description ?? null,
    status: 'pending',
    userId: req.currentUser.id,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  tasks.push(task);
  res.status(201).json({ data: mapTaskToResponse(task), success: true });
}

// GET /tasks/:id
export function getTask(
  req: TypedParams<{ id: string }>,
  res: Response
): void {
  const task = tasks.find(t => t.id === req.params.id);

  if (!task) {
    res.status(404).json({ error: 'Task nao encontrada' });
    return;
  }

  res.json({ data: mapTaskToResponse(task), success: true });
}

// PUT /tasks/:id
export function updateTask(
  req: TypedRequest<{ id: string }, UpdateTaskInput>,
  res: Response
): void {
  const task = tasks.find(t => t.id === req.params.id);

  if (!task) {
    res.status(404).json({ error: 'Task nao encontrada' });
    return;
  }

  const body = req.body;

  if (body.title !== undefined) task.title = body.title;
  if (body.description !== undefined) task.description = body.description;
  if (body.status !== undefined) task.status = body.status;
  task.updatedAt = new Date();

  res.json({ data: mapTaskToResponse(task), success: true });
}
