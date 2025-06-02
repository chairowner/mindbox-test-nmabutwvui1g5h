export type Todo = {
  id: string;
  completed: boolean;
  text: string;
};
export type TodoFilter = 'all' | 'active' | 'completed';
