import React, { useEffect, useState } from 'react';
import { Card, Col, Form, Row } from 'react-bootstrap';
import { setCurrentPage } from '@app/store/reducers/ui';
import { useDispatch, useSelector } from 'react-redux';
import { getByIdPath } from '@app/services/main.service';
import { get } from 'lodash';
import { API_PATH } from '@app/services/_path.service';
import axios from 'axios';
import TopBarLoader from '@app/components/Loader/TopBarLoader';
import FormDataModal from '@app/modules/Form/FormDataModal';
import { stringTrim } from '@app/helper/string.helper';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import FormInputControl from '@app/components/Input/FormInputControl';
import ButtonFormAction from '@app/components/Button/ButtonFormAction';
import CardComponent from '@app/components/Card/CardComponent';
import InputPassword from '@app/modules/Password/InputPassword';
import { UserField } from '@app/interface/user.interface';


export default function ProfileUser() {
    const [dataParams, setDataParams] = useState<any>();
    const [dataSelected, setDataSelected] = useState<any>();
    const source = axios.CancelToken.source();
    const dispatch = useDispatch()
    const [loading, setLoading] = useState<boolean>(false)
    const { currentUser } = useSelector((state: any) => state.auth);
    const path = "management_system.user"


    const validationSchema: any = Yup.object().shape({
        email: Yup.string().email().typeError("Email not valid").required('Data required'),
        name: Yup.string().required('Data required'),
    });

    const [formModel] = useState<any>({
        // is_active: "1"
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
    /** SUBMIT FORM HANDLING */
    const onSubmitForm = (data: any) => {
        data.role = currentUser?.role?.id
        if (!data?.password)
            delete data?.password
        if (stringTrim(data.name) == "") {
            setError('name', {
                type: 'manual',
                message: 'Data required'
            })
        }
        setDataParams(() => {
            return { ...data }
        });
    };

    /** GET DATA PAGINATION */
    const getDataById = async () => {
        await new Promise((resolve) => setTimeout(resolve, 300));
        try {
            let req: any = await getByIdPath(`${get(API_PATH(), path)}`, currentUser?.id, source.token);
            const { data } = req;
            setDataSelected({
                ...data,
                fullname: data?.name
            })
            setLoading(false);

        } catch (err: any) {

            setLoading(false);
        }
    };



    useEffect(() => {
        dispatch(setCurrentPage({ title: "Profil User", pageTitle: "Profil" }))
        getDataById()
    }, [])

    return (
        <React.Fragment >
            <TopBarLoader isLoading={loading} />

            <Row>
                <Col md={6}>
                    <FormDataModal
                        dataParams={dataParams}
                        fields={UserField}
                        path={path}
                        setError={setError}
                        setValue={setValue}
                        dataSelected={dataSelected}
                        usePayloadParam={true}
                        ids="id"
                        hideTitle={true}
                    >
                        <Form noValidate onSubmit={handleSubmit(onSubmitForm)}>

                            <CardComponent hideHeader={false} title='Pofil User'>
                                <Card.Body>
                                    <Row>
                                        <Col md={6}>
                                            <FormInputControl
                                                labelName="Email"
                                                isInvalid={errors?.email as boolean | undefined}
                                                message={errors?.email?.message}
                                                register={register('email')}
                                                classNameLabel="form-label-custom"
                                                placeholder=""
                                                className="form-custom mb-3"
                                                required={true}
                                                disabled={true}
                                            />
                                            <FormInputControl
                                                labelName="Name"
                                                isInvalid={errors?.name as boolean | undefined}
                                                message={errors?.name?.message}
                                                register={register('name')}
                                                classNameLabel="form-label-custom"
                                                placeholder=""
                                                className="form-custom mb-3"
                                                required={true}
                                            />
                                            <InputPassword
                                                errors={errors}
                                                register={register}
                                                requiredPassword={false}
                                                requiredRePassword={false}
                                            />
                                        </Col>
                                        <Form.Group as={Row} className="mb-3" controlId="button">
                                            <Col md={12}>
                                                <ButtonFormAction className="justify-content-start" />
                                            </Col>
                                        </Form.Group>
                                    </Row>

                                </Card.Body>
                            </CardComponent>

                        </Form>
                    </FormDataModal>
                </Col>

            </Row>
        </React.Fragment >
    );
}