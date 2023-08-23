import ButtonAdd from "@app/components/Button/ButtonAdd";
import React from "react";
import { Card } from "react-bootstrap";
import { useTranslation } from "react-i18next";



export default function FormTitle({ title, type, handleAdd }: IFormTitle) {
    const { t } = useTranslation()
    return (
        <>
            <div className="d-flex justify-content-between">
                <div className="d-flex align-items-center">
                    <Card.Title>Form {t(title)}</Card.Title>
                </div>
                <div>
                    {handleAdd &&
                        <ButtonAdd handleAdd={handleAdd} type={type} />
                    }

                </div>
            </div>
            <hr />
        </>
    )
}

interface IFormTitle {
    title: string
    type?: "page" | "side" | "modal"
    handleAdd?: any
}