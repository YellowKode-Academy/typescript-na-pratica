// src/types/result.ts
// Cap-07: discriminated union para representar sucesso ou falha.
// O campo 'type' é o discriminante: TypeScript identifica a variante pelo valor literal.

export type Success<T> = {
  type: 'success';
  data: T;
};

export type Failure = {
  type: 'failure';
  error: string;
  code: string;
};

export type Result<T> = Success<T> | Failure;
