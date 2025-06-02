import { useEffect, useRef, useState, type FC } from 'react';
import { v4 } from 'uuid';
import { debounce, saveTodos } from '@/shared/lib';
import type { Todo, TodoFilter } from '@/entities';
import { TodoFooter, TodoInput, TodoList } from './components';
import s from './TodoWidget.module.scss';

interface TodoWidgetProps {
  initialState?: Todo[];
}

export const TodoWidget: FC<TodoWidgetProps> = ({ initialState = [] }) => {
  const [todos, setTodos] = useState<Todo[]>(initialState);
  const [filter, setFilter] = useState<TodoFilter>('all');
  const didMount = useRef<boolean>(false);
  const debouncedSaveRef = useRef<(todos: Todo[]) => void>(null);

  const changeFilter = (filter: TodoFilter) => {
    setFilter(filter);
  };

  const addTodo = (text: string) => {
    setTodos([
      ...todos,
      {
        id: v4(),
        completed: false,
        text: text,
      },
    ]);
  };

  const changeTodo = (id: string, text: string) => {
    setTodos((prev) => prev.map((item) => (item.id === id ? { ...item, text } : item)));
  };

  const clearCompleted = () => {
    setTodos((todo) => todo.filter((item) => !item.completed));
  };

  const changeHandler = (id: string) => {
    setTodos((prev) =>
      prev.map((item) => (item.id === id ? { ...item, completed: !item.completed } : item)),
    );
  };

  useEffect(() => {
    debouncedSaveRef.current = debounce((todos: Todo[]) => saveTodos(todos), 500);
  }, []);

  useEffect(() => {
    if (!didMount.current) {
      didMount.current = true;
      return;
    }
    debouncedSaveRef.current?.(todos);
  }, [todos]);

  return (
    <div className={s.wrapper}>
      <div className={s.container}>
        <TodoInput addTodo={addTodo} />
        <TodoList
          todos={todos}
          filter={filter}
          changeHandler={changeHandler}
          changeTodo={changeTodo}
        />
        <TodoFooter
          todos={todos}
          filter={filter}
          clearCompleted={clearCompleted}
          changeFilter={changeFilter}
        />
      </div>
    </div>
  );
};
