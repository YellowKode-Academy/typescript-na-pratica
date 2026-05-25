import type { TaskStatus } from './task';

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

export type TaskCountByStatus = Record<TaskStatus, number>;
