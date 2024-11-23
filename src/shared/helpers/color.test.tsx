import { invertColor } from './color';

describe('Color Helper', () => {
  it('inverts colors correctly', () => {
    expect(invertColor('#FFFFFF')).toBe('#000000');
    expect(invertColor('#000000')).toBe('#FFFFFF');
    expect(invertColor('#FF0000')).toBe('#00FFFF');
  });

  it('throws an error for invalid HEX', () => {
    expect(() => invertColor('invalid')).toThrow('Invalid HEX color.');
  });
});
