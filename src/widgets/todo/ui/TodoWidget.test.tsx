import { fireEvent, render, screen } from '@testing-library/react';
import { TodoWidget } from '@/widgets';

describe('TodoWidget', () => {
  it('Добавить новую задачу', () => {
    render(<TodoWidget />);

    const inp = screen.getByTestId('todo-input');
    const btn = screen.getByTestId('todo-btn');
    const key1 = 'kj78h.9102kj-01./5-k9311----1';
    const key2 = 'kj78h.9102kj-01./5-k9311----2';

    fireEvent.change(inp, { target: { value: key1 } });
    fireEvent.click(btn);
    fireEvent.change(inp, { target: { value: key2 } });
    fireEvent.keyUp(inp, { key: 'Enter' });

    expect(screen.getByText(key1)).toBeInTheDocument();
    expect(screen.getByText(key2)).toBeInTheDocument();
  });

  it('Проверка занесения пустоты', () => {
    render(<TodoWidget />);

    const inp = screen.getByTestId('todo-input');
    const btn = screen.getByTestId('todo-btn');

    fireEvent.click(btn);
    fireEvent.change(inp, { target: { value: '          ' } });
    fireEvent.click(btn);

    expect(screen.queryByTestId('todo-item')).not.toBeInTheDocument();
  });

  it('Очищает завершённые задачи (очистилось не всё)', () => {
    render(
      <TodoWidget
        initialState={[
          { id: '1', text: 'Done', completed: true },
          { id: '2', text: 'Not done', completed: false },
        ]}
      />,
    );
    fireEvent.click(screen.getByText(/clear completed/i));
    expect(screen.queryByText('Done')).not.toBeInTheDocument();
    expect(screen.getByText('Not done')).toBeInTheDocument();
  });

  it('Очищает завершённые задачи (очистилось всё)', () => {
    render(
      <TodoWidget
        initialState={[
          { id: '1', text: 'Done', completed: true },
          { id: '2', text: 'Done too', completed: true },
        ]}
      />,
    );
    fireEvent.click(screen.getByText(/clear completed/i));
    expect(screen.queryByTestId('todo-item')).not.toBeInTheDocument();
  });
});
