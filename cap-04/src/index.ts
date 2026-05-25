import express from 'express';
import { createTask, getTask, listTasks, updateTask, deleteTask } from './controllers/task-controller';

const app = express();
app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', uptime: process.uptime() });
});

app.post('/tasks', createTask);
app.get('/tasks', listTasks);
app.get('/tasks/:id', getTask);
app.put('/tasks/:id', updateTask);
app.delete('/tasks/:id', deleteTask);

const PORT = parseInt(process.env.PORT ?? '3000', 10);
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

export { app };
