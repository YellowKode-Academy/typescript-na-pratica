// src/types/api-response.ts
// Envelope genérico de resposta da API.
// Demonstra: interface genérica ApiResponse<T>.

export interface ApiResponse<T> {
  data: T;
  timestamp: string;
  success: boolean;
}

export interface ApiErrorResponse {
  error: string;
  code: string;
  timestamp: string;
  success: false;
}
