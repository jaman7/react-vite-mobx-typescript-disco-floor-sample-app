import { deepEqual, mathOperation, isNumeric, createConfigForm } from './general';

describe('General Helpers', () => {
  describe('mathOperation', () => {
    it('adds two positive numbers with decimals correctly', () => {
      expect(mathOperation(1.23, 4.56, true)).toBe(5.79);
    });

    it('subtracts two numbers correctly', () => {
      expect(mathOperation(5.67, 2.34, false)).toBe(3.33);
    });

    it('handles invalid inputs by treating them as 0', () => {
      expect(mathOperation(null, undefined, true)).toBe(0);
      expect(mathOperation(NaN, 5, false)).toBe(-5);
    });

    it('preserves maximum decimal precision', () => {
      expect(mathOperation(1.12345, 0.00123, true)).toBe(1.12468);
    });

    it('works with integers without adding decimals', () => {
      expect(mathOperation(2, 3, true)).toBe(5);
      expect(mathOperation(10, 5, false)).toBe(5);
    });
  });

  describe('deepEqual', () => {
    it('returns true for identical objects', () => {
      expect(deepEqual({ a: 1 }, { a: 1 })).toBe(true);
    });

    it('returns false for different objects', () => {
      expect(deepEqual({ a: 1 }, { a: 2 })).toBe(false);
    });

    it('returns true for deeply equal nested objects', () => {
      expect(deepEqual({ a: { b: 1 } }, { a: { b: 1 } })).toBe(true);
    });

    it('returns false for objects with different structures', () => {
      expect(deepEqual({ a: 1 }, { b: 1 })).toBe(false);
    });

    it('handles arrays correctly', () => {
      expect(deepEqual([1, 2, 3], [1, 2, 3])).toBe(true);
      expect(deepEqual([1, 2, 3], [3, 2, 1])).toBe(false);
    });

    it('returns false for objects with extra properties', () => {
      expect(deepEqual({ a: 1, b: 2 }, { a: 1 })).toBe(false);
    });

    it('returns true for empty objects', () => {
      expect(deepEqual({}, {})).toBe(true);
    });
  });

  describe('isNumeric', () => {
    it('returns true for numbers', () => {
      expect(isNumeric(123)).toBe(true);
      expect(isNumeric(-123)).toBe(true);
      expect(isNumeric(0)).toBe(true);
      expect(isNumeric(0.5)).toBe(true);
    });

    it('returns true for numeric strings', () => {
      expect(isNumeric('123')).toBe(true);
      expect(isNumeric('-123')).toBe(true);
      expect(isNumeric('0')).toBe(true);
      expect(isNumeric('0.5')).toBe(true);
    });

    it('returns false for non-numeric strings', () => {
      expect(isNumeric('abc')).toBe(false);
      expect(isNumeric('123abc')).toBe(false);
    });

    it('returns false for null or undefined', () => {
      expect(isNumeric(null)).toBe(false);
      expect(isNumeric(undefined)).toBe(false);
    });

    it('returns false for NaN', () => {
      expect(isNumeric(NaN)).toBe(false);
    });

    it('returns false for objects and arrays', () => {
      expect(isNumeric({})).toBe(false);
      expect(isNumeric([])).toBe(false);
    });
  });

  describe('createConfigForm', () => {
    const mockFormConfig = {
      field1: {
        config: {
          placeholder: 'Enter value',
          dictName: 'field1Dict',
        },
      },
      field2: {
        config: {
          formCellType: 'input-number',
        },
      },
    };

    it('creates a config form with default values', () => {
      const result = createConfigForm(mockFormConfig, { prefix: 'form' });
      expect(result).toEqual([
        {
          formControlName: 'field1',
          type: undefined,
          config: {
            placeholder: 'Enter value',
            formCellType: 'input',
            header: 'form.field1',
            prefix: 'form',
            min: 0,
            max: 100000,
            dictName: 'field1Dict',
            dictData: [],
            step: 1,
          },
        },
        {
          formControlName: 'field2',
          type: undefined,
          config: {
            placeholder: 'form.field2',
            formCellType: 'input-number',
            header: 'form.field2',
            prefix: 'form',
            min: 0,
            max: 100000,
            dictName: 'field2',
            dictData: [],
            step: 1,
          },
        },
      ]);
    });

    it('adds prefixes and dictionary data when provided', () => {
      const dictionaries = {
        field1Dict: [{ id: 1, displayName: 'Option 1' }],
      };
      const result = createConfigForm(mockFormConfig, { prefix: 'form', dictionaries });
      expect(result?.[0]?.config?.dictData).toEqual(dictionaries.field1Dict);
      expect(result?.[0]?.config?.header).toBe('form.field1');
    });

    it('handles empty formConfig gracefully', () => {
      const result = createConfigForm({});
      expect(result).toEqual([]);
    });

    it('applies default values when fields are missing', () => {
      const incompleteConfig = {
        field1: {
          config: {},
        },
      };
      const result = createConfigForm(incompleteConfig, { prefix: 'form' });
      expect(result?.[0]?.config?.min).toBe(0);
      expect(result?.[0]?.config?.max).toBe(100000);
    });
  });
});
