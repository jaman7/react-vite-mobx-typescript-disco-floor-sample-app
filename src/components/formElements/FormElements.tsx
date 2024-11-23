import { useTranslation } from 'react-i18next';
import { FormCellConfigDefault, IFormElements } from './FormElements.model';
import { Control, Controller } from 'react-hook-form';
import { IInput } from '../shared/input/input.model';
import Input from '../shared/input/Input';
import Select from '../shared/select/Select';
import { ISelect } from '../shared/select/Select.model';

interface IProps {
  formControlName: string;
  config?: IFormElements;
  control: Control<any>;
  valueChange?: (value: any) => void;
  [name: string]: any;
}

const FormElements = (props: IProps) => {
  const { t } = useTranslation();
  const { formControlName, config, control, valueChange } = props || {};
  const formCellConfig = { ...FormCellConfigDefault(), ...config };

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
          <Controller
            name={formControlName}
            control={control}
            render={({ field }) => <Input {...field} config={itemsConfig(formCellConfig as IInput)} valueChange={valueChange} />}
          />
        );
      case 'select':
        return (
          <Controller
            name={formControlName}
            control={control}
            render={({ field }) => <Select {...field} config={formCellConfig as ISelect} valueChange={valueChange} />}
          />
        );
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

export default FormElements;
