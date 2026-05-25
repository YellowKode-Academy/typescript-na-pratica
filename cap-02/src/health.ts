// src/health.ts
// Primeiro arquivo TypeScript do projeto.
// Demonstra anotacao de tipo de retorno explícita.

export function getHealthStatus(): { status: string; uptime: number } {
  return {
    status: 'ok',
    uptime: process.uptime(),
  };
}
