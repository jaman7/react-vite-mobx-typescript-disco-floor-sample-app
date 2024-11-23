import { IPaternAllColor } from '@app/store/models/Pattern.model';

export const generateWavePattern = (size: number): number[][][] => {
  const frames: number[][][] = [];
  const numFrames = size * 2;

  let baseFrame: number[][] = Array.from({ length: size }, (_, row) => Array.from({ length: size }, (_, col) => ((row + col) % size) + 1));

  for (let i = 0; i < numFrames; i++) {
    const newFrame = baseFrame.map((row, rowIndex) =>
      row.map((_, colIndex) => {
        const shift = i % size;
        const verticalShift = Math.floor(i / size);
        const newRow = (rowIndex + verticalShift) % size;
        const newCol = (colIndex + shift) % size;
        return baseFrame[newRow][newCol];
      })
    );
    frames.push(newFrame);
  }

  return frames;
};

export const generateExpandingRing = (size: number): number[][][] => {
  const frames: number[][][] = [];
  const center = Math.floor(size / 2);
  const numFrames = size;

  for (let frame = 0; frame < numFrames; frame++) {
    const newFrame = Array.from({ length: size }, (_, row) =>
      Array.from({ length: size }, (_, col) => {
        const distance = Math.abs(center - row) + Math.abs(center - col);
        return ((distance + frame) % numFrames) + 1;
      })
    );
    frames.push(newFrame);
  }

  return frames;
};

export const generateRotatingSpiral = (size: number): number[][][] => {
  const frames: number[][][] = [];
  const numFrames = size;

  for (let frame = 0; frame < numFrames; frame++) {
    const grid = Array.from({ length: size }, () => Array(size).fill(0));
    let value = 1 + frame;
    let [row, col] = [0, 0];
    let [dr, dc] = [0, 1];

    for (let i = 0; i < size * size; i++) {
      grid[row][col] = (value % size) + 1;
      value++;
      const [nextRow, nextCol] = [row + dr, col + dc];
      if (nextRow < 0 || nextCol < 0 || nextRow >= size || nextCol >= size || grid[nextRow][nextCol] !== 0) {
        [dr, dc] = [dc, -dr];
      }
      row += dr;
      col += dc;
    }

    frames.push(grid);
  }

  return frames;
};

export const generateCheckerboardFlip = (size: number): number[][][] => {
  const frames: number[][][] = [];
  const numFrames = 2;

  for (let frame = 0; frame < numFrames; frame++) {
    const grid = Array.from({ length: size }, (_, row) =>
      Array.from({ length: size }, (_, col) => ((row + col + frame) % 2 === 0 ? 1 : 2))
    );
    frames.push(grid);
  }

  return frames;
};

export const generateSineWave3D = (size: number): number[][][] => {
  const frames: number[][][] = [];
  const numFrames = 60;

  for (let frame = 0; frame < numFrames; frame++) {
    const wave = Array.from({ length: size }, (_, row) =>
      Array.from({ length: size }, (_, col) => {
        const x = (row / size) * Math.PI * 2;
        const y = (col / size) * Math.PI * 2;
        return Math.abs(Math.sin(x + frame / 10) + Math.cos(y + frame / 10)) * 10; // Wysokość
      })
    );
    frames.push(wave);
  }

  return frames;
};

export const generate3DCheckerboard = (size: number, numFrames: number = 2): number[][][] => {
  return Array.from({ length: numFrames }, (_, frame) =>
    Array.from({ length: size }, (_, row) => Array.from({ length: size }, (_, col) => ((row + col + frame) % 2 === 0 ? 1 : 2)))
  );
};

export const patterns: IPaternAllColor = {
  1: generateWavePattern(8),
  2: generateExpandingRing(8),
  3: generateRotatingSpiral(8),
  4: generateCheckerboardFlip(8),
  5: generateSineWave3D(8),
  6: generate3DCheckerboard(8),
};

export default patterns;
