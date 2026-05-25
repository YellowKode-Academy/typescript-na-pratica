import { TaskStatus } from '../types/task';
import { assertNever } from './assert-never';

export function getStatusLabel(status: TaskStatus): string {
  switch (status) {
    case 'pending':
      return 'Pendente';
    case 'in_progress':
      return 'Em andamento';
    case 'done':
      return 'Concluída';
    default:
      return assertNever(status);
  }
}
