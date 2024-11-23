import ContainerStore from './ContainerStore';
import ControlsStore from './ControlsStore';
import PatternStore from './PatternStore';

describe('MobX Stores', () => {
  it('ContainerStore updates size', () => {
    const store = new ContainerStore();
    store.setContainerSize({ sizeH: 100, sizeV: 200 });
    expect(store.containerSize).toEqual({ sizeH: 100, sizeV: 200 });
  });

  it('ControlsStore calculates frame length correctly', () => {
    const store = new ControlsStore();
    store.setControls({ speed: 2 });
    expect(store.frameLength).toBe(500);
  });

  it('PatternStore updates frame interval', () => {
    const controlsStore = new ControlsStore();
    const store = new PatternStore(controlsStore);
    store.setPaterns({ 1: [[[]]] });
    store.resetFrameInterval();
    expect(store.frameInterval).not.toBeNull();
    store.clearInterval();
    expect(store.frameInterval).toBeNull();
  });
});
