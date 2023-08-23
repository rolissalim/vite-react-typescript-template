import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import jwt_decode from "jwt-decode";

import {
    loginUser, logoutUser, setSessionLifetime
} from '@app/store/reducers/auth';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { AuthLoginService } from '@app/services/auth.service';
import { useNavigate } from 'react-router-dom';

import Login from '@app/modules/Login/Login';
import { Form } from 'react-bootstrap';
import { setErrorManul } from '@app/helper/errors.helper';

export default function SigninPage() {
    const schema = yup.object().shape({
        email: yup.string().required("Data wajib diisi"),
        password: yup.string().required("Data wajib diisi"),
    });

    const source = axios.CancelToken.source();
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const [isLoading, setLoading] = useState(false);

    const [formModel] = useState<any>({
        email: '',
        password: '',
    });
    const {
        register,
        formState,
        handleSubmit,
        setError,
        control
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: formModel,
    });
    const { errors }: any = formState

    const onSubmitHandler = (params: any) => {
        postSignin(params)
    };

    /** HANDLE ACTION LOGIN */
    const postSignin = async (params: any) => {
        try {

            /** SIGNING IN GET ACCESS TOKEN*/
            let reqToken: any = await AuthLoginService({ params: params, cancelToken: source.token });
            const token: any = jwt_decode(reqToken?.data?.access_token)
            let loginData: any = { ...reqToken?.data, ...token }
            dispatch(loginUser(loginData));
            dispatch(setSessionLifetime({ rememberMe: true }));

            /** REQUEST ROLE USER */
            setLoading(false);
            navigate("/home");
        } catch (error: any) {
            setLoading(false);
            dispatch(logoutUser())
            if (error?.response?.data?.data) {
                setErrorManul(error?.response?.data?.data?.fields, setError)
            }
        }
    }


    return (
        <>
            <div className="Auth-form-container">
                <Form onSubmit={handleSubmit(onSubmitHandler)} className='Auth-form'>
                    <Login
                        errors={errors}
                        register={register}
                        control={control}
                        isLoading={isLoading}
                        isAdmin={true}
                    />
                </Form>
            </div>
        </>

    );
}
