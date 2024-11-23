import { IFormElementsTypes } from './FormElements.type';
import { InputTypes } from '../shared/input/input.types';
import { IDictType, ISelect, SelectType } from '../shared/select/Select.model';
import { IInput } from '../shared/input/input.model';

export interface IFormElementsConfig {
  [name: string]: IFormElements;
}

export type IFormElements = Omit<ISelect & IInput, 'type'> & {
  config?: IFormElements;
  header?: string;
  formCellType?: IFormElementsTypes;
  value?: string | number | any | any[];
  type?: SelectType | IFormElementsTypes | InputTypes;
  disabled?: boolean;
  hidden?: boolean;
  prefix?: string;
  placeholder?: string;
  dictName?: string;
  name?: string;
  max?: number;
  min?: number;
  step?: number;
  dictData?: IDictType[];
  [name: string]: any;
};

export const FormCellConfigDefault = (): IFormElements => ({
  step: 1,
  type: 'text',
});
