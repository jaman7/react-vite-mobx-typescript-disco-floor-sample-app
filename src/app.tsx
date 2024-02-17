import './i18n';
import { inject, observer } from 'mobx-react';
import { useCallback, useEffect, useState } from 'react';
import Board from './board/Board';
import PlayerControls from './Controls/PlayerControls';
import patterns from './data/patterns';
import { makePatern } from './helpers/matrix-generate';
import useResizeObserver from './helpers/use-resize-observer';
import Loader from './loader/loader';
import { IStore } from './store/Store.model';

interface IProps {
  Store?: IStore;
  [name: string]: any;
}

const App = inject('Store')(
  observer((props: IProps) => {
    const { Store } = props || {};
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
      const timeoutId = setTimeout(() => {
        setIsLoading(false);
      }, 500);
      return () => clearTimeout(timeoutId);
    }, []);

    const onResize = useCallback((target: HTMLDivElement) => {
      Store?.setContainerSize?.({ sizeH: (target?.clientWidth ? target.clientWidth - 16 : 0) / 8 });
    }, []);
    const controlRef = useResizeObserver(onResize);

    Store?.setPaterns?.({ ...patterns, 5: makePatern(8, 8, 20) });

    return (
      <>
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
      </>
    );
  })
);

export default App;
