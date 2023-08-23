import { notificationTemplate } from '@app/helper/notificationTemplate';
import { deleteByPath } from '@app/services/main.service';
import { API_PATH } from '@app/services/_path.service';
import { addNotification } from '@app/store/notification/notification.action';
import axios from 'axios';
import { get } from 'lodash';
import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import TopBarLoader from '../Loader/TopBarLoader';
import ModalConfirm from '../Modals/ModalConfirm';
import AppButton from './Button';

export default function ButtonStatus({
    path,
    primaryKey,
    data,
    uuid,
    className = "justify-content-end me-1",
    handleEdit,
    isBtnSM = true,
    children,
    isDelete = false
}: IButtonStatus) {
    const { t } = useTranslation()
    const source = axios.CancelToken.source();
    const [loading, setLoading] = useState<boolean>(false)
    const dispatch = useDispatch();
    const [dataSelected, setDataSelected] = useState<any>()
    const [modalConfirm, setModalConfirm] = useState<any>({
        show: false,
        approved: false,
        size: 'sm',
        icon: 'far fa-trash',
        description: `Delete data`,
        subDescriotion: ``,
        textApproved: 'Delete',
        classApproved: 'danger',
        textDecline: 'Cancel',
        scrollable: false,
        action: 'delete'
    });
    /** NOTIFICATION HANDLER */
    const dispatchNotification = (msg: string = '', type: string = '') => {
        const notification = notificationTemplate(msg, type);
        dispatch(addNotification({ ...notification, message: msg, type: type }));
    };

    const deleteData = async () => {
        setLoading(true);
        const ID = uuid ? dataSelected?.uuid : dataSelected[primaryKey]
        let message: any = t("Delete")
        try {
            await deleteByPath(`${get(API_PATH(), path)}`, ID, source.token);
            dispatchNotification(`${t('Success')} ${message} data `, 'success');
        } catch (err: any) {
            setLoading(false);
            dispatchNotification(`${t('Failed')} ${message} data `, 'danger');
        }
    };


    const callbackModalConfirm = (approved = false) => {
        if (approved) {
            switch (modalConfirm?.action) {
                case "delete":
                    deleteData()
                    break;

            }
        }
    };


    const handleDelete = (item: any) => {
        setDataSelected(item)
        setModalConfirm((prevState: any) => ({
            ...prevState,
            show: true,
            title: "Delete Data",
            icon: "far fa-trash",
            textApproved: "Delete",
            classApproved: "danger",
            description: "Data can't be restore",
            action: "delete"
        }));
    }

    return (
        <>
            <TopBarLoader isLoading={loading} />
            <Form.Group className={` d-flexs ${className}`}>
                {children}
                {handleEdit &&
                    <AppButton
                        variant="warning"
                        iconOnly={true}
                        icon="edit"
                        className={`me-1 ${isBtnSM ? "btn-sm" : ""}`}
                        placement="top"
                        textTooltip={`${t('Click for edit')}`}
                        isOverLay={true}
                        onClick={() => { handleEdit(data) }}>
                        Edit
                    </AppButton>
                }
                {isDelete &&
                    <AppButton
                        variant="danger"
                        iconOnly={true}
                        icon="delete"
                        className={`me-1 ${isBtnSM ? "btn-sm" : ""}`}
                        placement="top"
                        textTooltip={`${t('Click for delete')}`}
                        isOverLay={true}
                        onClick={() => { handleDelete(data) }}>
                        Delete
                    </AppButton>
                }

            </Form.Group >
            <ModalConfirm
                modalConfirmProps={modalConfirm}
                callbackModalConfirm={callbackModalConfirm}
            />

        </>
    );
}
interface IButtonStatus {
    path: string;
    primaryKey: string
    className?: string
    uuid?: string
    data: any
    handleEdit?: any
    isStatus?: boolean
    isBroadcast?: boolean
    isBtnSM?: boolean
    handleDetail?: any
    handleDelete?: any
    handlePermision?: any
    handleDown?: any
    handleUp?: any
    children?: any
    countData?: number
    handleKeterjangkauan?: any
    isDelete?: boolean
}