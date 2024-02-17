import { useEffect, useRef } from 'react';
import { isEqual } from 'lodash';
import { IFormCell } from '../components/formCell/FormCell.model';

export const mathSubtraction = (a: number | null, b: number, isIncrement = true): number => {
  const a1 = a?.toString()?.split('.');
  let a1Max = 0;
  if (a1?.length === 2) {
    a1Max = a1?.[1]?.length ?? 0;
  }
  const b1 = b?.toString()?.split('.');
  let b1Max = 0;
  if (b1.length === 2) {
    b1Max = b1?.[1]?.length ?? 0;
  }
  const maxLen = a1Max > b1Max ? a1Max : b1Max;
  const isXNumber = (x: number): number => (x !== null && x !== undefined && !Number.isNaN(x) ? x : 0);

  if (isIncrement) {
    const sum = isXNumber(a) + isXNumber(b);
    return sum !== 0 && !Number.isNaN(sum) ? Number(parseFloat(sum.toString()).toFixed(maxLen)) : 0;
  }
  const subtraction = isXNumber(a) - isXNumber(b);
  return subtraction !== 0 && !Number.isNaN(subtraction) ? Number(parseFloat(subtraction.toString()).toFixed(maxLen)) : 0;
};

export const isNumeric = (value: string | number | null): boolean => {
  if (typeof value !== 'string') {
    return false;
  }
  return !Number.isNaN(value) && !Number.isNaN(parseFloat(value));
};

export const createFormConfig = (
  formConfig: IFormCell,
  params: {
    prefix?: string;
    placeholderPrefix?: string;
    dictionaries?: any;
  } = {}
): IFormCell[] => {
  return (
    Object.keys(formConfig)?.map((key: string) => {
      const { prefix, placeholderPrefix, dictionaries } = params || {};
      const { config } = formConfig[key];
      const {
        placeholder,
        type,
        formCellType,
        step,
        precision,
        min,
        max,
        readonly,
        styleType,
        dictName,
        dictData,
        header,
        headerKey,
        value,
        dictKey,
        customClass,
        formCellClass,
        isHeader,
      } = (config as IFormCell) || {};

      return {
        formControlName: key,
        type,
        config: {
          ...(config ?? {}),
          prefix,
          header: header ?? `${prefix}.${headerKey ?? key}`,
          formCellType: !value ? formCellType ?? 'input' : null,
          placeholder: placeholder ?? `${placeholderPrefix ?? prefix}.${headerKey ?? key}`,
          step: step ?? 1,
          precision: precision ?? 0,
          min: min ?? 0,
          max: max ?? 100000,
          readonly: readonly ?? false,
          styleType: styleType ?? 'default',
          dictName: dictName ?? key,
          dictData: dictData ?? dictionaries?.[dictName ?? key] ?? [],
          isHeader: typeof isHeader !== 'boolean' ? true : isHeader,
          customClass: customClass ?? '',
          formCellClass: formCellClass ?? '',
          dictKey,
        },
      };
    }) ?? []
  );
};

export const createColumnsCells = (config: IFormCell[], columns: number): (IFormCell[] | null)[] =>
  config?.map((e, i) => (i % columns === 0 ? config.slice(i, i + columns) : null))?.filter(e => e) ?? [];

export const padZero = (str: string, len?: number): string => {
  len = len || 2;
  const zeros = new Array(len).join('0');
  return (zeros + str).slice(-len);
};

export const invertColor = (hex: string, bw?: boolean): string => {
  if (hex.indexOf('#') === 0) {
    hex = hex.slice(1);
  }
  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }
  if (hex.length !== 6) {
    throw new Error('Invalid HEX color.');
  }
  const r: number = parseInt(hex.slice(0, 2), 16);
  const g: number = parseInt(hex.slice(2, 4), 16);
  const b: number = parseInt(hex.slice(4, 6), 16);
  if (bw) {
    return r * 0.299 + g * 0.587 + b * 0.114 > 186 ? '#000000' : '#FFFFFF';
  }
  const red: string = (255 - r).toString(16);
  const green: string = (255 - g).toString(16);
  const blue: string = (255 - b).toString(16);
  return `#${padZero(red)}${padZero(green)}${padZero(blue)}`;
};

export const usePrevious = (value: any): any => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};

export const ifChanged = (prev: any, next: any, callback: (value: any) => void): void => {
  if (!isEqual(prev, next)) {
    callback(true);
  }
};
