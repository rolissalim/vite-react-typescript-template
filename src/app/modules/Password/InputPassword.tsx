import FormInputControl from '@app/components/Input/FormInputControl'
import React, { useState } from 'react'
import { Form } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
interface IInputPassword {
    errors: any
    register: any
    showPassword?: boolean
    requiredPassword?: boolean
    requiredRePassword?: boolean
}
const InputPassword = ({
    errors,
    register,
    requiredPassword = false,
    requiredRePassword = false,
}: IInputPassword) => {
    const { t } = useTranslation()
    const [showPassword, setShowPassword] = useState<boolean>(false);
    return (
        <>

            <FormInputControl
                labelName={`${t("Password")}`}
                isInvalid={errors?.password as boolean | undefined}
                message={errors?.password?.message}
                register={register('password')}
                classNameLabel="form-label-custom"
                placeholder=""
                className="form-custom mb-3"
                required={requiredPassword}
                type={showPassword ? 'text' : 'password'}
            />
            <FormInputControl
                labelName={`${t("Confirm Password")}`}
                isInvalid={errors?.password_confirmation as boolean | undefined}
                message={errors?.password_confirmation?.message}
                register={register('password_confirmation')}
                classNameLabel="form-label-custom"
                placeholder=""
                className="form-custom mb-3"
                required={requiredRePassword}
                type={showPassword ? 'text' : 'password'}
            />

            <Form.Check label="Show password" className='mb-3' onClick={() => setShowPassword(!showPassword)} />
        </>
    )
}

export default InputPassword
