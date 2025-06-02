import { type FC } from 'react';
import type { Todo, TodoFilter } from '@/entities';
import s from './TodoList.module.scss';
import { TodoListItem } from './components/TodoListItem';

interface TodoListProps {
  todos: Todo[];
  filter: TodoFilter;
  changeHandler: (id: string) => void;
  changeTodo: (id: string, text: string) => void;
}

export const TodoList: FC<TodoListProps> = ({ todos, filter, changeHandler, changeTodo }) => {
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
          <TodoListItem
            key={item.id}
            item={item}
            changeHandler={changeHandler}
            changeTodo={changeTodo}
          />
        );
      })}
    </div>
  );
};
