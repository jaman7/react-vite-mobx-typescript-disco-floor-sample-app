import './FormElements.scss';
import { FormikProps } from 'formik';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Input from '../input/Input';
import { IInput } from '../input/input.model';
import Select from '../select/Select';
import { ISelect } from '../select/Select.model';
import { FormCellConfigDefault, IFormElements } from './FormElements.model';
import { ifChanged, usePrevious } from 'helpers/helpers';

interface IProps {
  formControl?: any;
  formControlName?: string;
  config?: IFormElements;
  formik?: FormikProps<any>;
  valueChange?: Dispatch<SetStateAction<any>>;
  [name: string]: any;
}

const FormCell = (props: IProps) => {
  const { t } = useTranslation();
  const { config, formControlName, formik, valueChange } = props || {};
  const [formCellConfig, setFormCellConfig] = useState<IFormElements>(FormCellConfigDefault());
  const prevConfig = usePrevious({ config });

  useEffect(() => {
    ifChanged(prevConfig?.config, config, () => {
      setFormCellConfig({ ...FormCellConfigDefault(), ...config });
    });
  }, [config]);

  const itemsConfig = (data: IInput): Partial<IInput> => {
    const { formCellType } = data;
    const dataTmp: Partial<IInput> = data;

    switch (formCellType) {
      case 'input':
        dataTmp.type = 'text';
        break;
      case 'input-number':
        dataTmp.type = 'number';
        break;
      case 'input-range':
        dataTmp.type = 'range';
        break;
      case 'input-switch':
        dataTmp.type = 'switch';
        break;
      default:
        break;
    }
    return dataTmp;
  };

  const { formCellType, header } = formCellConfig || {};

  const formTypes = () => {
    switch (formCellType) {
      case 'input':
      case 'input-number':
      case 'input-range':
      case 'input-switch':
        return (
          <Input
            formik={formik}
            valueChange={valueChange}
            formControlName={formControlName}
            config={itemsConfig?.(formCellConfig as IInput)}
          />
        );
      case 'select':
        return <Select formik={formik} valueChange={valueChange} formControlName={formControlName} config={formCellConfig as ISelect} />;
      default:
        return <></>;
    }
  };

  return (
    <div className="form-cell-component">
      <span className="label">{t(header as string)}</span>
      {formTypes()}
    </div>
  );
};

export default FormCell;
