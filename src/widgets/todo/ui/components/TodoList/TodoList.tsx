import { type FC } from 'react';
import type { Todo, TodoFilter } from '@/entities';
import { Checkbox } from '@/shared/ui';
import s from './TodoList.module.scss';

interface TodoListProps {
  todos: Todo[];
  filter: TodoFilter;
  changeHandler: (itemId: string) => void;
}

export const TodoList: FC<TodoListProps> = ({ todos, filter, changeHandler }) => {
  return (
    <div className={s.list}>
      {todos.map((item: Todo) => {
        if (
          (filter === 'active' && item.completed) ||
          (filter === 'completed' && !item.completed)
        ) {
          return null;
        }
        return (
          <div className={s.item} key={item.id} aria-disabled={item.completed}>
            <div className={s.checkbox}>
              <Checkbox checked={item.completed} onChange={() => changeHandler(item.id)} />
            </div>
            <span className={s.text}>{item.text}</span>
          </div>
        );
      })}
    </div>
  );
};
