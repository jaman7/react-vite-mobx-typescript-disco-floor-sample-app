import { action, makeObservable, observable } from 'mobx';
import { IContainerSize, defaultContainerSize } from './models/ContainerSize.model';

class ContainerStore {
  containerSize: IContainerSize = defaultContainerSize;

  constructor() {
    makeObservable(this, {
      containerSize: observable,
      setContainerSize: action,
    });
  }

  setContainerSize(containerSize: IContainerSize): void {
    this.containerSize = { ...this.containerSize, ...containerSize };
  }
}

export default ContainerStore;
