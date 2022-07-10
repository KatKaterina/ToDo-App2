import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect.js';
import userEvent from '@testing-library/user-event';
import React from 'react';

import App from '../src/components/App';

describe('Filter tasks', () => {
  it('Filter tasks', async () => {
    render(<App />);

    await userEvent.type(screen.getByTestId('input-task'), 'Task 1');
    await userEvent.click(screen.getByText('+'));
    await userEvent.click(screen.getByTestId('button-checked'));

    await userEvent.type(screen.getByTestId('input-task'), 'Task 2');
    await userEvent.click(screen.getByText('+'));

    expect(screen.getByText('Task 1')).toBeInTheDocument();
    expect(screen.getByText('Task 2')).toBeInTheDocument();

    userEvent.click(screen.getByTestId('filter-active'));
    expect(screen.queryByDisplayValue('Task 1')).toBeNull();
    expect(screen.getByText('Task 2')).toBeInTheDocument();

    userEvent.click(screen.getByTestId('filter-completed'));
    expect(screen.queryByDisplayValue('Task 2')).toBeNull();
    expect(screen.getByText('Task 1')).toBeInTheDocument();

    userEvent.click(screen.getByTestId('filter-non'));
    expect(screen.getByText('Task 1')).toBeInTheDocument();
    expect(screen.getByText('Task 2')).toBeInTheDocument();
  });
});
