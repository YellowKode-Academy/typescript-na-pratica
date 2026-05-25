// src/middlewares/error-middleware.ts
// Cap-08: middleware de erro tipado.
// IMPORTANTE: quatro parametros sao obrigatórios para o Express reconhecer como error middleware.

import { Request, Response, NextFunction } from 'express';

// AppError simples para demonstracao (versao completa no cap-10)
export class AppError extends Error {
  constructor(
    message: string,
    public readonly statusCode: number,
    public readonly code: string
  ) {
    super(message);
    this.name = 'AppError';
    Object.setPrototypeOf(this, AppError.prototype);
  }
}

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  // O quarto parametro é obrigatório, mesmo sem ser usado
  next: NextFunction
): void {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      error: err.message,
      code: err.code,
      success: false,
    });
    return;
  }

  console.error('Erro nao tratado:', err);
  res.status(500).json({
    error: 'Erro interno do servidor',
    code: 'INTERNAL_ERROR',
    success: false,
  });
}
