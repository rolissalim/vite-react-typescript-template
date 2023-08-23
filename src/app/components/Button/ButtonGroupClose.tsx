import React from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';

interface IButtonDataClose {
    size?: string
    variant?: string
    variantClose?: string
    item?: any;
    handleClose?: any;
    otherProps?: any;
    className?: any;
    children?: any;
}

export default function ButtonGroupClose({
    size = "md",
    item,
    handleClose,
    variant = "primary",
    variantClose = "primary",
    otherProps,
    children,
    className
}: IButtonDataClose) {
    const handleClick = () => {
        handleClose(item)
    }

    return (
        <ButtonGroup className={className} aria-label="Basic example" >
            <Button {...otherProps} variant={variant} size={size}>{children}</Button>
            <Button {...otherProps} variant={variantClose} size={size} onClick={handleClick}><i className='fa fa-close'></i></Button>
        </ButtonGroup>
    );
}
