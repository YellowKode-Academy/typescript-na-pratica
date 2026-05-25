import express from 'express';
import { taskRepository } from './repositories/task-repository';
import { Task, TaskResponse } from './types/task';
import { ApiResponse } from './types/api-response';

const app = express();
app.use(express.json());

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

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', uptime: process.uptime() });
});

app.post('/tasks', (req, res) => {
  const { title, userId, description } = req.body;
  const task: Task = {
    id: crypto.randomUUID(),
    title,
    description: description ?? null,
    status: 'pending',
    userId,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  const saved = taskRepository.save(task);
  const response: ApiResponse<TaskResponse> = {
    data: mapTaskToResponse(saved),
    timestamp: new Date().toISOString(),
    success: true,
  };
  res.status(201).json(response);
});

app.get('/tasks', (_req, res) => {
  const tasks = taskRepository.findAll();
  const response: ApiResponse<TaskResponse[]> = {
    data: tasks.map(mapTaskToResponse),
    timestamp: new Date().toISOString(),
    success: true,
  };
  res.json(response);
});

app.get('/tasks/:id', (req, res) => {
  const task = taskRepository.findById(req.params.id);
  if (!task) {
    res.status(404).json({ error: 'Task não encontrada' });
    return;
  }
  const response: ApiResponse<TaskResponse> = {
    data: mapTaskToResponse(task),
    timestamp: new Date().toISOString(),
    success: true,
  };
  res.json(response);
});

const PORT = parseInt(process.env.PORT ?? '3000', 10);
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

export { app };
