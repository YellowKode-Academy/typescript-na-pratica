import express from 'express';
import { createTaskHandler, getTaskHandler, listTasksHandler, updateTaskHandler, deleteTaskHandler } from './controllers/task-controller';

const app = express();
app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', uptime: process.uptime() });
});

app.post('/tasks', createTaskHandler);
app.get('/tasks', listTasksHandler);
app.get('/tasks/:id', getTaskHandler);
app.put('/tasks/:id', updateTaskHandler);
app.delete('/tasks/:id', deleteTaskHandler);

const PORT = parseInt(process.env.PORT ?? '3000', 10);
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

export { app };
