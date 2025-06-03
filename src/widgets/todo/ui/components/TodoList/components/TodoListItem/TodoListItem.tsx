import { useState, useRef, type FC, useEffect } from 'react';
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
  const spanRef = useRef<HTMLSpanElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [cursorPos, setCursorPos] = useState<number | null>(null);

  const handleSpanClick = ({ clientX, clientY }: { clientX: number; clientY: number }) => {
    if (item.completed) return;

    const span = spanRef.current;
    if (!span) return;

    const range = document.createRange();

    let offset = 0;

    // Получаем позицию текста по координатам мыши
    for (let i = 0; i < span.childNodes.length; i++) {
      const node = span.childNodes[i];
      range.selectNodeContents(node);
      range.collapse(true);

      range.setStart(node, 0);
      range.setEnd(node, node.textContent?.length ?? 0);

      const rects = range.getClientRects();
      for (let j = 0; j < rects.length; j++) {
        const rect = rects[j];
        if (
          clientX >= rect.left &&
          clientX <= rect.right &&
          clientY >= rect.top &&
          clientY <= rect.bottom
        ) {
          const relativeX = clientX - rect.left;
          const avgCharWidth = rect.width / (node.textContent?.length ?? 1);
          const charIndex = Math.floor(relativeX / avgCharWidth);
          offset += charIndex;
          break;
        }
      }
    }

    setEdit(item.text);
    setCursorPos(offset);
  };

  const saveEdit = useRef(
    debounce((text: string) => {
      const newValue = text.trim();
      if (newValue === '') return;
      changeTodo(item.id, newValue);
    }, 500),
  );

  const onSave = () => {
    if (edit === null) return;

    const trimmed = edit.trim();
    if (trimmed !== '' && trimmed !== item.text) {
      saveEdit.current(trimmed); // debounce
    }

    setEdit(null);
  };

  const onKeyUpHandler = (key: string) => {
    if (key === 'Enter') {
      saveEdit.current.flush(edit!);
      onSave();
    }
  };

  useEffect(() => {
    if (edit !== null && inputRef.current && cursorPos !== null) {
      inputRef.current.setSelectionRange(cursorPos, cursorPos);
      setCursorPos(null); // Сбросим после установки
    }
  }, [edit, cursorPos]);

  return (
    <div className={s.item} aria-disabled={item.completed} data-testid="todo-item">
      <div className={s.checkbox}>
        <Checkbox checked={item.completed} onChange={() => changeHandler(item.id)} />
      </div>
      {edit !== null ? (
        <input
          ref={inputRef}
          className={s.text}
          type="text"
          value={edit}
          onChange={(e) => setEdit(e.target.value)}
          onKeyUp={(e) => onKeyUpHandler(e.key)}
          onBlur={() => onKeyUpHandler('Enter')}
          autoFocus
        />
      ) : (
        <span
          ref={spanRef}
          className={s.text}
          onClick={(e) => handleSpanClick({ clientX: e.clientX, clientY: e.clientY })}
        >
          {item.text}
        </span>
      )}
    </div>
  );
};
