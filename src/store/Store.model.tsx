import { IPaternAllColor } from 'App/interfaces/interfaces';

export interface IControls {
  patern?: number;
  speed?: number;
  isPlay?: boolean;
  pulseControl?: boolean;
  colorInvertControl?: boolean;
  countTilesXY?: number;
  countPaternFrames?: number;
  sizeTilesX?: number;
  sizeTilesY?: number;
}

export interface IContainerSize {
  sizeH?: number;
  sizeV?: number;
}

export interface IStore {
  controls?: IControls;
  currentFrame?: number;
  frameInterval?: number;
  pulseCount?: number;
  controlElHeight?: number;
  containerSize?: IContainerSize;
  paterns?: IPaternAllColor;
  setControls?: (controls: IControls) => void;
  setCurrentFrame?: (frameNumber: number) => void;
  setContainerSize?: (containerSize: IContainerSize) => void;
  setPaterns?: (paterns: IPaternAllColor) => void;
  resetFrameInterval?: () => void;
  clearInterval?: () => void;
  increasePulseCount?: () => void;
  readonly framesInPattern?: number;
  readonly frameLength?: number;
  readonly allPatterns?: IPaternAllColor;
  returnInterval?: () => any;
}
