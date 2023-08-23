import React from "react";
import { Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";

export default function ButtonBlock({
    label = "Add",
    variant = "primary",
    onClick
}: IButtonBlock) {
    const { t } = useTranslation()
    const handleClick = () => {
        if (onClick) {
            onClick()
        }
    }
    return (
        <>
            <div className="d-grid gap-2 mt-2">
                <Button variant={variant} size="sm" onClick={handleClick}>
                    {t(label)}
                </Button>
            </div>
        </>
    )
}
interface IButtonBlock {
    label: string
    variant?: string
    onClick: any
}