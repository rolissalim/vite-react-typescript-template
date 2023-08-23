// import { formDataParams } from '@app/helper/params.helper';
import requestApi from './api.service';

/**
 * AuthLoginService
 * @param params = {"username":"", "password":""}
 * @returns
 */
const AuthLoginService = ({ params = {}, cancelToken }: any) => {

  // let formData = formDataParams(params)
  return requestApi().post(
    '/login',
    JSON.stringify(params),
    {
      cancelToken: cancelToken,
      "headers": {
        "content-type": "application/json",
      },
    },
  );
};

/**
 * AuthLoginService
 * @param params = {"id", "oldPassword":"", "newPassword":""}
 * @returns
 */
const ChangePasswordService = (params: any = {}, id: any, sourceToken: any) => {
  return requestApi().put(
    process.env.API_BASE_URL + '/auth/change-password/' + id,
    params,
    { cancelToken: sourceToken } // <-- IMPORTANT!
  );
};

/**
 * Get user detail yg login
 * @returns
 */
const AuthUserDetailService = (cancelToken: any = undefined) => {
  return requestApi().post(
    process.env.API_BASE_URL + '/auth/me',
    {},
    {
      cancelToken: cancelToken,
    }
  );
};

export { AuthLoginService, AuthUserDetailService, ChangePasswordService };

