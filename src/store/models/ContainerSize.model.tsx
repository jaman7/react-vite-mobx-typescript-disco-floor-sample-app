export interface IContainerSize {
  sizeH?: number;
  sizeV?: number;
}

export interface IContainerStore {
  containerSize: IContainerSize;
  setContainerSize(containerSize: IContainerSize): void;
}

export const defaultContainerSize: IContainerSize = {
  sizeH: 0,
  sizeV: 0,
};
