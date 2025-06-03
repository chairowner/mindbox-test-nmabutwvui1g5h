import type { Todo } from '@/entities';
import { v4 } from 'uuid';

const STORAGE_TODO_KEY = 'todos';
const STORAGE_FS_KEY = 'welcome';

const isTodo = (obj: unknown): obj is Todo => {
  if (typeof obj !== 'object' || obj === null) return false;
  return (
    'id' in obj &&
    typeof obj.id === 'string' &&
    'completed' in obj &&
    typeof obj.completed === 'boolean' &&
    'text' in obj &&
    typeof obj.text === 'string'
  );
};

const isTodoArray = (arr: unknown): arr is Todo[] => {
  return Array.isArray(arr) && arr.every(isTodo);
};

export const saveTodos = (todos: Todo[]) => {
  localStorage.setItem(STORAGE_TODO_KEY, JSON.stringify(todos));
};

export const getTodos = (): Todo[] => {
  const str = localStorage.getItem(STORAGE_TODO_KEY);
  try {
    if (!str) return [];
    const data = JSON.parse(str);
    if (!isTodoArray(data)) return [];
    return data;
  } catch (error) {
    console.warn(error);
    return [];
  }
};

export const firstStart = (): void => {
  const data: string | null = localStorage.getItem(STORAGE_FS_KEY);
  if (!data) {
    localStorage.setItem(STORAGE_FS_KEY, Date.now().toString());
    saveTodos([
      {
        id: v4(),
        completed: false,
        text: 'Тестовое задание',
      },
      {
        id: v4(),
        completed: true,
        text: 'Прекрасный код',
      },
      {
        id: v4(),
        completed: false,
        text: 'Покрытие тестами',
      },
    ]);
  }
};
