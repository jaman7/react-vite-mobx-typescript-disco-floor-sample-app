export interface IPaternColor {
  [name: string]: number[][];
}

export const getRandomInt = (max: number): number => {
  if (max <= 0) throw new Error('Max must be greater than 0.');
  return Math.floor(Math.random() * max);
};

export const createArray = (size: number, maxRandom: number): number[][] =>
  Array.from({ length: size }, () => Array.from({ length: size }, () => getRandomInt(maxRandom)));

export const createPattern = (size: number, patternCount: number, maxColors: number): number[][][] => {
  return Array.from({ length: patternCount }, () => createArray(size, maxColors));
};
