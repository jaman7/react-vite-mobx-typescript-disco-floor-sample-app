import { IInput } from '../input/input.model';
import { InputTypes } from '../input/input.types';
import { IDictType, ISelect, SelectType } from '../select/Select.model';
import { FormCellTypes } from './FormCell.type';

export interface IFormCellConfig {
  [name: string]: IFormCell;
}

export type IFormCell = Omit<ISelect & IInput, 'type'> & {
  config?: IFormCell;
  styleType?: string;
  header?: string;
  headerKey?: string;
  icon?: string;
  formCellType?: FormCellTypes;
  value?: string | number | any | any[];
  type?: SelectType | FormCellTypes | InputTypes;
  formCellClass?: string;
  customClass?: string;
  hidden?: boolean;
  prefix?: string;
  placeholder?: string;
  dictKey?: string;
  dictName?: string;
  name?: string;
  max?: number;
  min?: number;
  step?: number;
  precision?: number;
  readonly?: boolean;
  dictData?: IDictType[];
  isHeader?: boolean;
  [name: string]: any;
};

export const FormCellConfigDefault = (): IFormCell => ({
  step: 1,
  type: 'text',
});
