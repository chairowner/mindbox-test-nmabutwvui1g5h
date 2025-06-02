import { useState, useEffect, useRef, type FC } from 'react';
import { Checkbox } from '@/shared/ui';
import type { Todo } from '@/entities';
import s from './TodoListItem.module.scss';
import { debounce } from '@/shared/lib';

interface TodoListItemProps {
  item: Todo;
  changeHandler: (id: string) => void;
  changeTodo: (id: string, text: string) => void;
}

export const TodoListItem: FC<TodoListItemProps> = ({ item, changeHandler, changeTodo }) => {
  const [edit, setEdit] = useState<string | null>(null);

  const saveEdit = useRef(
    debounce((text: string) => {
      const newValue = text.trim();
      if (newValue === '') return;
      changeTodo(item.id, newValue);
    }, 500),
  );

  useEffect(() => {
    if (edit === null) return;
    saveEdit.current(edit);
  }, [edit]);

  const onKeyUpHandler = (key: string) => {
    if (key === 'Enter') {
      if (edit !== null) {
        saveEdit.current.flush(edit);
        setEdit(null);
      }
    }
  };

  return (
    <div className={s.item} aria-disabled={item.completed}>
      <div className={s.checkbox}>
        <Checkbox checked={item.completed} onChange={() => changeHandler(item.id)} />
      </div>
      {edit !== null ? (
        <input
          className={s.text}
          type="text"
          value={edit}
          onChange={(e) => setEdit(e.target.value)}
          onKeyUp={(e) => onKeyUpHandler(e.key)}
          autoFocus
        />
      ) : (
        <span className={s.text} onClick={() => setEdit(item.text)}>
          {item.text}
        </span>
      )}
    </div>
  );
};
