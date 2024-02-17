import { InputTypes } from './input.types';

export interface IInput {
  type?: InputTypes;
  placeholder?: string;
  readonly?: boolean;
  customClass?: string;
  inputClass?: string;
  maxLength?: number;
  min?: number;
  max?: number;
  precision?: number;
  step?: number;
  disableBtnNumbers?: boolean;
  minWidth?: string;
  disabled?: boolean;
  [name: string]: any | any[];
}

export const inputConfigDefault = (): IInput => ({
  placeholder: '',
  precision: 0,
  step: 1,
  type: 'text',
  disableBtnNumbers: false,
});
