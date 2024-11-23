import { render } from '@testing-library/react';
import ThreeScene from './ThreeScene';

jest.mock('@react-three/fiber', () => ({
  Canvas: ({ children }: any) => <div>{children}</div>,
}));

jest.mock('@react-three/drei', () => ({
  OrbitControls: () => <div>Mocked OrbitControls</div>,
  RoundedBox: ({ children }: any) => <div>{children}</div>,
}));

describe('ThreeScene Component', () => {
  it('renders mesh elements based on pattern', () => {
    const pattern = [
      [
        [1, 2],
        [3, 4],
      ],
    ];
    render(<ThreeScene pattern={pattern} currentFrame={0} />);
    expect(document.querySelectorAll('mesh').length).toBe(4);
  });

  it('renders OrbitControls', () => {
    render(<ThreeScene pattern={[[[1]]]} currentFrame={0} />);
    const div = document.querySelector('div');
    expect(div?.textContent).toContain('Mocked OrbitControls'); // Add null-check with optional chaining
  });
});
