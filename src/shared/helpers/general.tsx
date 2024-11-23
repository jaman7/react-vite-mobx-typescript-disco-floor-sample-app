import { IFormElements } from '@app/components/formElements/FormElements.model';

export const deepEqual = (a: any, b: any): boolean => JSON.stringify(a) === JSON.stringify(b);

export const mathOperation = (a: number | null | undefined, b: number | null | undefined, isIncrement = true): number => {
  const sanitizeNumber = (x: number | null | undefined): number => (Number.isFinite(x) ? (x as number) : 0);
  const sanitizedA = sanitizeNumber(a);
  const sanitizedB = sanitizeNumber(b);
  const getPrecision = (x: number): number => (x % 1 !== 0 ? x.toString().split('.')[1]?.length || 0 : 0);
  const maxPrecision = Math.max(getPrecision(sanitizedA), getPrecision(sanitizedB));
  const result = isIncrement ? sanitizedA + sanitizedB : sanitizedA - sanitizedB;
  return parseFloat(result.toFixed(maxPrecision));
};

export const isNumeric = <T,>(value: T): boolean =>
  typeof value === 'number'
    ? !isNaN(value as unknown as number)
    : typeof value === 'string'
      ? !isNaN(Number(value)) && !isNaN(parseFloat(value))
      : false;

export const createConfigForm = (
  formConfig: IFormElements,
  params: {
    prefix?: string;
    dictionaries?: any;
  } = {}
): IFormElements[] => {
  return (
    Object.keys(formConfig)?.map((key: string) => {
      const { prefix, dictionaries } = params || {};
      const { config } = formConfig?.[key] ?? {};
      const { placeholder, type, formCellType, step, min, max, dictName, dictData, header, value } = (config as IFormElements) || {};

      return {
        formControlName: key,
        type,
        config: {
          ...(config ?? {}),
          prefix,
          header: header ?? `${prefix}.${key}`,
          formCellType: !value ? (formCellType ?? 'input') : null,
          placeholder: placeholder ?? `${prefix}.${key}`,
          step: step ?? 1,
          min: min ?? 0,
          max: max ?? 100000,
          dictName: dictName ?? key,
          dictData: dictData ?? dictionaries?.[dictName ?? key] ?? [],
        },
      };
    }) ?? []
  );
};
