import { type FC, useCallback, useMemo, useRef } from 'react';
import type { Todo, TodoFilter } from '@/entities';
import { VariableSizeList as List, type ListChildComponentProps } from 'react-window';
import s from './TodoList.module.scss';
import { TodoListItem } from './components';

interface TodoListProps {
  todos: Todo[];
  filter: TodoFilter;
  changeHandler: (id: string) => void;
  changeTodo: (id: string, text: string) => void;
}

export const TodoList: FC<TodoListProps> = ({ todos, filter, changeHandler, changeTodo }) => {
  const listRef = useRef<List>(null);
  const filteredTodos = useMemo(() => {
    return todos.filter((item) =>
      filter === 'active' ? !item.completed : filter === 'completed' ? item.completed : true,
    );
  }, [todos, filter]);

  const getItemSize = (index: number) => {
    const text = filteredTodos[index].text;
    const lines = Math.ceil(text.length / 50);
    return Math.max(60, lines * 60);
  };

  const Row = useCallback(
    ({ index, style }: ListChildComponentProps) => {
      const item = filteredTodos[index];
      return (
        <div style={style}>
          <TodoListItem item={item} changeHandler={changeHandler} changeTodo={changeTodo} />
        </div>
      );
    },
    [filteredTodos, changeHandler, changeTodo],
  );

  return (
    <List
      ref={listRef}
      className={s.list}
      height={300}
      itemCount={filteredTodos.length}
      itemSize={getItemSize}
      width="100%"
    >
      {Row}
    </List>
  );
};
