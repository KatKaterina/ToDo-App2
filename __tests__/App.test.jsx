import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect.js';
import userEvent from '@testing-library/user-event';
import React from 'react';

import App from '../src/components/App';

describe('App component', () => {
  it('App renders', () => {
    render(<App />);

    expect(screen.getByRole('form')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('What needs to be done?')).toBeInTheDocument();
  });

  it('App snapshot', () => {
    const todos = render(<App />);

    expect(todos).toMatchSnapshot();
  });
});

describe('Working with tasks', () => {
  it('Add task', async () => {
    render(<App />);

    expect(screen.getByTestId('input-task')).toBeInTheDocument();
    expect(screen.getByTestId('input-task')).not.toHaveValue('New task');

    await userEvent.type(screen.getByTestId('input-task'), 'New task');
    expect(screen.getByTestId('input-task')).toHaveValue('New task');

    await userEvent.click(screen.getByText('+'));

    expect(screen.getByTestId('input-task')).not.toHaveValue('New task');
    expect(screen.getByText('New task')).toBeInTheDocument();
    expect(screen.getByText('New task')).toHaveClass('active-task');
  });

  it('Delete task', async () => {
    render(<App />);

    await userEvent.type(screen.getByTestId('input-task'), 'New task');
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

  it('Filter tasks', async () => {
    render(<App />);

    await userEvent.type(screen.getByTestId('input-task'), 'Task 1');
    await userEvent.click(screen.getByText('+'));
    await userEvent.click(screen.getByTestId('button-checked'));

    await userEvent.type(screen.getByTestId('input-task'), 'Task 2');
    await userEvent.click(screen.getByText('+'));

    expect(screen.getByText('Task 1')).toBeInTheDocument();
    expect(screen.getByText('Task 2')).toBeInTheDocument();

    await userEvent.click(screen.getByTestId('filter-active'));
    expect(screen.queryByDisplayValue('Task 1')).toBeNull();
    expect(screen.getByText('Task 2')).toBeInTheDocument();

    await userEvent.click(screen.getByTestId('filter-completed'));
    expect(screen.queryByDisplayValue('Task 2')).toBeNull();
    expect(screen.getByText('Task 1')).toBeInTheDocument();

    await userEvent.click(screen.getByTestId('filter-non'));
    expect(screen.getByText('Task 1')).toBeInTheDocument();
    expect(screen.getByText('Task 2')).toBeInTheDocument();
  });
});
