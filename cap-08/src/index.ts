import express from 'express';
import { createTask, getTask, updateTask } from './controllers/task-controller';
import { requireAuth } from './middlewares/auth-middleware';
import { errorHandler } from './middlewares/error-middleware';

// Necessário para o declaration merging do Express.Request ter efeito
import './types/express-extensions';

const app = express();
app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', uptime: process.uptime() });
});

app.post('/tasks', requireAuth, createTask);
app.get('/tasks/:id', getTask);
app.put('/tasks/:id', requireAuth, updateTask);

app.use(errorHandler);

const PORT = parseInt(process.env.PORT ?? '3000', 10);
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

export { app };
