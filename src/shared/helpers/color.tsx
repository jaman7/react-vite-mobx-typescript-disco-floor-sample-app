export const invertColor = (hex: string, bw = false): string => {
  const validHexRegex = /^#?([0-9A-Fa-f]{6}|[0-9A-Fa-f]{3})$/;
  if (!validHexRegex.test(hex)) {
    throw new Error('Invalid HEX color.');
  }

  let color = hex.startsWith('#') ? hex.slice(1) : hex;

  if (color.length === 3) {
    color = [...color].map((c) => c + c).join('');
  }

  const [r, g, b] = [0, 2, 4].map((i) => parseInt(color.slice(i, i + 2), 16));

  if (bw) {
    return r * 0.299 + g * 0.587 + b * 0.114 > 186 ? '#000000' : '#FFFFFF';
  }

  return `#${[r, g, b].map((c) => (255 - c).toString(16).padStart(2, '0')).join('')}`.toUpperCase();
};
