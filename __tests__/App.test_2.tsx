import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect.js';
import userEvent from '@testing-library/user-event';
import React from 'react';

import App from '../src/components/App';

describe('Delete and change tasks', () => {
  it('Delete task', async () => {
    render(<App />);

    await userEvent.type(screen.getByTestId('input-task'), 'New task1');
    await userEvent.click(screen.getByText('+'));
    await userEvent.click(screen.getByText('x'));

    expect(screen.queryByDisplayValue('New task')).toBeNull();
  });

  it('Change task', async () => {
    render(<App />);

    await userEvent.type(screen.getByTestId('input-task'), 'New task');
    await userEvent.click(screen.getByText('+'));

    await userEvent.click(screen.getByTestId('button-checked'));
    expect(screen.getByText('New task')).toHaveClass('complite-task');

    await userEvent.click(screen.getByTestId('button-checked'));
    expect(screen.getByText('New task')).toHaveClass('active-task');
  });
});
