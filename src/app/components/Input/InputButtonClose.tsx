import React from "react";
import { Button, Form, InputGroup } from "react-bootstrap";

export default function InputButtonClose({
    register,
    errors,
    fieldName,
    handleClose
}: any) {
    const onHandleClose = () => {
        if (handleClose) {
            handleClose()
        }
    }
    return (
        <>

            <InputGroup className="mb-3">
                <Form.Control
                    {...register(fieldName)}
                    aria-label="Example text with button addon"
                    aria-describedby="basic-addon1"
                />
                <Button variant="outline-danger" id="button-addon1" onClick={onHandleClose}>
                    <i className="fa fa-close" />
                </Button>
            </InputGroup>
            <Form.Control.Feedback type='invalid'>
                {errors?.[fieldName]?.message}
            </Form.Control.Feedback>

        </>
    )
}