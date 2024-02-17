import './Select.scss';

import { ifChanged, usePrevious } from 'App/helpers/helpers';
import { FormikProps } from 'formik';
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { ISelect, selectConfigDefault } from './Select.model';

interface IProps {
  config?: ISelect;
  formik?: FormikProps<any>;
  valueChange?: Dispatch<SetStateAction<any>>;
  [name: string]: any;
}

const Select = (props: IProps) => {
  const { t } = useTranslation();
  const { config, formControlName, formik } = props || {};
  const value = formik?.values?.[formControlName] ?? null;
  const [selectConfig, setSelectConfig] = useState<Partial<ISelect>>(selectConfigDefault());
  const prevConfig = usePrevious({ config });

  useEffect(() => {
    ifChanged(prevConfig?.config, config, () => {
      setSelectConfig({ ...selectConfigDefault(), ...config });
    });
  }, [config]);

  const { dictData, customClass, placeholder, useField, disabled } = selectConfig || {};

  const setChange = (e: DropdownChangeEvent) => {
    formik?.setFieldValue?.(formControlName, e.value);
    e.preventDefault();
  };

  const nameClass = `select-component ${customClass ?? ''}'}`.trim().replaceAll('  ', ' ');

  return (
    <>
      <div className={nameClass}>
        <Dropdown
          id={formControlName ?? ''}
          name={formControlName ?? ''}
          value={value}
          onChange={e => setChange(e)}
          options={dictData ?? []}
          optionLabel={useField ?? 'displayName'}
          optionValue="id"
          placeholder={placeholder ? t(placeholder as string) : ''}
          className={customClass}
          panelClassName="select-component-panel"
          disabled={disabled}
        />
      </div>
    </>
  );
};

export default Select;
