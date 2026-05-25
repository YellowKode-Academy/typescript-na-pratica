import express from 'express';
import { PrismaTaskRepository } from './repositories/prisma-task-repository';
import { Task } from '@prisma/client';

const app = express();
app.use(express.json());

const repository = new PrismaTaskRepository();

type TaskResponse = Omit<Task, 'createdAt' | 'updatedAt'> & {
  createdAt: string;
  updatedAt: string;
};

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

app.get('/tasks', async (_req, res, next) => {
  try {
    const tasks = await repository.findAll();
    res.json({ data: tasks.map(mapTaskToResponse), success: true });
  } catch (err) {
    next(err);
  }
});

app.get('/tasks/:id', async (req, res, next) => {
  try {
    const task = await repository.findById(req.params.id);
    if (!task) {
      res.status(404).json({ error: 'Task não encontrada' });
      return;
    }
    res.json({ data: mapTaskToResponse(task), success: true });
  } catch (err) {
    next(err);
  }
});

app.post('/tasks', async (req, res, next) => {
  try {
    const task = await repository.create(req.body);
    res.status(201).json({ data: mapTaskToResponse(task), success: true });
  } catch (err) {
    next(err);
  }
});

app.put('/tasks/:id', async (req, res, next) => {
  try {
    const task = await repository.update(req.params.id, req.body);
    res.json({ data: mapTaskToResponse(task), success: true });
  } catch (err) {
    next(err);
  }
});

app.delete('/tasks/:id', async (req, res, next) => {
  try {
    await repository.delete(req.params.id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
});

const PORT = parseInt(process.env.PORT ?? '3000', 10);
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

export { app };
