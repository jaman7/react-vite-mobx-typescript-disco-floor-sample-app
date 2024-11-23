import { InputSwitch } from 'primereact/inputswitch';
import { classNames } from 'primereact/utils';
import { useTranslation } from 'react-i18next';
import { FaMinus, FaPlus } from 'react-icons/fa';
import { IInput, inputConfigDefault } from './input.model';
import { InputType } from './input.types';
import { forwardRef } from 'react';
import { mathOperation } from '@app/shared/helpers/general';
import Button from '@app/components/button/Button';

const { RANGE, NUMBER, SWITCH } = InputType;

interface IProps {
  config?: Partial<IInput>;
  value?: string | number | unknown;
  onChange?: <T>(value: T) => void;
  name: string;
  error?: string;
  touched?: boolean;
  [name: string]: any;
}

const Input = forwardRef<InputSwitch, IProps>((props, ref) => {
  const { t } = useTranslation();
  const { config, value, onChange, name, error, touched } = props;
  const inputConfig = { ...inputConfigDefault(), ...config };

  const { type, placeholder, readonly, inputClass, min = 0, max = 0, step = 0, disabled, disableBtnNumbers } = inputConfig;

  const isTypeNumber = type === NUMBER && !disableBtnNumbers;
  const isTypeRange = type === RANGE && !disableBtnNumbers;
  const isTypeSwitch = type === SWITCH;

  const handleChange = (e: any) => {
    const newValue = isTypeNumber || isTypeRange ? +e.target.value : e.target.value;
    onChange?.(newValue);
  };

  const handleStepChange = (isIncrement: boolean) => {
    const newValue = mathOperation(value ?? 0, step ?? 1, isIncrement);
    if (typeof newValue === 'number' && newValue >= min && newValue <= max) {
      onChange?.(newValue);
    }
  };

  const nameClass = `input-component ${isTypeRange ? 'input-component__range' : ''}`;
  const isFormFieldInvalid = (): boolean => !!(touched && error);

  return (
    <>
      <div className={nameClass}>
        <div className={`input-component--content ${classNames({ 'p-invalid': isFormFieldInvalid() })}`}>
          {disabled}
          {isTypeNumber ? (
            <Button aria-label="Decrease" handleClick={() => handleStepChange(false)}>
              <i className="aa">
                <FaMinus />
              </i>
            </Button>
          ) : (
            <></>
          )}

          {isTypeSwitch ? (
            <InputSwitch ref={ref} id={name} name={name} checked={value} onChange={(e) => onChange?.(e.value)} disabled={disabled} />
          ) : (
            <input
              className={`input ${inputClass}`}
              id={name}
              name={name}
              type={type ?? 'text'}
              placeholder={placeholder ? t(placeholder ?? '') : ''}
              value={value}
              min={min}
              max={max}
              step={step}
              readOnly={readonly}
              onChange={handleChange}
              disabled={disabled}
              autoComplete="off"
            />
          )}
          {isTypeNumber ? (
            <Button aria-label="Increase" handleClick={() => handleStepChange(true)}>
              <FaPlus />
            </Button>
          ) : (
            <></>
          )}
        </div>

        {isTypeRange ? <span className="input-container__range--text">{value}</span> : <></>}
      </div>
    </>
  );
});

export default Input;
