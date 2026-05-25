// src/index.ts
// Ponto de entrada da task-api.
// Demonstra coexistencia de TypeScript com allowJs: true.

import express from 'express';
import { getHealthStatus } from './health';

const app = express();

app.use(express.json());

app.get('/health', (_req, res) => {
  res.json(getHealthStatus());
});

const PORT = parseInt(process.env.PORT ?? '3000', 10);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

export { app };
