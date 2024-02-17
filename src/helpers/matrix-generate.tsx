export interface IPaternColor {
  [name: string]: number[][];
}

export const getRandomInt = (max: number): number => Math.floor(Math.random() * max);

export const createArray = (count: number, maxRandom: number): number[][] => {
  const arr: number[][] = [];

  for (let i = 0; i < count; i += 1) {
    arr.push([]);

    for (let j = 0; j < count; j += 1) {
      arr[i].push(getRandomInt(maxRandom));
    }
  }

  return arr;
};

export const makePatern = (size: number, countPatarn: number, maxColorsRandom: number): IPaternColor => {
  const patern: IPaternColor = {};
  for (let i = 0; i < countPatarn; i += 1) {
    patern[i] = createArray(size, maxColorsRandom);
  }
  return patern || {};
};
