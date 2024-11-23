import { render, screen, fireEvent } from '@testing-library/react';
import Input from './Input';
import { InputType } from './input.types';

jest.mock('@app/store/RootStore', () => ({
  controlsStore: {
    controls: { colorInvertControl: false },
  },
}));

describe('Input Component', () => {
  it('renders text input correctly', () => {
    render(<Input name="textInput" config={{ type: InputType.TEXT }} />);
    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
  });

  it('renders number input with step controls', () => {
    const mockOnChange = jest.fn();
    render(<Input name="numberInput" config={{ type: InputType.NUMBER, min: 0, max: 10, step: 1 }} value={5} onChange={mockOnChange} />);

    const incrementButton = screen.getByRole('button', { name: /increase/i });
    const decrementButton = screen.getByRole('button', { name: /decrease/i });

    fireEvent.click(incrementButton);
    expect(mockOnChange).toHaveBeenCalledWith(6);

    fireEvent.click(decrementButton);
    expect(mockOnChange).toHaveBeenCalledWith(4);
  });

  it('renders range input and displays value', () => {
    render(<Input name="rangeInput" config={{ type: InputType.RANGE, min: 0, max: 100 }} value={50} />);
    const input = screen.getByRole('slider');
    expect(input).toHaveValue('50');
    const display = screen.getByText('50');
    expect(display).toBeInTheDocument();
  });

  it('renders switch input correctly', () => {
    render(<Input name="switchInput" config={{ type: InputType.SWITCH }} value={true} />);
    const switchElement = screen.getByRole('checkbox');
    expect(switchElement).toBeChecked();
  });

  it('handles onChange event', () => {
    const mockOnChange = jest.fn();
    render(<Input name="onChangeTest" config={{ type: InputType.TEXT }} onChange={mockOnChange} />);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'New Value' } });
    expect(mockOnChange).toHaveBeenCalledWith('New Value');
  });
});
