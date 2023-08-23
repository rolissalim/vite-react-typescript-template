import React, { useEffect } from 'react';
import { Col, Form, Row } from 'react-bootstrap';


import ButtonFormAction from '@app/components/Button/ButtonFormAction';
import { useDispatch, useSelector } from 'react-redux';
import { generateFilter, setParamFilter } from '@app/helper/filter.helper';
import { setActiveFilters, setActivePaging } from '@app/store/reducers/ui';
import { size } from 'lodash';
interface IFilterForm {
  isWilayah?: boolean
  children?: any
  setValue: any
  handleSubmit: any
  setShowWilayahWorkspace?: any
  mdButton?: number
  setFieldProvinsi?: string
  fieldProvinsi?: string,
  setFieldKotaKab?: string,
  fieldKotaKab?: string,
  setFieldKecamatan?: string,
  fieldKecamatan?: string,
  setFieldKelurahan?: string
  fieldKelurahan?: string,
  overRideParams?: any,
  onClickReset?: any
}
export default function FilterForm({
  children,
  handleSubmit,
  setValue,
  mdButton = 2,
  fieldKelurahan = "kelurahan_id",
  onClickReset
}: IFilterForm) {
  const dispatch = useDispatch()
  const { activeFilters } = useSelector(
    (state: any) => state.ui
  );

  console.log("fieldKelurahan", fieldKelurahan);

  /** SUBMIT FORM HANDLING */
  const onSubmitForm = (data: any) => {
    data.page = 1
    const params: any = generateFilter(data)
    dispatch(setActivePaging(0))
    dispatch(setActiveFilters({ filters: { filter: params }, count: size(params) }))
  };

  const handleResetFilter = () => {
    if (onClickReset) onClickReset()
    else {
      dispatch(setActivePaging(0))
      dispatch(setActiveFilters(null));
    }
  }

  useEffect(() => {
    if (activeFilters?.filters) {
      setParamFilter(activeFilters?.filters?.filter, setValue)
    }
  }, [activeFilters?.filters])

  return (
    <>

      <Form noValidate onSubmit={handleSubmit(onSubmitForm)}>
        {children}
        <Row>
          <Col md={mdButton} className='mt-2'>
            <div className='d-flex'>
              <ButtonFormAction textSubmit="Filter" onClickReset={handleResetFilter} reset={true} className="justify-content-start" />
            </div>
          </Col>
        </Row>
      </Form>
    </>
  );
}
