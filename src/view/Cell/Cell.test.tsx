import { render } from '@testing-library/react';
import Cell from './Cell';

jest.mock('@app/store/RootStore', () => ({
  __esModule: true, // Ensure ES module compatibility
  default: {
    controlsStore: {
      controls: {
        colorInvertControl: true,
        sizeTilesX: 30,
        sizeTilesY: 30,
      },
    },
  },
}));

jest.mock('@app/shared/helpers/color', () => ({
  invertColor: jest.fn(() => '#00FF00'),
}));

jest.mock('@app/shared/patterns/reference', () => ({
  Colors: ['#FF00FF', '#00FF00', '#0000FF'], // Mock limited colors
}));

describe('Cell Component', () => {
  it('renders valid cell with correct color', () => {
    render(<Cell cell={1} />);
    const cell = document.querySelector('.cell');
    expect(cell).toHaveStyle({ backgroundColor: '#00FF00' }); // inverted neon pink
  });

  it('renders invalid cell for out-of-range values', () => {
    render(<Cell cell={-1} />);
    const cell = document.querySelector('.invalid');
    expect(cell).toBeInTheDocument();
  });

  it('renders Cell component without crashing', () => {
    const { container } = render(<Cell cell={1} />);
    expect(container.firstChild).toHaveClass('cell');
  });
});
