import express from 'express';
import { createTask, findTaskById, listTasks } from './services/task-service';

const app = express();
app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', uptime: process.uptime() });
});

app.post('/tasks', (req, res) => {
  const { title, userId, description } = req.body;
  const task = createTask(title, userId, description);
  res.status(201).json({ data: task });
});

app.get('/tasks', (_req, res) => {
  res.json({ data: listTasks() });
});

app.get('/tasks/:id', (req, res) => {
  const task = findTaskById(req.params.id);
  if (!task) {
    res.status(404).json({ error: 'Task não encontrada' });
    return;
  }
  res.json({ data: task });
});

const PORT = parseInt(process.env.PORT ?? '3000', 10);
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

export { app };
