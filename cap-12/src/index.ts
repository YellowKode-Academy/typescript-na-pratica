// src/index.ts
// Cap-12: versao final do ponto de entrada.
// Usa process.env.PORT para compatibilidade com Railway.

import express from 'express';
import { getHealthStatus } from './health';

const app = express();

app.use(express.json());

// Health check - testado no curl final do cap-12
app.get('/health', (_req, res) => {
  res.json(getHealthStatus());
});

// Rotas de tasks (defina o router em src/routes/tasks.ts no projeto real)
// app.use('/tasks', tasksRouter);

// Error middleware deve ser o último middleware registrado
// app.use(errorHandler);

// Railway injeta PORT automaticamente; fallback para 3000 em dev
const PORT = parseInt(process.env.PORT ?? '3000', 10);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

export { app };
