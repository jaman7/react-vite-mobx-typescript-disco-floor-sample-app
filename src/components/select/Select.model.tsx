export type SelectType = 'Select' | 'Date' | 'DateRange' | 'Input' | 'Empty';
export type SelectMode = 'multiple' | 'tags' | 'default';

export interface IDictType {
  displayName: string;
  id: number | string;
}

export interface IDictionary {
  [name: string]: IDictType[];
}

export interface ISelect {
  formControlName?: string;
  name?: string;
  tooltipTitle?: string;
  labelTitle?: string;
  placeholder?: string;
  readonly?: boolean;
  customClass?: string;
  selectClass?: string;
  formCellClass?: string;
  field?: string;
  type?: SelectType;
  defaultValue?: number;
  dictData?: IDictType[];
  disabled?: boolean;
  [name: string]: any;
}

export const selectConfigDefault = (): ISelect => ({
  size: 'default',
  mode: 'default',
  placeholder: '',
  dictData: [],
  formCellClass: '',
  customClass: '',
});
