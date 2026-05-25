import { Request, Response, NextFunction } from 'express';
import { AppError } from '../errors/app-error';

export function errorHandler(
  error: unknown,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  if (error instanceof AppError) {
    res.status(error.statusCode).json({
      error: error.message,
      code: error.code,
      success: false,
    });
    return;
  }

  if (
    typeof error === 'object' &&
    error !== null &&
    'code' in error &&
    error.code === 'P2002'
  ) {
    res.status(409).json({
      error: 'Recurso já existe',
      code: 'CONFLICT',
      success: false,
    });
    return;
  }

  console.error('Erro nao tratado:', error);
  res.status(500).json({
    error: 'Erro interno do servidor',
    code: 'INTERNAL_ERROR',
    success: false,
  });
}
