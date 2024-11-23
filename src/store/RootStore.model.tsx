import { IContainerStore } from './models/ContainerSize.model';
import { IControlsStore } from './models/Controls.model';
import { IPatternStore } from './models/Pattern.model';

export interface IRootStore {
  controlsStore: IControlsStore;
  patternStore: IPatternStore;
  containerStore: IContainerStore;
}
