import express from 'express';
import { createTask, findTask, listTasks, updateTask, deleteTask } from './services/task-service';
import { Task, TaskResponse, CreateTaskInput, UpdateTaskInput } from './types/task';
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
  const input = req.body as CreateTaskInput;
  const task = createTask(input);
  const response: ApiResponse<TaskResponse> = {
    data: mapTaskToResponse(task),
    timestamp: new Date().toISOString(),
    success: true,
  };
  res.status(201).json(response);
});

app.get('/tasks', (_req, res) => {
  const tasks = listTasks();
  const response: ApiResponse<TaskResponse[]> = {
    data: tasks.map(mapTaskToResponse),
    timestamp: new Date().toISOString(),
    success: true,
  };
  res.json(response);
});

app.get('/tasks/:id', (req, res) => {
  const task = findTask(req.params.id);
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

app.put('/tasks/:id', (req, res) => {
  const input = req.body as UpdateTaskInput;
  const task = updateTask(req.params.id, input);
  if (!task) {
    res.status(404).json({ error: 'Task não encontrada' });
    return;
  }
  res.json({ data: mapTaskToResponse(task), success: true });
});

app.delete('/tasks/:id', (req, res) => {
  const deleted = deleteTask(req.params.id);
  if (!deleted) {
    res.status(404).json({ error: 'Task não encontrada' });
    return;
  }
  res.status(204).send();
});

const PORT = parseInt(process.env.PORT ?? '3000', 10);
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

export { app };
