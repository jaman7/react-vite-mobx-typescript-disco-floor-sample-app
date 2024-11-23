import { render, screen } from '@testing-library/react';
import Board from './Board';

jest.mock('@app/store/RootStore', () => ({
  __esModule: true,
  default: {
    controlsStore: {
      controls: { is3D: false, patern: 1 },
    },
    patternStore: {
      paterns: {
        1: [
          [
            [1, 2],
            [3, 4],
          ],
        ],
      },
      currentFrame: 0,
    },
  },
}));

jest.mock('../three/ThreeScene', () => ({
  __esModule: true,
  default: () => <div>Mocked Row</div>,
}));

jest.mock('../Row/Row', () => ({
  __esModule: true,
  default: () => <div>Mocked Row</div>,
}));

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  lazy: (fn: any) => {
    const Component = fn();
    return (props: any) => <Component.default {...props} />;
  },
  Suspense: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

describe('Board Component', () => {
  beforeEach(() => {
    jest.resetModules();
    const rootStore = require('@app/store/RootStore').default;
    rootStore.controlsStore.controls.is3D = false;
  });

  it('renders 3D scene when is3D is true', () => {
    const rootStore = require('@app/store/RootStore').default;
    rootStore.controlsStore.controls.is3D = true;

    render(<Board />);
    const rows = screen.getAllByText('Mocked Row');
    expect(rows).toHaveLength(2);
  });

  it('renders 2D grid when is3D is false', () => {
    const rootStore = require('@app/store/RootStore').default;
    rootStore.controlsStore.controls.is3D = false;

    render(<Board />);
    const rows = screen.getAllByText('Mocked Row');
    expect(rows).toHaveLength(2);
  });
});
