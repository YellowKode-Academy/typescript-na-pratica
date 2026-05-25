// src/lib/prisma.ts
// Cap-09: singleton do PrismaClient.
//
// globalThis é usado para evitar múltiplas instâncias durante o hot reload do tsx.
// Em producao, o módulo só é carregado uma vez e o singleton funciona naturalmente.
// Cada instância do PrismaClient abre um pool de conexoes: nunca crie por requisicao.

import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query'] : [],
  });

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}
