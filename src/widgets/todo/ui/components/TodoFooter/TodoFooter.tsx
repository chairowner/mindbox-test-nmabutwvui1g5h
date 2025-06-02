import classNames from 'classnames';
import { Button } from '@/shared/ui';
import type { Todo, TodoFilter } from '@/entities';
import type { FC } from 'react';
import s from './TodoFooter.module.scss';

interface TodoFooterProps {
  todos: Todo[];
  filter: TodoFilter;
  clearCompleted: () => void;
  changeFilter: (filter: TodoFilter) => void;
}

export const TodoFooter: FC<TodoFooterProps> = ({
  todos,
  filter,
  clearCompleted,
  changeFilter,
}) => {
  const itemsLeft: number = todos.reduce((acc: number, item: Todo) => {
    if (!item.completed) acc++;
    return acc;
  }, 0);

  const printItemLefts = (): string => {
    if (itemsLeft === 0) return "It's all done";
    return `${itemsLeft} item${itemsLeft > 1 ? 's' : ''} left`;
  };

  return (
    <div className={s.footer}>
      <div className={classNames(s.item, s.itemsLeft)}>{printItemLefts()}</div>
      <div className={classNames(s.item, s.filters)}>
        <Button selected={filter === 'all'} onClick={() => changeFilter('all')}>
          All
        </Button>
        <Button selected={filter === 'active'} onClick={() => changeFilter('active')}>
          Active
        </Button>
        <Button selected={filter === 'completed'} onClick={() => changeFilter('completed')}>
          Completed
        </Button>
      </div>
      <div className={s.item}>
        <button
          className={s.clearCompleted}
          onClick={clearCompleted}
          disabled={todos.filter((item: Todo) => item.completed).length === 0}
        >
          Clear completed
        </button>
      </div>
    </div>
  );
};
