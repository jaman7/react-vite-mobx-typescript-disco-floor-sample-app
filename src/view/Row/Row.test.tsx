import { render } from '@testing-library/react';
import Row from './Row';

jest.mock('../Cell/Cell', () => {
  return {
    __esModule: true,
    default: () => <div className="cell">Mocked Cell</div>, // For default export
  };
});

describe('Row Component', () => {
  it('renders a simple message', () => {
    const { container } = render(<Row row={[]} />);
    expect(container.textContent).toContain('No cells available');
  });

  it('renders cells for given row', () => {
    render(<Row row={[1, 2, 3]} />);
    expect(document.querySelectorAll('.cell').length).toBe(3);
  });

  it('renders message when no row data is available', () => {
    render(<Row row={[]} />);
    expect(document.querySelector('.empty')).toBeInTheDocument();
  });
});
