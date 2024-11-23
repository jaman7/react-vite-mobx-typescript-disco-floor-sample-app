import {
  generateWavePattern,
  generateExpandingRing,
  generateRotatingSpiral,
  generateCheckerboardFlip,
  generateSineWave3D,
  generate3DCheckerboard,
} from './patterns';

describe('Patterns', () => {
  it('generates a wave pattern with correct dimensions', () => {
    const result = generateWavePattern(4);
    expect(result).toHaveLength(8); // 4 * 2 frames
    result.forEach((frame) => {
      expect(frame).toHaveLength(4);
      frame.forEach((row) => expect(row).toHaveLength(4));
    });
  });

  it('generates an expanding ring pattern', () => {
    const result = generateExpandingRing(5);
    expect(result).toHaveLength(5);
  });

  it('generates a rotating spiral pattern', () => {
    const result = generateRotatingSpiral(3);
    expect(result).toHaveLength(3);
  });

  it('generates a checkerboard flip pattern', () => {
    const result = generateCheckerboardFlip(4);
    expect(result).toHaveLength(2); // Flip has only 2 frames
  });

  it('generates a sine wave 3D pattern', () => {
    const result = generateSineWave3D(6);
    expect(result).toHaveLength(60);
  });

  it('generates a 3D checkerboard pattern', () => {
    const result = generate3DCheckerboard(5);
    expect(result).toHaveLength(2);
  });
});
