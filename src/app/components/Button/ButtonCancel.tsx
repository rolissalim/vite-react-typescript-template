import { setCallbackForm } from '@app/store/reducers/ui';
import moment from 'moment';
import React from 'react';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';

interface IButtonCancel {
  type?: 'page' | 'modal';
  ids?: string;
}

export default function ButtonCancel({ type = 'page', ids = 'id' }: IButtonCancel) {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [searchParams, setSearchParams] = useSearchParams()
  const { t } = useTranslation()
  const handleCancel = () => {
    if (type == 'page') navigate(-1)
    else {
      if (searchParams.get(ids)) {
        searchParams.delete(ids)
        setSearchParams(searchParams)
      }
      dispatch(setCallbackForm({ time: moment(), getData: false }))
    }
  }

  return (
    <Button
      className='ms-2'
      type='button'
      variant=''
      onClick={handleCancel}
    >
      {t('Cancel')}
    </Button>
  );
}
