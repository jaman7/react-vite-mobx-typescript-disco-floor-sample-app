import './Row.scss';

import Cell from './Cell';

interface IProps {
  row?: number[];
  [name: string]: any | any[];
}

const Row = (props: IProps) => {
  const cell = () => {
    const { row } = props || {};
    return row?.length && row?.map((item, i) => <Cell cell={item} key={i} />);
  };

  return <div className="dance-floor__row">{cell()}</div>;
};

export default Row;
