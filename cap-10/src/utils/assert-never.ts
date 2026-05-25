// src/utils/assert-never.ts
// Cap-10: garantia de exaustividade para discriminated unions.
//
// Uso no switch:
//   default:
//     return assertNever(status);
//
// Se um novo valor for adicionado ao union e o switch nao for atualizado,
// o TypeScript marca o assertNever(status) como erro de tipo.
// O parametro 'value' teria tipo do novo valor, nao 'never'.

export function assertNever(value: never, message?: string): never {
  throw new Error(
    message ?? `Valor inesperado: ${JSON.stringify(value)}`
  );
}
