import React, { useCallback, useEffect, useState } from 'react';
import { FormControl } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import ModalForm from '@app/components/Modals/ModalForm';
import { debounce } from 'lodash';
import { setActivePaging, setSearchKeyword } from '@app/store/reducers/ui';
import { Button as AppButton } from '@app/components';
import { useTranslation } from 'react-i18next';
type Props = {
  children?: any;
  add?: any;
  onClickAdd?: any;
  filter?: boolean | false;
  reload?: boolean | false;
  exporting?: boolean;
  exportingOptions?: any;
  module?: any;
  search?: boolean
  sort?: boolean
  spaceTop?: any;
  modalConfig?: any;
  placeholder?: string;
  download?: any
};

export default function TableDataListAction({
  children,
  add = true,
  onClickAdd,
  spaceTop = 0,
  modalConfig,
  search,
  placeholder = "Search"
}: Props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation()
  const { loading } = useSelector((state: any) => state.ui);
  const JustifyContent = styled.div`
    justify-content: space-between !important;
    display: flex !important;
    margin-top: ${spaceTop}rem;
    position:sticky;
  `;
  const [modal, setModal] = useState<any>({
    show: false,
    approved: false,
    size: 'sm',
    icon: '',
    title: 'Filters',
    textApproved: 'Yes',
    classApproved: 'primary',
    textDecline: 'No',
    scrollable: false,
    ...modalConfig
  });

  const { searchKeyword } = useSelector((state: any) => state.ui);
  const handleAddClick = (e: any) => {
    if (onClickAdd) {
      onClickAdd(e);
    } else {
      const target = typeof add == 'boolean' ? 'add' : add;
      navigate(target);
    }
  };

  /** SEARCH HANDLER */
  const searchHandler = (e: any) => {
    dispatch(setActivePaging(0))
    dispatch(setSearchKeyword(e?.target?.value || ''));
  };

  const debouncedSearchHandler = useCallback(debounce(searchHandler, 500), []);

  useEffect(() => {
    setModal((prev: any) => ({
      ...prev,
      show: false
    }))
  }, [loading])

  return (
    <>
      <JustifyContent>
        <div>
          {search &&
            <FormControl
              defaultValue={searchKeyword}
              id="keyword"
              className='search bg-transparent form-control-danger'
              placeholder={t(placeholder) || ""}
              aria-label={placeholder}
              aria-describedby='search-wsp'
              onChange={debouncedSearchHandler}
            />
          }
        </div >
        <div>
          {add && (
            <AppButton className='mr-2' variant='outline-primary' onClick={handleAddClick}>
              {t("Add")}
            </AppButton>
          )}
        </div>

      </JustifyContent >
      <ModalForm modalProps={modal}>
        {children}
      </ModalForm>
    </>
  );
}
