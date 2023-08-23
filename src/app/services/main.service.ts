import { formDataParams } from '@app/helper/params.helper';
import requestApi from './api.service';

const getAllDownload = (
  path: any = null,
  params: any = {},
  sourceToken: any
) => {
  return requestApi(['headers', 'data']).request({
    url: `/${path}`,
    method: 'GET',
    responseType: 'blob',
    // responseType: 'arraybuffer',
    params: params,
    cancelToken: sourceToken, // <-- IMPORTANT!
  });
};

const getByIdPath = (path: any, id: any, sourceToken: any, params: any = {}) => {
  return requestApi().request({
    url: path.includes('http') ? path : `/${path}/${id}`,
    method: 'GET',
    params: params,
    cancelToken: sourceToken, // <-- IMPORTANT!
  });
};

const getAllByPath = (
  path = '',
  params: any = { page: 1, limit: 1000 },
  sourceToken: any,
  baseUrl: any = undefined,
  token: boolean = false
) => {
  return requestApi(null, baseUrl, token).request({
    url: path.includes('http') ? path : `/${path}`,
    method: 'GET',
    params: params,
    cancelToken: sourceToken, // <-- IMPORTANT!
  });
};

const postByPath = (path = '', params: any, sourceToken: any, usePayloadParam: boolean = false) => {
  let formData = formDataParams(params)
  return requestApi().post(
    `/${path}`,
    usePayloadParam ? formData : params,
    { cancelToken: sourceToken } // <-- IMPORTANT!
  );
};

const postByIdPath = (path = '', params: any, id: any, sourceToken: any, usePayloadParam: boolean = false) => {
  let formData = formDataParams(params)
  return requestApi().post(
    `/${path}/${id}`,
    usePayloadParam ? formData : params,
    { cancelToken: sourceToken } // <-- IMPORTANT!
  );
};

const putByPath = (path = '', params: any, id: any, sourceToken: any, usePayloadParam: boolean = false) => {
  let formData = formDataParams(params)
  return requestApi().put(
    `/${path}${id ? '/' + id : ''}`,
    usePayloadParam ? formData : params,
    { cancelToken: sourceToken } // <-- IMPORTANT!
  );
};

const deleteByPath = (path = '', id: any, sourceToken: any) => {
  return requestApi().request({
    url: `/${path}${id ? '/' + id : ''}`,
    method: 'DELETE',
    params: {},
    cancelToken: sourceToken, // <-- IMPORTANT!
  });
};

const putAsetExtAtrBatch = (path = '', params: any, sourceToken: any) => {
  return requestApi().put(
    `/${path}`,
    params,
    { cancelToken: sourceToken } // <-- IMPORTANT!
  );
};

const postAllImages = (path = '', params: any, sourceToken: any) => {
  let formData = new FormData();

  Object.keys(params).forEach(key => {
    if (key != "images") {
      formData.append(key, params[key])
    }
  });
  params?.images?.map((item: any) => {
    formData.append('images', item)
  })
  return requestApi().post(
    `/${path}`,
    formData,
    { cancelToken: sourceToken } // <-- IMPORTANT!
  );
};


const postMultiDataWithImage = (path = '', params: any, sourceToken: any) => {
  let formData = new FormData();

  params?.map((item: any) => {

    Object.keys(item).forEach(keys => {
      formData.append(`${keys}[]`, item[keys])
    });
  })
  return requestApi().post(
    `/${path}`,
    formData,
    { cancelToken: sourceToken } // <-- IMPORTANT!
  );
};



export {
  postAllImages,
  getAllDownload,
  getAllByPath,
  getByIdPath,
  postByPath,
  putByPath,
  deleteByPath,
  putAsetExtAtrBatch,
  postByIdPath,
  postMultiDataWithImage
};
