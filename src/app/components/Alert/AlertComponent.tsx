import React from 'react';
import { Badge } from 'react-bootstrap';

export default function BadgeComponent({ text, variant = "" }: IBadgeComponent) {
    return (
        <Badge bg={variant} style={{ color: '#fff' }}>
            {text}
        </Badge>
    );
}

interface IBadgeComponent {
    text: string,
    variant?: '' | 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark'
}
