import '@testing-library/jest-dom';
import 'jest-canvas-mock'; // Jeśli używasz Canvas (np. dla `Three.js`)

global.ResizeObserver = jest.fn(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

jest.mock('@react-three/fiber', () => ({
  Canvas: ({ children }: any) => '<div>' + children + '</div>',
}));

jest.mock('@react-three/drei', () => ({
  OrbitControls: () => '<div>Mocked OrbitControls</div>',
  RoundedBox: ({ children }: any) => '<div>' + children + '</div>',
}));

jest.mock('@app/store/RootStore', () => ({
  controlsStore: {
    controls: { is3D: false, patern: 1, colorInvertControl: false },
  },
  patternStore: {
    paterns: { 1: [[[1]]] },
    currentFrame: 0,
  },
}));

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key, // Mock translation function
    i18n: {
      changeLanguage: jest.fn(),
    },
  }),
}));

const originalError = console.error;

console.error = (message, ...args) => {
  // if (typeof message === 'string' && (message.includes('CSS') || message.includes('stylesheet') || message.includes('react-i18next'))) {
  return;
  // }
  // originalError(message, ...args); // Log other errors
};
