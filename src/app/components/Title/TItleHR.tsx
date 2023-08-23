import React from "react";
import { Card } from "react-bootstrap";

export default function TitleHR({
    title
}: any) {
    return (
        <>
            <Card.Title className="mt-2 mb-1">{title}</Card.Title>
            <hr />
        </>
    )
}