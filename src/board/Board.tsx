import './Board.scss';

import { IStore } from 'App/store/Store.model';
import { inject, observer } from 'mobx-react';
import { useEffect, useState } from 'react';

import Row from './Row';

interface IProps {
  Store?: IStore;
  [name: string]: any;
}

const Board = inject('Store')(
  observer((props?: IProps) => {
    const { Store: { allPatterns = {}, currentFrame = 0, controls: { patern: selectedPattern = 1 } = {} } = {} } = props || {};

    const [currentPattern, setCurrentPattern] = useState<number[][]>([]);

    useEffect(() => {
      setCurrentPattern(allPatterns?.[selectedPattern]?.[currentFrame] ?? []);
    }, [allPatterns, currentFrame, selectedPattern, currentPattern]);

    return (
      <>
        <div className="dance-floor">
          {currentPattern?.length ? currentPattern?.map((row: number[], i: number) => <Row row={row} key={i} />) : <></>}
        </div>
      </>
    );
  })
);

export default Board;
