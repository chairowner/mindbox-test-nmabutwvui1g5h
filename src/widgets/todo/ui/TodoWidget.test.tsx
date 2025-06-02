import { render, screen } from '@testing-library/react';
import { TodoWidget } from '.';

describe('TodoWidget', () => {
  it('Добавить новую задачу', () => {
    render(<TodoWidget />);
    screen.debug();
  });
});
