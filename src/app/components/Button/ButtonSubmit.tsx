import React from 'react';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

export default function ButtonSubmit({ variant = 'primary', text = "Save" }: any) {
  const { t } = useTranslation()
  const { loadingForm } = useSelector((state: any) => state?.ui)
  return (
    <Button type='submit' variant={variant} disabled={loadingForm}>
      {t(text)}
      {loadingForm &&
        <span className='ms-3'>
          <i className="fas fa-spinner fa-pulse"></i>
        </span>
      }
    </Button>
  );
}
