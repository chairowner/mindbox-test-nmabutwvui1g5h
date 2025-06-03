import { render, screen } from '@testing-library/react';
import { TodoWidget } from '@/widgets';

describe('TodoWidget', () => {
  it('Добавить новую задачу', () => {
    render(<TodoWidget />);

    const input = screen.getByTestId('todo-input');
    expect(input).toBeInTheDocument();
  });
});
