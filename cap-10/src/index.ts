import express from 'express';
import { createTask, getTask, listTasks, updateTask, deleteTask } from './services/task-service';
import { errorHandler } from './middlewares/error-middleware';
import { Task, TaskResponse } from './types/task';

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

app.post('/tasks', async (req, res, next) => {
  try {
    const result = await createTask(req.body);
    if (!result.success) {
      res.status(result.error.statusCode).json({
        error: result.error.message,
        code: result.error.code,
        success: false,
      });
      return;
    }
    res.status(201).json({ data: mapTaskToResponse(result.data), success: true });
  } catch (err) {
    next(err);
  }
});

app.get('/tasks', async (_req, res, next) => {
  try {
    const result = await listTasks();
    if (!result.success) {
      res.status(500).json({ error: 'Erro interno', success: false });
      return;
    }
    res.json({ data: result.data.map(mapTaskToResponse), success: true });
  } catch (err) {
    next(err);
  }
});

app.get('/tasks/:id', async (req, res, next) => {
  try {
    const result = await getTask(req.params.id);
    if (!result.success) {
      res.status(result.error.statusCode).json({
        error: result.error.message,
        code: result.error.code,
        success: false,
      });
      return;
    }
    res.json({ data: mapTaskToResponse(result.data), success: true });
  } catch (err) {
    next(err);
  }
});

app.put('/tasks/:id', async (req, res, next) => {
  try {
    const result = await updateTask(req.params.id, req.body);
    if (!result.success) {
      res.status(result.error.statusCode).json({
        error: result.error.message,
        code: result.error.code,
        success: false,
      });
      return;
    }
    res.json({ data: mapTaskToResponse(result.data), success: true });
  } catch (err) {
    next(err);
  }
});

app.delete('/tasks/:id', async (req, res, next) => {
  try {
    const result = await deleteTask(req.params.id);
    if (!result.success) {
      res.status(result.error.statusCode).json({
        error: result.error.message,
        code: result.error.code,
        success: false,
      });
      return;
    }
    res.status(204).send();
  } catch (err) {
    next(err);
  }
});

app.use(errorHandler);

const PORT = parseInt(process.env.PORT ?? '3000', 10);
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

export { app };
