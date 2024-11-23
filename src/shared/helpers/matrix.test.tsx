import { createArray, createPattern } from './matrix';

describe('Matrix Helpers', () => {
  it('creates a 2D array with correct dimensions', () => {
    const result = createArray(3, 5);
    expect(result).toHaveLength(3);
    result.forEach((row) => {
      expect(row).toHaveLength(3);
      row.forEach((cell) => expect(cell).toBeLessThanOrEqual(5));
    });
  });

  it('creates a 3D pattern', () => {
    const result = createPattern(4, 2, 10);
    expect(result).toHaveLength(2);
    result.forEach((frame) => {
      expect(frame).toHaveLength(4);
      frame.forEach((row) => expect(row).toHaveLength(4));
    });
  });
});
