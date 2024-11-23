import { render } from '@testing-library/react';
import Loader from './loader';

describe('Loader Component', () => {
  it('renders loader without errors', () => {
    const { container } = render(<Loader />);
    expect(container.querySelector('.container-react-logo')).toBeInTheDocument();
  });
});
