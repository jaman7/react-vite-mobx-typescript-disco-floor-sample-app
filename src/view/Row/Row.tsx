import { memo } from 'react';
import Cell from '../Cell/Cell';

interface IProps {
  row?: number[];
}

const Row: React.FC<IProps> = memo(({ row }) => {
  if (!row || row.length === 0) {
    return <div className="dance-floor__row empty">No cells available</div>;
  }

  return (
    <div className="dance-floor__row">
      {row.map((item, index) => (
        <Cell cell={item} key={index} />
      ))}
    </div>
  );
});

export default Row;
