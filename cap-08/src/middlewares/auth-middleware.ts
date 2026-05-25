// src/middlewares/auth-middleware.ts
// Cap-08: middleware de autenticacao com tipos.
// Demonstra: adicionar req.currentUser via declaration merging.

import { Request, Response, NextFunction } from 'express';
import { User } from '../types/user';

// Simulacao de busca de usuario por token (substitua pela implementacao real)
function findUserByToken(token: string): User | null {
  // Em producao: validar JWT e buscar usuario no banco
  if (token === 'valid-token') {
    return { id: 'user-1', email: 'dev@example.com', name: 'Dev' };
  }
  return null;
}

export async function requireAuth(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const token = req.headers.authorization?.replace('Bearer ', '');

  if (!token) {
    res.status(401).json({ error: 'Token nao fornecido' });
    return;
  }

  const user = findUserByToken(token);

  if (user === null) {
    res.status(401).json({ error: 'Token inválido' });
    return;
  }

  // TypeScript aceita req.currentUser porque declaramos o campo via declaration merging
  req.currentUser = user;
  next();
}
