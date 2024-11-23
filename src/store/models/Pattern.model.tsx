export interface IPaternAllColor {
  [name: string]: number[][][];
}

export interface IPatternStore {
  paterns: IPaternAllColor;
  currentFrame: number;
  setPaterns(paterns: IPaternAllColor): void;
  resetFrameInterval(): void;
  clearInterval(): void;
  framesInPattern: number;
  frameInterval?: number | null;
}
