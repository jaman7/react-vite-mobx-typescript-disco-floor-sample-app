import './i18n';
import { observer } from 'mobx-react';
import { useCallback, useEffect, useState } from 'react';
import rootStore from './store/RootStore';
import useResizeObserver from './shared/hooks/use-resize-observer';
import patterns from './shared/patterns/patterns';
import { createPattern } from './shared/helpers/matrix';
import Loader from './components/loader/loader';
import PlayerControls from './view/playerControls/PlayerControls';
import Board from './view/Board/Board';

const App: React.FC = observer(() => {
  const { patternStore, containerStore } = rootStore;
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timeoutId);
  }, []);

  const onResize = useCallback((target: HTMLDivElement) => {
    containerStore?.setContainerSize?.({ sizeH: Math.round((target?.clientWidth ? target.clientWidth - 16 : 0) / 8) });
  }, []);
  const controlRef = useResizeObserver(onResize);

  patternStore?.setPaterns?.({ ...patterns, 7: createPattern(8, 8, 20) });

  return (
    <div ref={controlRef} className="d-block">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <PlayerControls />
          <Board />
        </>
      )}
    </div>
  );
});

export default App;
