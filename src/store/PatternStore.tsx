import { action, computed, makeObservable, observable } from 'mobx';
import { IPaternAllColor } from './models/Pattern.model';
import ControlsStore from './ControlsStore';

class PatternStore {
  paterns: IPaternAllColor = {};
  currentFrame: number = 0;
  frameInterval: number | null = 0;

  constructor(private controlsStore: ControlsStore) {
    makeObservable(this, {
      paterns: observable,
      currentFrame: observable,
      setPaterns: action,
      resetFrameInterval: action,
      clearInterval: action,
      framesInPattern: computed,
    });
  }

  setPaterns(paterns: IPaternAllColor): void {
    this.paterns = paterns;
  }

  resetFrameInterval(): void {
    this.clearInterval();
    this.frameInterval = setInterval(() => this.nextFrame(), this.controlsStore.frameLength) as unknown as number;
  }

  clearInterval(): void {
    if (this.frameInterval) clearInterval(this.frameInterval);
    this.frameInterval = null;
  }

  private nextFrame(): void {
    const nextFrame = (this.currentFrame + 1) % this.framesInPattern;
    this.currentFrame = nextFrame;
  }

  get framesInPattern(): number {
    const { patern = 1 } = this.controlsStore.controls;
    return this.paterns[patern]?.length ?? 0;
  }
}

export default PatternStore;
