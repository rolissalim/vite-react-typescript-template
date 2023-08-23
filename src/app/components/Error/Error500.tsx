import React from 'react';
import { Container } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export default function Error500({
    image = '/static/illustration/forbidden.png',
    title = 'No allowed access',
    description = 'Anda tidak memiliki hak akses untuk mengakses halaman ini. Silahkan kembali ke halaman utama.',
    buttonTitle = 'Back to Home',
    buttonTarget = '/',
}: any): React.ReactElement {
    const { t } = useTranslation()
    return (
        <Container style={{ marginTop: '10rem' }}>
            <div className='text-center'>
                <img className='mb-4' src={image} alt='' width={'160'} />
                <h4>{t(title)}</h4>
                <p>{t(description)}</p>
                <Link className='btn btn-primary' to={buttonTarget}>{t(buttonTitle)}</Link>
            </div>
        </Container>
    );
}
