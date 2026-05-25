// src/controllers/task-controller.ts
// Cap-07: controllers com tratamento via Result<T>.
// Narrowing no campo 'type' do discriminated union.

import { Request, Response } from 'express';
import { Task, TaskResponse, CreateTaskInput, UpdateTaskInput } from '../types/task';
import { createTask, findTask, listTasks, updateTask, deleteTask } from '../services/task-service';

type IdParams = { id: string };

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

export function createTaskHandler(req: Request, res: Response): void {
  const input = req.body as CreateTaskInput;
  const result = createTask(input);

  if (result.type === 'failure') {
    res.status(400).json({ error: result.error, code: result.code });
    return;
  }

  res.status(201).json({ data: mapTaskToResponse(result.data) });
}

export function getTaskHandler(req: Request<IdParams>, res: Response): void {
  const result = findTask(req.params.id);

  if (result.type === 'failure') {
    res.status(404).json({ error: result.error, code: result.code });
    return;
  }

  // result.data é Task aqui: narrowing pelo campo 'type'
  res.json({ data: mapTaskToResponse(result.data) });
}

export function listTasksHandler(_req: Request, res: Response): void {
  const result = listTasks();

  if (result.type === 'failure') {
    res.status(500).json({ error: result.error });
    return;
  }

  res.json({ data: result.data.map(mapTaskToResponse) });
}

export function updateTaskHandler(req: Request<IdParams>, res: Response): void {
  const input = req.body as UpdateTaskInput;
  const result = updateTask(req.params.id, input);

  if (result.type === 'failure') {
    res.status(404).json({ error: result.error, code: result.code });
    return;
  }

  res.json({ data: mapTaskToResponse(result.data) });
}

export function deleteTaskHandler(req: Request<IdParams>, res: Response): void {
  const result = deleteTask(req.params.id);

  if (result.type === 'failure') {
    res.status(404).json({ error: result.error, code: result.code });
    return;
  }

  res.status(204).send();
}
