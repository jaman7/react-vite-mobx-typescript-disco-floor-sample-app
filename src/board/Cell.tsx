import './Cell.scss';

import { Colors } from 'App/data/reference';
import { invertColor } from 'App/helpers/helpers';
import { IStore } from 'App/store/Store.model';
import { inject, observer } from 'mobx-react';
import { useEffect, useState } from 'react';

interface IProps {
  cell?: number;
  Store?: IStore;
}

const Cell = inject('Store')(
  observer((props: IProps) => {
    const { cell = 0, Store: { controls: { sizeTilesX = 0, sizeTilesY = 0, colorInvertControl = false } = {} } = {} } = props || {};

    const [backgroundColor, setBackgroundColor] = useState<string>('');

    useEffect(() => {
      switch (true) {
        case colorInvertControl:
          setBackgroundColor(invertColor(Colors?.[cell]));
          break;

        default:
          setBackgroundColor(Colors?.[cell]);
          break;
      }
    }, [backgroundColor, cell, colorInvertControl]);

    const style = { backgroundColor, width: `${sizeTilesX}px`, height: `${sizeTilesY}px` };
    return (
      <>
        <div style={style} className="cell"></div>
      </>
    );
  })
);

export default Cell;
