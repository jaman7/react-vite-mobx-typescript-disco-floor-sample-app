import { observer } from 'mobx-react';
import { lazy, Suspense, useMemo } from 'react';
import Row from '../Row/Row';
import rootStore from '@app/store/RootStore';
import Loader from '@app/components/loader/loader';
const ThreeScene = lazy(() => import('../three/ThreeScene'));

const Board: React.FC = observer(() => {
  const { patternStore, controlsStore } = rootStore;
  const { paterns, currentFrame } = patternStore;
  const { patern = 1, is3D = false } = controlsStore.controls;
  const currentPattern = useMemo(() => paterns?.[patern][currentFrame] ?? [], [patern, currentFrame]);

  return (
    <div>
      {is3D ? (
        <Suspense fallback={<Loader />}>
          <ThreeScene pattern={paterns[patern]} currentFrame={currentFrame} />
        </Suspense>
      ) : (
        <div className="dance-floor">{currentPattern?.map((row: number[], i: number) => <Row row={row} key={i} />)}</div>
      )}
    </div>
  );
});

export default Board;
