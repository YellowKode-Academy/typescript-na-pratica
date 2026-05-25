// src/types/result.ts
// Cap-10: versao melhorada do Result<T, E> com funcoes helper ok() e fail().
//
// Diferenca do cap-07:
// - Campo 'success' (boolean) em vez de 'type' (string)
// - Funcoes helper ok() e fail() para construir resultados
// - Parametro de erro genérico E (default AppError)

import { AppError } from '../errors/app-error';

export type Result<T, E = AppError> =
  | { success: true; data: T }
  | { success: false; error: E };

export function ok<T>(data: T): Result<T, never> {
  return { success: true, data };
}

export function fail<E = AppError>(error: E): Result<never, E> {
  return { success: false, error };
}
