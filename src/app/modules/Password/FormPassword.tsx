import React, { useEffect, useState } from 'react'
import { Col, Form, Row } from 'react-bootstrap'
import CardComponent from '@app/components/Card/CardComponent'
import InputPassword from './InputPassword'
import ButtonFormAction from '@app/components/Button/ButtonFormAction'
import * as Yup from 'yup';
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import FormDataModal from '../Form/FormDataModal'
import { UserField } from '@app/interface/user.interface'

interface IFormPassword {
    workspace?: any
    cardCol?: any
    field?: any,
    path: string
    id: any,
    styleHeader?: any,
    dataSelected?: any
    hideHeader?: boolean,
    classNameBody?: string,
    className?: string
}
const FormPassword = ({
    cardCol,
    path,
    id,
    styleHeader,
    hideHeader = false,
    classNameBody = "",
    className
}: IFormPassword) => {
    const [dataParams, setDataParams] = useState<any>();
    const [dataSelected, setDataSelected] = useState<any>();

    /** FORM  HANDLE */
    const validationSchema: any = Yup.object().shape({
        password: Yup.string().typeError('Data required')
            .required("Data required")
            .max(12, 'Panjang password maksimal 12 karakter')
            .min(8, 'Panjang password minimal 8 karakter')
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/,
                'Harus Mengandung huruf besar, huruf kecil, angka dan karakter simbol'
            ),
        password_confirmation: Yup.string().typeError('Data required').required("Data required").oneOf([Yup.ref('password')], "Password tidak sama")
    });

    const [formModel] = useState<any>({
        password: null,
        password_confirmation: null
    });

    const {
        register,
        handleSubmit,
        setValue,
        setError,
        formState,
    } = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: formModel,
    });

    const { errors }: any = formState

    const onSubmitHandler = (data: any) => {
        setDataParams(() => {
            return { ...data }
        });
    };

    useEffect(() => {
        setValue("role", dataSelected?.role?.id)
    }, [dataSelected])

    return (
        <>
            <FormDataModal
                setError={setError}
                setValue={setValue}
                dataParams={dataParams}
                fields={UserField}
                path={path}
                customLabel={'hide'}
                isModal={true}
                batch={false}
                ids="id"
                redirectSubmitted={false}
                hideTitle={true}
                onGetDataResult={setDataSelected}

            >
                <Form noValidate onSubmit={handleSubmit(onSubmitHandler)}>
                    <Row>
                        <Col md={cardCol}>
                            {id &&
                                <CardComponent className={`${className}`} classNameBody={classNameBody} styleHeader={styleHeader} hideHeader={hideHeader} title={'Atur Ulang Kata Sandi'}>
                                    <Row>
                                        <Col md={6}>
                                            <InputPassword
                                                errors={errors}
                                                register={register}
                                                requiredPassword={false}
                                                requiredRePassword={false}
                                            />
                                            <Form.Group as={Row} className="mb-3" controlId="button">
                                                <Col md={12}>
                                                    <ButtonFormAction className="" variantSubmit="dark" textSubmit="Atur Ulang Kata Sandi" />
                                                </Col>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                </CardComponent>
                            }
                        </Col>
                    </Row>
                </Form>
            </FormDataModal>
        </>
    )
}

export default FormPassword
