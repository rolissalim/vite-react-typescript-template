import React from "react";
import { Card } from "react-bootstrap";

export default function CardTitle({
    title
}: ICardTitle) {

    return (
        <>
            <Card.Title>{title}</Card.Title>
        </>
    )
}
interface ICardTitle {
    title: string
}