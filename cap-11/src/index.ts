import express from 'express';
import { mapTaskToResponse } from './utils/task-utils';
import { createTask } from './services/task-service';

const app = express();
app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', uptime: process.uptime() });
});

app.post('/tasks', (req, res) => {
  const { title, userId, description } = req.body;
  const task = createTask(title, userId, description);
  res.status(201).json({ data: mapTaskToResponse(task), success: true });
});

const PORT = parseInt(process.env.PORT ?? '3000', 10);
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

export { app };
