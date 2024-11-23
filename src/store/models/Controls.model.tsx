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
  is3D?: boolean;
}

export interface IControlsStore {
  controls: IControls;
  setControls(controls: IControls): void;
  frameLength: number;
}

export const defaultControls: IControls = {
  patern: 1,
  speed: 1,
  isPlay: false,
  pulseControl: false,
  colorInvertControl: false,
  countTilesXY: 8,
  countPaternFrames: 8,
  sizeTilesX: 30,
  sizeTilesY: 30,
  is3D: false,
};
