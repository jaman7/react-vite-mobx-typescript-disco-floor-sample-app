import { action, computed, makeObservable, observable } from 'mobx';
import { IControls, defaultControls } from './models/Controls.model';

class ControlsStore {
  controls: IControls = defaultControls;

  constructor() {
    makeObservable(this, {
      controls: observable,
      setControls: action,
      frameLength: computed,
    });
  }

  setControls(controls: IControls): void {
    this.controls = controls;
  }

  get frameLength(): number {
    return 1000 / (this.controls?.speed ?? 1);
  }
}

export default ControlsStore;
