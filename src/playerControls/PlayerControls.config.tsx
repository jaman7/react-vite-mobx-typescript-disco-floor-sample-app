import { IFormElements, IFormElementsConfig } from 'components/formElements/FormElements.model';
import { IDictionary } from 'components/select/Select.model';
import { createConfigForm } from 'helpers/helpers';
import { IContainerSize } from 'store/Store.model';

export const formConfig: IFormElementsConfig = {
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

export const primaryFormConfig = (config: IFormElementsConfig, containerSize?: IContainerSize): IFormElements[][] => {
  const { sizeH, sizeV } = containerSize || {};
  const configTmp = config;
  if (configTmp?.sizeTilesY?.config && sizeV) {
    configTmp.sizeTilesY.config.max = sizeV ?? 100;
  }

  if (configTmp?.sizeTilesX?.config && sizeH) {
    configTmp.sizeTilesX.config.max = sizeH ?? 100;
  }

  const data = createConfigForm(configTmp, {
    prefix: `form`,
  });

  const configData: IFormElements[][] = [];
  const item = (el: number[]): IFormElements[] => {
    const items: IFormElements[] = [];
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
