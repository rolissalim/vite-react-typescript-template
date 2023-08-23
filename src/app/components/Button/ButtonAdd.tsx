import { setCallbackForm } from '@app/store/reducers/ui';
import moment from 'moment';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import AppButton from './Button';

interface IButtonCancel {
    type?: 'page' | 'modal' | 'side';
    className?: string;
    ids?: string;
    handleAdd?: any;
}

export default function ButtonAdd({ type = 'page', ids = 'id', handleAdd = null, className = "" }: IButtonCancel) {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const [searchParams, setSearchParams] = useSearchParams()
    const { t } = useTranslation()
    const handleClickAdd = () => {
        if (type == 'page') navigate(-1)
        else if (type == 'side') {
            handleAdd()
        }
        else {
            if (searchParams.get(ids)) {
                searchParams.delete(ids)
                setSearchParams(searchParams)
            }
            dispatch(setCallbackForm({ time: moment(), getData: false }))
        }
    }

    return (
        <AppButton
            className={className}
            iconOnly={false}
            type='button'
            variant='primary'
            onClick={handleClickAdd}
            icon="add"
            isLoading={false}
        >
            {t('Add')}
        </AppButton>
    );
}
