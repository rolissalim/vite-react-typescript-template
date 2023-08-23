import { UploadImageStyle } from '@app/styled/uploadCircle.styled'
import React, { useEffect, useRef, useState } from 'react'
import LazyImage from '../Image/LazyImage'
import { httpImage } from '@app/helper/string.helper'
import { useTranslation } from 'react-i18next'
import { get } from 'lodash'
import { API_PATH } from '@app/services/_path.service'
import { postByPath } from '@app/services/main.service'
import axios from 'axios'
import ModalConfirm from '../Modals/ModalConfirm'
import { notificationTemplate } from '@app/helper/notificationTemplate'
import { useDispatch } from 'react-redux'
import { addNotification } from '@app/store/notification/notification.action';
import { useWatch } from 'react-hook-form'
import moment from 'moment'
import { reloadingData } from '@app/store/reducers/app'

interface IInputUploadCircle {
    fieldName: string
    imageName?: string
    setValue: any
    image: any,
    style?: any,
    styleImage?: any,
    defaultImage?: string
    removeImage?: boolean
    id?: string
    path?: any
    control?: any
}
const InputUploadCircle = ({
    fieldName,
    setValue,
    image,
    style = {},
    defaultImage = "/static/upload.png",
    styleImage = "rounded-circle",
    removeImage = false,
    id,
    path,
    control
}: IInputUploadCircle) => {
    const { t } = useTranslation()
    const source = axios.CancelToken.source();
    const dispatch = useDispatch();
    const refUploadFoto = useRef<any>();
    const [previewImage, setPreviewImage] = useState<any>({
        file: undefined,
        base64: null,
    });
    const [localImage, setLocalImage] = useState<any>();

    const watchImage = useWatch({ control, name: fieldName })

    const [modalConfirm, setModalConfirm] = useState<any>({
        show: false,
        approved: false,
        size: 'sm',
        icon: 'far fa-trash',
        description: `${t('Delete')} ${t('image')} ini?`,
        subDescriotion: `Data tidak dapat dikembalikan`,
        textApproved: 'Delete',
        classApproved: 'danger',
        textDecline: 'Cancel',
    });

    const onChangeFoto = (event: any) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            const reader: any = new FileReader();
            reader.onload = () => {
                setPreviewImage((prevState: any) => ({
                    ...prevState,
                    base64: reader.result,
                    file: file,
                }));
                setValue(fieldName, file)
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemoveImage = () => {
        setPreviewImage((prevState: any) => ({
            ...prevState,
            base64: null,
            file: null,
        }));
        setValue(fieldName, null)
        setLocalImage(null)
        dispatch(reloadingData(moment().unix()))
    }

    const callbackModalConfirm = (approved = false) => {
        if (approved) {
            switch (modalConfirm?.action) {
                default:
                    removeImages();
                    break;
            }
        }
    };

    /** NOTIFICATION HANDLER */
    const dispatchNotification = (msg: string = '', type: string = '') => {
        const notification = notificationTemplate(msg, type);
        dispatch(addNotification({ ...notification, message: msg, type: type }));
    };

    const deleteImages = async (id_image: any) => {
        await new Promise((resolve) => setTimeout(resolve, 300));

        try {
            await postByPath(`${get(API_PATH(), path)}/images/${id_image}`, {}, source.token)
            dispatchNotification(
                `Sukses hapus image`,
                'success'
            );
            handleRemoveImage()
        } catch (err: any) {
            const message = err?.response?.data?.message;
            dispatchNotification(
                `Failed ${message}`,
                'danger'
            );
        }
    };

    const removeImages = () => {
        if (typeof image === "string" && image != "") {
            deleteImages(id)
        }
    }

    const showModalRemoveImage = () => {
        setModalConfirm((prev: any) => {
            return {
                ...prev,
                show: true
            }
        })
    }

    useEffect(() => {
        if (!watchImage && image)
            handleRemoveImage()

    }, [watchImage])

    useEffect(() => {
        setLocalImage(image)
    }, [image])

    return (
        <>
            <div className='d-flex justify-content-center'>

                <input
                    ref={refUploadFoto}
                    onChange={onChangeFoto}
                    type='file'
                    accept='image/png, image/jpg, image/jpeg'
                    hidden
                />
                <div className='position-relative avatar-lg' style={style} >
                    {(previewImage.base64 != null || localImage) && removeImage &&
                        <div className='position-absolute' style={{ top: "11", left: "11" }} onClick={() => { showModalRemoveImage() }}>
                            <div className='btn-danger btn-rounded shadow-lg btn btn-icon btn-sm'>
                                <i className="fa fa-close text-white"></i>
                            </div>
                        </div>
                    }

                    <LazyImage
                        src={
                            previewImage.base64 || httpImage(image) || "-"
                        }
                        className={`img-thumbnail ${styleImage} pointer fit`}
                        defaultImage={defaultImage}
                        onClick={() => { refUploadFoto.current.click() }}
                    />

                    <UploadImageStyle className='position-absolute'>
                        <div className='btn-light btn-rounded shadow-lg btn btn-icon btn-sm' onClick={() => { refUploadFoto.current.click() }}>
                            <i className="fas fa-plus text-danger"></i>
                        </div>
                    </UploadImageStyle>
                </div>
            </div>
            <ModalConfirm
                modalConfirmProps={modalConfirm}
                callbackModalConfirm={callbackModalConfirm}
            />
        </>

    )
}

export default InputUploadCircle
