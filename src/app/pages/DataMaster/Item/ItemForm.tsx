import React, { useEffect, useState } from "react";
import { useForm, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Col, Form, Row } from "react-bootstrap";
import ButtonFormAction from "@app/components/Button/ButtonFormAction";
import FormInputControl from "@app/components/Input/FormInputControl";
import FormDataModal from "@app/modules/Form/FormDataModal";
import { ItemField } from "@app/interface/data-master.interface";
import { get } from "lodash";


interface ICalegSelected {
    dataSelected?: any
}
export default function ItemForm({ dataSelected }: ICalegSelected) {
    const [previewImage, setPreviewImage] = useState<any>({
        file: undefined,
        base64: null,
    });
    const path = "data_master.item"
    const [dataParams, setDataParams] = useState<any>();
    const [image, setImage] = useState<any>();
    const MAX_FILE_SIZE = 102400

    let validFileExtensions: any = {
        'image/jpg': "jpg",
        'image/png': "png",
        'image/jpeg': "jpeg"
    }



    /** FORM  HANDLE */
    const validationSchema: any = Yup.object().shape({
        name: Yup.string().required('Data required').typeError('Data required'),
        stock: Yup.number().required('Data required').typeError('Data required'),
        purchase_price: Yup.number().min(0, "Min number 0").required('Data required').typeError('Data required'),
        selling_price: Yup.number().min(0, "Min number 0").required('Data required').typeError('Data required'),
        file: Yup.mixed()
            .test("fileTipe", "Not a valid image type", (value) => {
                console.log('value', value);
                console.log('value file', value?.length);

                if (value?.length < 1) return true // attachment is optional
                return get(validFileExtensions, value?.[0]?.type) || false
            })
            .test("fileSize", "The image is too large", (value: any) => {
                if (value?.length < 1) return true // attachment is optional
                return value?.[0]?.size <= MAX_FILE_SIZE
            })
    });

    const [formModel] = useState<any>({
    });

    const {
        register,
        handleSubmit,
        setValue,
        setError,
        formState,
        control
    } = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: formModel,
    });
    const { errors }: any = formState
    /** SUBMIT FORM HANDLING */
    const onSubmitForm = (data: any) => {
        data.image = data?.file?.[0] ? data?.file?.[0] : null
        delete data.file
        setDataParams(() => {
            return { ...data }
        });
    };

    const watchImage = useWatch({ control, name: "file" })
    console.log("previewImage", previewImage)
    console.log("image", image)

    useEffect(() => {
        if (watchImage) {
            if (watchImage?.[0]?.file && watchImage?.[0]?.file) {
                const file = watchImage.file[0];
                const reader: any = new FileReader();
                reader.onload = () => {
                    setPreviewImage((prevState: any) => ({
                        ...prevState,
                        base64: reader.result,
                        file: file,
                    }));
                };
                reader.readAsDataURL(file);
            } else
                setImage(watchImage)
        }


    }, [watchImage])


    return (
        <>
            <FormDataModal
                setError={setError}
                setValue={setValue}
                dataParams={dataParams}
                fields={ItemField}
                path={path}
                customLabel={'hide'}
                isModal={true}
                batch={false}
                ids="id"
                redirectSubmitted={false}
                hideTitle={true}
                usePayloadParam={true}
                dataSelected={dataSelected}
                callBackForm={true}
            >
                <Form noValidate onSubmit={handleSubmit(onSubmitForm)}>
                    <Row className="p-3 pt-0">
                        <Col md={12}>
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

                            <FormInputControl
                                labelName="purchase_price"
                                isInvalid={errors?.purchase_price as boolean | undefined}
                                message={errors?.purchase_price?.message}
                                register={register('purchase_price')}
                                classNameLabel="form-label-custom"
                                placeholder=""
                                className="form-custom mb-3"
                                required={true}
                                type="number"
                            />

                            <FormInputControl
                                labelName="selling_price"
                                isInvalid={errors?.selling_price as boolean | undefined}
                                message={errors?.selling_price?.message}
                                register={register('selling_price')}
                                classNameLabel="form-label-custom"
                                placeholder=""
                                className="form-custom mb-3"
                                required={true}
                                type="number"
                            />

                            <FormInputControl
                                labelName="stock"
                                isInvalid={errors?.stock as boolean | undefined}
                                message={errors?.stock?.message}
                                register={register('stock')}
                                classNameLabel="form-label-custom"
                                placeholder=""
                                className="form-custom mb-3"
                                required={true}
                                type="number"
                            />

                            <FormInputControl
                                labelName="image"
                                isInvalid={errors?.file as boolean | undefined}
                                message={errors?.file?.message}
                                register={register('file')}
                                classNameLabel="form-label-custom"
                                placeholder=""
                                className="form-custom mb-3"
                                required={true}
                                type="file"
                                accept={"image/jpg,image/png, image/jpeg,.jpg,.png,.jpeg"}
                            />

                            {/* {previewImage?.base64 || image || dataSelected?.image &&
                                <div className='d-flex justify-content-center'>
                                    <div className='position-relative avatar-lg' style={{ height: "10rem", width: "10rem" }} >
                                        <LazyImage
                                            src={
                                                previewImage?.base64 || httpImage(image) || "-"
                                            }
                                            className={`img-thumbnail rounded-square pointer fit `}
                                            defaultImage="/static/upload.png"
                                        />
                                    </div>
                                </div>
                            } */}



                            <Form.Group as={Row} className="mb-3" controlId="button">
                                <Col md={9}>
                                </Col>
                                <Col md={3}>
                                    <ButtonFormAction className="mt-4 d-grid gap-2" variantSubmit="outline-primary" />
                                </Col>
                            </Form.Group>
                        </Col>
                    </Row>

                </Form>
            </FormDataModal>
        </>
    )
}