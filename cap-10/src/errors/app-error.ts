// src/errors/app-error.ts
// Cap-10: hierarquia de erros tipados.
//
// AppError: base para erros esperados (4xx).
// Subclasses especializadas: NotFoundError, ValidationError, UnauthorizedError.
//
// Object.setPrototypeOf é necessário quando target é ES5.
// Em ES2015+, é desnecessário, mas inofensivo e torna o código portátil.

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

export class NotFoundError extends AppError {
  constructor(resource: string, id: string) {
    super(`${resource} com id '${id}' nao encontrado`, 404, 'NOT_FOUND');
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}

export class ValidationError extends AppError {
  constructor(message: string) {
    super(message, 400, 'VALIDATION_ERROR');
    Object.setPrototypeOf(this, ValidationError.prototype);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = 'Nao autorizado') {
    super(message, 401, 'UNAUTHORIZED');
    Object.setPrototypeOf(this, UnauthorizedError.prototype);
  }
}
