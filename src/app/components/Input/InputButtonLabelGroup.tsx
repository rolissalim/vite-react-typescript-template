import React from "react";
import { InputGroup } from "react-bootstrap";
import AppButton from "../Button/Button";

interface IInputButtonLabelGroup {
    labelText: string
    labelButton: string
    variant?: string
    size?: any
    control: any
    errors: any
    options: any
    placeholder: string
    fieldName: string
    type?: string
}

export default function InputButtonLabelGroup({
    labelText = "",
    labelButton,
    size = "md",
    variant = "outline-secondary",
    control,
    errors,
    options,
    placeholder,
    fieldName,
    type = "button"
}: IInputButtonLabelGroup) {
    return (
        <>
            <InputGroup size={size} className="mb-3">
                {labelText != "" &&
                    <InputGroup.Text id="inputGroup-sizing-sm">{labelText}</InputGroup.Text>
                }
                {/* <Form.Control
                    aria-label="Small"
                    aria-describedby="inputGroup-sizing-sm"
                /> */}
                {/* <Button variant="outline-secondary" id="button-addon1">
                    {labelButton}
                </Button> */}
                <div className="" style={{ width: "60%" }}>
                    {/* <SelectFormStatic
                        control={control}
                        errors={errors}
                        fieldName={fieldName}
                        placeholder={placeholder}
                        options={options}
                    /> */}
                </div>
                <AppButton variant={variant} type={type}>
                    {labelButton}
                </AppButton>
            </InputGroup>
        </>
    )
}