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

describe('Add task', () => {
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
});
