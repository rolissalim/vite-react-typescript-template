import { checkImageUpload } from "./data.helper";

export const getFilterQueryParams = (queryParams: any, fields: any) => {
  const qParams = { ...queryParams };
  let qParamsField = {};

  Object.keys(qParams).map((qpf: any) => {
    const field: any = fields[qpf];

    qParamsField = { ...qParamsField, [field]: qParams[qpf] };
  });

  qParamsField = Object.fromEntries(
    Object.entries(qParamsField).filter(([key]) => key != 'undefined')
  );

  return qParamsField;
};

export const formDataParams = (params: any = {}) => {
  let formData = new FormData();
  let images: any
  if (params?.images) {
    images = checkImageUpload(params?.images)

  }

  Object.keys(params).forEach(key => {

    if (key != "images") {
      formData.append(key, params[key])
    } else if (images && (key === "images")) {
      images?.map((item: any) => {
        formData.append(`${key}[]`, item)

      })

    }
  });
  return formData;
}

export const extractParamsFilter = (params_rule: any, params: any = {}, output = 'object') => {
  if (output === 'object') {
    const _params: any = {};

    Object.keys(params_rule).forEach(key => {
      if (params_rule[key].hasOwnProperty('alias')) {
        const alias = params_rule[key].alias;
        if (params.hasOwnProperty(alias)) {
          _params[key] = params[alias];
        }
      } else if (params.hasOwnProperty(key)) {
        let params_value = (params_rule[key].hasOwnProperty('encode') && params_rule[key].encode) ? encodeURI(params[key]) : params[key];

        if (params_value !== '') {
          _params[key] = params_value;
        }
      } else {
        if (params_rule[key].default !== undefined && params_rule[key].default) {
          _params[key] = params_rule[key].default
        } else if (params_rule[key]) {
          _params[key] = params_rule[key]
        }
      }
    });

    return _params;
  } else if (output === 'string') {
    const _params: any = [];

    Object.keys(params_rule).forEach(key => {
      if (params_rule[key].hasOwnProperty('alias')) {
        const alias = params_rule[key].alias;
        if (params.hasOwnProperty(alias)) {
          _params.push(key + '=' + params[alias]);
        }
      } else if (params.hasOwnProperty(key)) {
        let params_value = (params_rule[key].hasOwnProperty('encode') && params_rule[key].encode) ? encodeURI(params[key]) : params[key];

        if (params_value !== '') {
          _params.push(key + '=' + params_value);
        }
      } else {
        if (params_rule[key].default !== undefined && params_rule[key].default) {
          _params.push(key + '=' + params_rule[key].default);
        } else if (params_rule[key]) {
          _params.push(key + '=' + params_rule[key]);
        }
      }
    });

    return _params.join('&');
  }
}

