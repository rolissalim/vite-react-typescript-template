import { httpImage } from "@app/helper/string.helper";
import React from "react";
import { Card } from "react-bootstrap";
import LazyImage from "../Image/LazyImage";

export default function CardImage({
    children,
    variant = "",
    className = "",
    image,
    height = "10rem",
    handleSelected,
    item
}: ICardImage) {
    const handleClick = (item: any) => {
        if (handleSelected) handleSelected(item)
    }

    return (
        <>
            <Card bg={variant} className={`mb-2 ${className}`}>
                <div className={` ${handleSelected ? " pointer " : ""}`} style={{ height: height }} onClick={() => handleClick(item)}>
                    <LazyImage src={httpImage(image)} className="fit-height card-img-top" defaultImage='/static/image/no-image.svg' />
                </div>
                <Card.Body>
                    {children}
                </Card.Body>
            </Card>
        </>
    )
}

interface ICardImage {
    hideHeader?: boolean;
    image?: string
    height?: string
    handleSelected?: any
    item?: any
    children?: any
    className?: string;
    variant?: '' | 'Primary' | 'Secondary' | 'Success' | 'Danger' | 'Warning' | 'Info' | 'Light' | 'Dark'

}