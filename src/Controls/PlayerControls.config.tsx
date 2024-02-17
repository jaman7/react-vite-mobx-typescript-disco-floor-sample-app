import { IFormCell, IFormCellConfig } from 'App/components/formCell/FormCell.model';
import { IDictionary } from 'App/components/select/Select.model';
import { createFormConfig } from 'App/helpers/helpers';
import { IContainerSize } from 'App/store/Store.model';

export const formConfig: IFormCellConfig = {
  patern: { config: { formCellType: 'select', dictName: 'paternDict' } },
  isPlay: { config: { formCellType: 'input-switch' } },
  speed: { config: { formCellType: 'input-range', min: 0, max: 4, step: 0.5 } },
  colorInvertControl: { config: { formCellType: 'input-switch' } },
  countTilesXY: { config: { formCellType: 'input-range', min: 1, max: 16, step: 1 } },
  countPaternFrames: { config: { formCellType: 'input-range', min: 1, max: 100, step: 1 } },
  sizeTilesX: { config: { formCellType: 'input-range', min: 5, max: 100, step: 1 } },
  sizeTilesY: { config: { formCellType: 'input-range', min: 5, max: 100, step: 1 } },
};

export const paternDict = [
  { displayName: 'default', id: 1 },
  { displayName: 'Chessboard', id: 2 },
  { displayName: 'Line up', id: 3 },
  { displayName: 'x-in', id: 4 },
  { displayName: 'random', id: 5 },
];

export const dictionaries: IDictionary = {
  paternDict,
};

const formLayout: number[][] = [[0, 1], [2], [3], [4, 5], [6, 7]];

export const primaryFormConfig = (config: IFormCellConfig, containerSize?: IContainerSize): IFormCell[][] => {
  const { sizeH, sizeV } = containerSize || {};
  const configTmp = config;
  if (configTmp?.sizeTilesY?.config && sizeV) {
    configTmp.sizeTilesY.config.max = sizeV ?? 100;
  }

  if (configTmp?.sizeTilesX?.config && sizeH) {
    configTmp.sizeTilesX.config.max = sizeH ?? 100;
  }

  const data = createFormConfig(configTmp, {
    prefix: `form`,
  });

  const configData: IFormCell[][] = [];
  const item = (el: number[]): IFormCell[] => {
    const items: IFormCell[] = [];
    el.forEach(i => {
      items.push(data[i]);
    });
    return items;
  };
  formLayout?.forEach(el => {
    configData.push(item(el));
  });

  return configData;
};
