import { render, screen } from '@testing-library/react';
import CounterDisplay from './counterDisplay';

describe('CounterDisplay', () => {
  it('renders with title and count', () => {
    const title = 'Total Users';
    const count = 10;

    render(<CounterDisplay title={title} count={count} />);

    expect(screen.getByText(`${title}:`)).toBeInTheDocument();
    expect(screen.getByText(count)).toBeInTheDocument();
  });

  it('applies optional className', () => {
    const title = 'Total Users';
    const count = 10;
    const className = 'text-red-500';

    render(<CounterDisplay title={title} count={count} className={className} />);

    const element = screen.getByText(`${title}:`);
    expect(element).toHaveClass('text-gray-500');
    expect(element).toHaveClass(className);
  });
});
