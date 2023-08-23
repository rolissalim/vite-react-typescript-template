import React, { useEffect } from 'react';
import { Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { postByIdPath, postByPath } from '@app/services/main.service';
import { getObjectKeys } from '@app/helper/object.helper';
import { notificationTemplate } from '@app/helper/notificationTemplate';
import { addNotification } from '@app/store/notification/notification.action';
import { get, pick, pickBy } from 'lodash';
import moment from 'moment';
import { API_PATH } from '@app/services/_path.service';
import { useTranslation } from 'react-i18next';
import { setCallbackForm, setLoadingForm } from '@app/store/reducers/ui';

interface IFormDataModal {
  children?: any;
  setError: any;
  setValue: any;
  dataParams: any;
  fields: any;
  path: any;
  onLoading?: any;
  customLabel?: any;
  overrideType?: any;
  selected?: any;
  isModal?: boolean;
  batch?: boolean;
  ids?: any;
  dataSelected?: any;
  onGetDataResult?: any;
  classContainer?: any;
  hideTitle?: boolean;
  isLoadingForm?: boolean;
  callBackForm?: boolean;
  redirectSubmitted?: boolean;
  usePayloadParam?: boolean;
  modal?: any;
  image_in?: string;
  module?: any;
  setModal?: any;
  additionalPath?: any;
  additionalPathImage?: any
  queryParams?: any
}

function FormDataModal({
  classContainer = 'ms-md-0',
  children,
  setError,
  setValue,
  dataParams,
  fields = {},
  path,
  customLabel = '',
  overrideType,
  isModal = false,
  batch = false,
  ids = 'id',
  dataSelected,
  redirectSubmitted = true,
  hideTitle = false,
  callBackForm = false,
  onGetDataResult = undefined,
  setModal,
  queryParams = {},
  isLoadingForm = true,
  usePayloadParam = false,
}: IFormDataModal) {
  const { t } = useTranslation();
  const source = axios.CancelToken.source();
  const { activePage } = useSelector((state: any) => state.ui);
  const dispatch = useDispatch();
  const label = customLabel == 'state' ? activePage?.display : '';

  /** INIT */

  useEffect(() => {
    // if (modal?.show) {
    initDataForm(dataSelected);
    // }

    return () => {
      source.cancel('Request Canceled');
    };
  }, [dataSelected]);

  useEffect(() => {
    if (dataParams) {
      let p: any = dataParams;
      Object.keys(dataParams).map((field: any) => {
        const v: any = dataParams[field];
        const fieldTypeValue = get(fields, field);
        const fieldType = typeof fieldTypeValue;
        const valueType = typeof dataParams[field];
        let t =
          fieldType == 'number'
            ? valueType == 'boolean'
              ? v
                ? 1
                : 0
              : parseFloat(v ? v : 0)
            : v;
        t = fieldType == 'boolean' ? (t ? true : false) : t;
        t = fieldType == 'string' ? `${t}` : t;
        t =
          fieldType == 'object' && fieldTypeValue == null && v == '' ? null : t;
        p[field] = t;
      });

      const apiParams = batch ? [p] : p;
      upsertData(apiParams);
    }
  }, [dataParams]);



  /** PUT / UPDATE DATA REQUEST */
  const upsertData = async (params: any) => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    if (isLoadingForm)
      dispatch(setLoadingForm(true));

    params = pickBy(params, (value) => value != 'null')

    const ID = (dataSelected) ? dataSelected[ids] : null;
    // const images = params.images;
    // delete params.images
    params = {
      ...params,
      ...queryParams
    }

    try {
      const resp: any = ID
        ? await postByIdPath(get(API_PATH(), path), params, ID, source.token, usePayloadParam)
        : await postByPath(`${get(API_PATH(), path)}`, params, source.token, usePayloadParam)
      if (!ID) initDataForm();

      if (callBackForm) {
        dispatch(setCallbackForm(moment().valueOf()))
      }
      // jangan menambahkan lagi kondisi gunakan  onGetDataResult jika ada action api setelah sukses

      if (isLoadingForm)
        dispatch(setLoadingForm(false));

      if (onGetDataResult) {
        let dataparams = {
          resp: resp?.data,
          ...resp?.data,
          ...dataSelected,
          ...params
        }
        onGetDataResult(dataparams)
      }
      dispatchNotification(
        `${t('Success')} ${ID ? t('Change data') : t('Add data')} ${label}`,
        'success'
      );

      /** IF REDIRECT / DISMISSED TRUE */
      if (redirectSubmitted) {
        if (isModal && setModal) {
          setModal((prev: any) => {
            return { ...prev, show: false }
          })
        }
      }
      // dispatch(setCallbackForm(resp));

    } catch (err: any) {
      const errValidation = err?.response?.message;
      const message = err?.response?.data?.message;
      const ID = (dataSelected) ? dataSelected[ids] : null;
      if (errValidation && err?.response?.data?.status == 400) {
        errorValidationHandling(errValidation);
      } else {
        dispatchNotification(
          `${t('Failed')} ${ID ? t('Change data') : t('Add data')
          } ${message} `,
          'danger'
        );
      }
      dispatch(setLoadingForm(false));
    }
  };

  /** GET EDIT DATA */

  /** INIT DATA FORM EDIT OR NEW DATA */
  const initDataForm = (data: any = undefined) => {
    const valueData =
      data
        ? pick(data, getObjectKeys(fields))
        : fields;

    Object.keys(valueData).map((field: any) => {
      const overrideCheck = get(overrideType, field);
      const valueOrigin = valueData[field];
      let v = valueOrigin;
      if (
        valueOrigin != '' &&
        valueOrigin != null &&
        valueOrigin != undefined
      ) {
        const dateFormat = moment(valueOrigin);
        v = overrideCheck == 'string' ? `${valueOrigin} ` : valueOrigin;
        v = overrideCheck == 'int' ? parseInt(valueOrigin) : v;
        v = overrideCheck == 'float' ? parseFloat(valueOrigin) : v;
        v = overrideCheck == 'date' ? dateFormat.format('YYYY-MM-DD') : v;
        v =
          overrideCheck == 'datetime'
            ? dateFormat.format('YYYY-MM-DD HH:mm')
            : v;
        v =
          overrideCheck == 'datetimefull'
            ? dateFormat.format('YYYY-MM-DD HH:mm:ss')
            : v;
        // v =
        //   overrideCheck == 'images'
        //     ? field === "paramsImages"
        //     : v;
      }

      setValue(field, v);
    });
  };

  /** NOTIFICATION HANDLER */
  const dispatchNotification = (msg: string = '', type: string = '') => {
    const notification = notificationTemplate(msg, type);
    dispatch(addNotification({ ...notification, message: msg, type: type }));
  };

  const errorValidationHandling = (formInvalid: any) => {
    if (
      typeof formInvalid == 'object' &&
      formInvalid instanceof Array == false
    ) {
      Object.entries(formInvalid).forEach(([key, value]) => {
        const valueArr: any = value;
        setError(key, {
          type: 'manual',
          message: valueArr.join(' '),
        });
      });
    }
  };

  return (
    <>
      {isModal ? (
        children
      ) : (
        <Row className='animate__animated animate__fadeIn'>
          <div className='col-md-12'>
            <div className={`${classContainer} `}>
              {!hideTitle && (
                <>
                  <h5 className='py-1'>
                    <i className='fal fa-info-circle'></i>{' '}
                    {/* {id ? 'Update' : 'Add'} {label} */}
                  </h5>
                  <hr />
                </>
              )}
              <div className='row'>{children}</div>
            </div>
          </div>
        </Row>
      )}
    </>
  );
}

export default FormDataModal;
