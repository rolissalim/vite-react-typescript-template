import AppButton from '@app/components/Button/Button';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import FormInputControl from '@app/components/Input/FormInputControl';

interface Ilogin {
    errors: any
    register: any
    control: any
    isLoading?: boolean,
    showForgetPassword?: boolean,
    isAdmin?: boolean
}

export default function Login({
    errors,
    register,
}: Ilogin) {

    const [isShowForm, setShowForm] = useState(false);
    const { isLoggedIn } = useSelector((state: any) => state.auth);


    useEffect(() => {
        if (isLoggedIn) {
            window.location.href = '/home';
        } else {
            setShowForm(true);
        }
    }, []);

    return (
        <React.Fragment>
            {isShowForm &&

                <div className="Auth-form-content">
                    <h3 className="Auth-form-title">Sign In</h3>
                    <FormInputControl
                        labelName="Email"
                        isInvalid={errors?.email as boolean | undefined}
                        message={errors?.email?.message}
                        register={register('email')}
                        classNameLabel="form-label-custom"
                        placeholder=""
                        className="form-custom mb-3"
                        required={true}
                    />

                    <FormInputControl
                        labelName="Password"
                        isInvalid={errors?.password as boolean | undefined}
                        message={errors?.password?.message}
                        register={register('password')}
                        classNameLabel="form-label-custom"
                        placeholder=""
                        className="form-custom mb-3"
                        required={true}
                        type='password'
                    />
                    <div className="d-grid gap-2 mt-3">
                        <AppButton type="submit">
                            Login
                        </AppButton>
                    </div>
                </div>
            }

        </React.Fragment >
    );
}
