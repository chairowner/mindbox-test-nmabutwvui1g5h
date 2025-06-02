import { useState, type FC } from 'react';
import s from './TodoInput.module.scss';

interface TodoInputProps {
  addTodo: (text: string) => void;
}

export const TodoInput: FC<TodoInputProps> = ({ addTodo }) => {
  const [input, setInput] = useState<string>('');

  const clickHandler = (text: string) => {
    const newValue: string = text.trim();
    if (newValue === '') return;
    addTodo(newValue);
    setInput('');
  };

  return (
    <div className={s.inputWrapper}>
      <button disabled={input.trim() === ''} onClick={() => clickHandler(input)} />
      <input
        data-testid="todo-input"
        placeholder="What needs to be done?"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyUp={(e) => {
          if (e.key === 'Enter') clickHandler(input);
        }}
      />
    </div>
  );
};
