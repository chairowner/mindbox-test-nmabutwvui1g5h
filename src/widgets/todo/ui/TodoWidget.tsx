import { useState, type FC } from 'react';
import { v4 } from 'uuid';
import type { Todo } from '@/entities';
import { Checkbox } from '@/shared';
import s from './TodoWidget.module.scss';

interface ToDoProps {
  initialState?: Todo[];
}

export const TodoWidget: FC<ToDoProps> = ({ initialState = [] }) => {
  const [input, setInput] = useState<string>('');
  const [todo, setTodo] = useState<Todo[]>(initialState);

  const addTodo = (text: string) => {
    const newValue: string = text.trim();
    if (newValue === '') return;
    setTodo([
      ...todo,
      {
        id: v4(),
        state: false,
        text: newValue,
      },
    ]);
    setInput('');
  };

  return (
    <div className={s.container}>
      <div className={s.inputWrapper}>
        <button disabled={input.trim() === ''} onClick={() => addTodo(input)} />
        <input
          placeholder="What needs to be done?"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyUp={(e) => {
            if (e.key === 'Enter') {
              addTodo(input);
            }
          }}
        />
      </div>
      <div className={s.list}>
        {todo.map((item: Todo) => (
          <div className={s.item} key={item.id} aria-disabled={item.state}>
            <Checkbox checked={item.state} onChange={() => {}} />
            <span>{item.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
