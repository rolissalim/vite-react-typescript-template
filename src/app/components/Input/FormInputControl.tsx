import React from 'react';
import { Form } from 'react-bootstrap';
import { UseFormRegisterReturn } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import RequiredInfo from '../Info/RequiredInfo';

const FormInputControl: React.FC<{
  labelName: string;
  required?: boolean;
  placeholder?: string;
  formGroupAs?: any;
  formGroup?: boolean;
  disabled?: boolean;
  as?: any;
  rows?: any;
  isInvalid: boolean | undefined;
  message: any;
  register: UseFormRegisterReturn;
  type?: 'text' | 'password' | 'number' | 'color' | 'email' | 'tel' | 'date' | 'file';
  className?: string;
  classNameLabel?: string;
  maxLength?: number
  accept?: any
}> = ({
  labelName,
  required = false,
  placeholder = "",
  isInvalid,
  message,
  register,
  type = 'text',
  formGroup = true,
  formGroupAs = undefined,
  as = undefined,
  rows = undefined,
  className = 'form-custom mb-3',
  classNameLabel = "form-label-custom",
  disabled = false,
  maxLength = 200,
  accept = ""
}) => {
    const { t } = useTranslation()
    if (formGroup)
      return (
        <Form.Group as={formGroupAs} className={className}>
          <Form.Label className={classNameLabel}>
            {t(labelName)}
            {required && <RequiredInfo />}
          </Form.Label>
          <Form.Control
            type={type ?? 'text'}
            {...register}
            as={as}
            rows={rows}
            isInvalid={isInvalid}
            placeholder={`${placeholder ? t(placeholder) : ""}`}
            disabled={disabled}
            autoComplete="off"
            maxLength={maxLength}
            accept={accept}
          />
          <Form.Control.Feedback type='invalid'>{t(message)}</Form.Control.Feedback>
        </Form.Group>
      );
    else
      return (
        <>
          <Form.Control
            type={type ?? 'text'}
            {...register}
            as={as}
            rows={rows}
            isInvalid={isInvalid}
            placeholder={`${placeholder ? t(placeholder) : ""}`}
            disabled={disabled}
            autoComplete="off"
            maxLength={maxLength}
          />
          <Form.Control.Feedback type='invalid'>{t(message)}</Form.Control.Feedback>
        </>
      );
  };

export default FormInputControl;
