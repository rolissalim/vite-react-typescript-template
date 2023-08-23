import React from 'react';
import { Form, InputGroup } from 'react-bootstrap';
import { UseFormRegisterReturn } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import RequiredInfo from '../Info/RequiredInfo';

const FormInputGroup: React.FC<{
    labelName: string;
    required?: boolean;
    placeholder1?: string;
    placeholder2?: string;
    formGroupAs?: any;
    formGroup?: boolean;
    isInvalid1: boolean | undefined;
    isInvalid2: boolean | undefined;
    message1: any;
    message2: any;
    register1: UseFormRegisterReturn;
    register2: UseFormRegisterReturn;
    type?: 'text' | 'password' | 'number' | 'color' | 'email' | 'tel';
    className?: string;
}> = ({
    labelName,
    required = false,
    placeholder1,
    placeholder2,
    isInvalid1,
    isInvalid2,
    message1,
    message2,
    register1,
    register2,
    type = 'text',
    formGroupAs = undefined,
    className = 'mb-3',
}) => {
        const { t } = useTranslation()
        return (
            <Form.Group as={formGroupAs} className={className}>
                <Form.Label>
                    {t(labelName)}
                    {required && <RequiredInfo />}
                </Form.Label>

                <InputGroup className="mb-3">
                    <Form.Control
                        type={type ?? 'text'}
                        {...register1}
                        isInvalid={isInvalid1}
                        placeholder={`${placeholder1 ? t(placeholder1) : ""}`}
                    />
                    <Form.Control
                        type={type ?? 'text'}
                        {...register2}
                        isInvalid={isInvalid2}
                        placeholder={`${placeholder2 ? t(placeholder2) : ""}`}

                    />
                </InputGroup>
                {message2 || message1 &&
                    <Form.Control.Feedback type='invalid'>{`${message1 ? t(message1) : t(message2)}`}</Form.Control.Feedback>
                }
            </Form.Group>
        );

    };

export default FormInputGroup;
