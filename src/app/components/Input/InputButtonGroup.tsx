import React from "react";
import { Button, Form, InputGroup } from "react-bootstrap";

interface IInputButtonGroup {
    labelButton: string
    handleAdd?: any
    size?: any;
    position?: string
    variant?: string
    fieldName?: any
    register?: any
    errors?: any
}

export default function InputButtonGroup({
    labelButton,
    handleAdd,
    size = "md",
    position = "right",
    variant = "outline-secondary",
    register,
    errors,
    fieldName

}: IInputButtonGroup) {

    return (
        <>
            <InputGroup className="mb-3" size={size} >
                {position == "left" &&
                    <Button size={size} variant={variant} id="add-keyword" onClick={handleAdd}>
                        {labelButton}
                    </Button>
                }
                <Form.Control
                    aria-label="Example text with button addon"
                    aria-describedby="basic-addon1"
                    size={size}
                    {...register(fieldName)}
                    
                />

                {position == "right" &&
                    <Button size={size} variant={variant} id="add-keyword" onClick={handleAdd}>
                        {labelButton}
                    </Button>
                }
            </InputGroup>
            <Form.Control.Feedback type='invalid'>
                {errors?.[fieldName]?.message}
            </Form.Control.Feedback>

        </>
    )
}