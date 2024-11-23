import ControlsStore from './ControlsStore';
import PatternStore from './PatternStore';
import ContainerStore from './ContainerStore';
import { IRootStore } from './RootStore.model';

class RootStore implements IRootStore {
  controlsStore: ControlsStore;
  patternStore: PatternStore;
  containerStore: ContainerStore;

  constructor() {
    this.controlsStore = new ControlsStore();
    this.patternStore = new PatternStore(this.controlsStore);
    this.containerStore = new ContainerStore();
  }
}

const rootStore = new RootStore();
export default rootStore;
