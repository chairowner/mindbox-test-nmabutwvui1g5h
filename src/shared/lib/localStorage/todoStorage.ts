import type { Todo } from '@/entities';

const STORAGE_KEY = 'todos';

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
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
};

export const getTodos = (): Todo[] => {
  const str = localStorage.getItem(STORAGE_KEY);
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
