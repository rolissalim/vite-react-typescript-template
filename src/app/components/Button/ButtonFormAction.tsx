import React from 'react';
import { Button, Form } from 'react-bootstrap';
import ButtonCancel from './ButtonCancel';
import ButtonSubmit from './ButtonSubmit';
import { useSelector } from 'react-redux';

export default function ButtonFormAction({
    onClickReset,
    onClickCancel,
    onClickBack,
    variantReset = "danger",
    className = "mt-4 d-flex justify-content-between",
    textSubmit = "Save",
    variantSubmit = "dark",
    reset = false
}: IButtonFormAction) {
    const { loadingForm } = useSelector((state: any) => state?.ui)
    const handleResetFilter = () => {
        if (onClickReset) onClickReset()
    }

    const handleBackButton = () => {
        if (onClickBack) onClickBack()
    }

    return (
        <Form.Group className={`  ${className}`}>
            <ButtonSubmit text={textSubmit} variant={variantSubmit} className="me-2" />

            {reset &&
                <Button type='button' variant={variantReset} className="ms-2" disabled={loadingForm} onClick={() => { handleResetFilter() }} >
                    Hapus Filter
                </Button>
            }

            {onClickBack &&
                <Button type='button' variant={variantReset} className="ms-2" disabled={loadingForm} onClick={() => { handleBackButton() }} >
                    Kembali
                </Button>
            }

            {onClickCancel &&
                <ButtonCancel />
            }

        </Form.Group >
    );
}
interface IButtonFormAction {
    onClickReset?: any
    onClickCancel?: any
    onClickBack?: any
    className?: string
    textSubmit?: string
    variantSubmit?: string
    variantReset?: string
    reset?: boolean
}