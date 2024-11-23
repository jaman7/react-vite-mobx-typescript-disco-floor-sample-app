import { render, screen, fireEvent } from '@testing-library/react';
import Button from './Button';

describe('Button Component', () => {
  it('renders children correctly', () => {
    render(<Button>Click Me</Button>);
    expect(screen.getByText('Click Me')).toBeInTheDocument();
  });

  it('triggers handleClick on click', () => {
    const handleClick = jest.fn();
    render(<Button handleClick={handleClick}>Click Me</Button>);
    fireEvent.click(screen.getByText('Click Me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('renders with null children without errors', () => {
    render(<Button>{null}</Button>);
    expect(screen.queryByText(/.+/)).not.toBeInTheDocument();
  });

  it('applies custom className if provided', () => {
    render(<Button className="custom-class">Custom Button</Button>);
    const button = screen.getByText('Custom Button');
    expect(button).toHaveClass('custom-class');
  });

  it('is disabled when `disabled` prop is provided', () => {
    const handleClick = jest.fn();
    render(
      <Button handleClick={handleClick} disabled>
        Disabled Button
      </Button>
    );
    const button = screen.getByText('Disabled Button');
    expect(button).toBeDisabled();
    fireEvent.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('renders a button element by default', () => {
    render(<Button>Default Button</Button>);
    const button = screen.getByText('Default Button');
    expect(button.tagName).toBe('BUTTON');
  });

  it('supports passing additional props to the underlying element', () => {
    render(
      <Button data-testid="custom-button" aria-label="Custom">
        Accessible Button
      </Button>
    );
    const button = screen.getByText('Accessible Button');
    expect(button).toHaveAttribute('data-testid', 'custom-button');
    expect(button).toHaveAttribute('aria-label', 'Custom');
  });
});
