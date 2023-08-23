import React from 'react';
import { Container } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export default function Error404({
  image = '/static/illustration/404.png',
  title = 'Page Not Found',
  description = 'Page not found. Please back to Home.',
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
