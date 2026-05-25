// src/health.ts
// Cap-12: reutilizado do cap-02 sem alteracoes.

export function getHealthStatus(): { status: string; uptime: number } {
  return {
    status: 'ok',
    uptime: process.uptime(),
  };
}
