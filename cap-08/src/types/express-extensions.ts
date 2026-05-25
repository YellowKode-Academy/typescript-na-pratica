// src/types/express-extensions.ts
// Cap-08: extensoes de tipo para Express.
//
// 1. TypedBody, TypedParams, TypedRequest: wrappers dos generics de Request
//    para evitar repetir os quatro parametros em cada handler.
//
// 2. Declaration merging em Express.Request: adiciona currentUser
//    sem modificar o pacote @types/express.

import { Request } from 'express';
import { User } from './user';

// Request com body tipado.
// Genericos de Request<Params, ResBody, ReqBody, Query, Locals>:
//   - Params: {} = sem params de rota especificos
//   - ResBody: unknown = Express nao tipa a resposta via Request
//   - ReqBody: T = tipo do corpo que queremos validar
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TypedBody<T> = Request<Record<string, string>, unknown, T>;

// Request com params tipados
export type TypedParams<P extends Record<string, string>> = Request<P>;

// Request com body e params tipados
export type TypedRequest<
  P extends Record<string, string> = Record<string, string>,
  B = unknown
> = Request<P, unknown, B>;

// Declaration merging: estende Express.Request globalmente
// Depois disso, req.currentUser tem tipo User | undefined em todos os handlers
declare global {
  namespace Express {
    interface Request {
      currentUser?: User;
    }
  }
}
