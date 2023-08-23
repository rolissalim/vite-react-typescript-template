import React from 'react';
import { Container } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

export default function ErrorTokenExpired({
  image = '/static/illustration/forbidden.png',
  title = 'Sesi Berakhir',
  description = 'Sesi Anda Telah Berakhir, Mohon Untuk Menghubungi Admin.',
}: any): React.ReactElement {
  const { t } = useTranslation()
  return (
    <Container style={{ marginTop: '10rem' }}>
      <div className='text-center'>
        <img className='mb-4' src={image} alt='' width={'160'} />
        <h4>{t(title)}</h4>
        <p>{t(description)}</p>
      </div>
    </Container>
  );
}
