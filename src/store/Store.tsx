import { action, computed, configure, makeObservable, observable, runInAction } from 'mobx';

import { IContainerSize, IControls, IStore } from './Store.model';
import { IPaternAllColor } from 'interfaces/interfaces';

configure({
  enforceActions: 'never',
});

class Store implements IStore {
  controls: IControls = {
    patern: 1,
    speed: 1,
    isPlay: false,
    pulseControl: false,
    colorInvertControl: false,
    countTilesXY: 8,
    countPaternFrames: 8,
    sizeTilesX: 30,
    sizeTilesY: 30,
  };

  containerSize: IContainerSize = {
    sizeH: 0,
    sizeV: 0,
  };

  currentFrame: number = 0;

  frameInterval: number = 0;

  pulseCount: number = 0;

  paterns: IPaternAllColor = {};

  constructor() {
    makeObservable(this, {
      controls: observable,
      currentFrame: observable,
      frameInterval: observable,
      pulseCount: observable,
      containerSize: observable,
      paterns: observable,
      setControls: action,
      setCurrentFrame: action,
      resetFrameInterval: action,
      clearInterval: action,
      increasePulseCount: action,
      setContainerSize: action,
      returnInterval: action,
      frameLength: computed,
      allPatterns: computed,
    });
  }

  setControls(controls: IControls): void {
    runInAction(() => {
      this.controls = controls;
    });
  }

  setContainerSize(containerSize: IContainerSize): void {
    runInAction(() => {
      this.containerSize = { ...this.containerSize, ...containerSize };
    });
  }

  resetFrameInterval(): void {
    if (this.frameInterval) {
      clearInterval(this.frameInterval);
      this.currentFrame = 0;
    }

    runInAction(() => {
      this.frameInterval = this.returnInterval() as unknown as number;
      this.currentFrame = 0;
    });
  }

  clearInterval(): void {
    runInAction(() => {
      clearInterval(this.frameInterval);
      this.frameInterval = 0;
      this.currentFrame = 0;
    });
  }

  returnInterval(): NodeJS.Timeout {
    return setInterval(() => {
      this.increasePulseCount();
      if (this.currentFrame >= this.framesInPattern - 1) {
        this.setCurrentFrame(0);
      } else {
        this.setCurrentFrame(this.currentFrame + 1);
      }
    }, this.frameLength);
  }

  setCurrentFrame(frameNumber: number): void {
    runInAction(() => {
      this.currentFrame = frameNumber;
    });
  }

  setPaterns(paterns: IPaternAllColor): void {
    runInAction(() => {
      this.paterns = paterns;
    });
  }

  increasePulseCount(): void {
    runInAction(() => {
      this.pulseCount += 1;
    });
  }

  get allPatterns(): IPaternAllColor {
    return this.paterns || {};
  }

  get framesInPattern(): number {
    const { patern = 1 } = this.controls || {};
    const { allPatterns } = this;
    return Object.keys(allPatterns[patern])?.length ?? 0;
  }

  get frameLength(): number {
    return 1000 / (this.controls?.speed ?? 1);
  }
}

export default new Store();
