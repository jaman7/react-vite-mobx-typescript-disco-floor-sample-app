import { Dropdown } from 'primereact/dropdown';
import { useTranslation } from 'react-i18next';
import { ISelect, selectConfigDefault } from './Select.model';
import { forwardRef } from 'react';

interface IProps {
  config?: ISelect;
  onChange?: <T>(value: T) => void;
  name: string;
  error?: string;
  touched?: boolean;
  disabled?: boolean;
  [name: string]: any;
}

const Select = forwardRef<Dropdown, IProps>((props, ref) => {
  const { t } = useTranslation();
  const { config, value, onChange, name } = props || {};
  const selectConfig = { ...selectConfigDefault(), ...config };
  const { dictData, disabled, placeholder } = selectConfig || {};

  const handleChange = (e: any) => {
    onChange?.(e.value);
  };

  return (
    <Dropdown
      ref={ref}
      id={name ?? ''}
      name={name ?? ''}
      value={value}
      onChange={handleChange}
      options={dictData ?? []}
      optionLabel={'displayName'}
      optionValue="id"
      placeholder={placeholder ? t(placeholder as string) : ''}
      className="select-component"
      panelClassName="select-component-panel"
      disabled={disabled}
    />
  );
});

export default Select;
