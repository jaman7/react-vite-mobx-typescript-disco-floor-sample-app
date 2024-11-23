import { observer } from 'mobx-react';
import { useMemo } from 'react';
import rootStore from '@app/store/RootStore';
import { invertColor } from '@app/shared/helpers/color';
import { Colors } from '@app/shared/patterns/reference';

interface IProps {
  cell?: number;
}

const Cell: React.FC<IProps> = observer(({ cell = 0 }) => {
  const { controlsStore } = rootStore;
  const { controls: { sizeTilesX = 0, sizeTilesY = 0, colorInvertControl = false } = {} } = controlsStore || {};

  const backgroundColor = useMemo(() => {
    if (colorInvertControl) {
      return invertColor(Colors[cell] || '#000000');
    }
    return Colors[cell] || '#FFFFFF';
  }, [cell, colorInvertControl]);

  const style = useMemo(
    () => ({
      backgroundColor,
      width: `${Math.round(sizeTilesX)}px`,
      height: `${Math.round(sizeTilesY)}px`,
    }),
    [backgroundColor, sizeTilesX, sizeTilesY]
  );

  if (cell < 0 || cell >= Colors.length) {
    return (
      <div style={style} className="cell invalid">
        Invalid cell
      </div>
    );
  }

  return <div style={style} className="cell" />;
});

export default Cell;
