import axios from 'axios';
import { pick, replace } from 'lodash';
import store from '@store/index';
import { getRefreshToken } from './token.service';
import { refreshToken, logoutUser } from '@app/store/reducers/auth';
import { getItem, setItem } from '@app/helper/localstorage.helper';
import { notificationTemplate } from '@app/helper/notificationTemplate';
import { addNotification } from '@app/store/notification/notification.action';

const requestApi = (responseFields: any = null, baseUrl = undefined, token = false) => {
  let sourceRequest: any = {};

  /** CREATE AXIOS INSTANCE */
  const axiosInstance = axios.create({
    baseURL: baseUrl ? baseUrl : process.env.API_BASE_URL,
  });

  /** HANDLE AXIOS REQUEST */
  axiosInstance.interceptors.request.use(async (config: any) => {

    const { credentials }: any = store.getState().auth;

    if (credentials?.access_token || token) {
      config.headers.Authorization = `Bearer ${token ? process.env.TOKEN_GLOBAL : credentials.access_token}`;
    }

    return config;
  });

  axiosInstance.interceptors.request.use((request: any) => {
    // // If the application exists cancel
    if (sourceRequest[request.url]) {
      sourceRequest[request.url].cancel('Automatic cancellation');
    }

    return request;
  });

  /** HANDLE AXIOS RESPONSE */
  axiosInstance.interceptors.response.use(
    (resp) => {
      if (responseFields) return pick(resp, responseFields);
      return resp?.data;
    },
    async (error) => {
      const originalConfig = error.config;
      if (
        originalConfig?.url !== process.env.API_MAIN_SERVICE + '/auth/login' &&
        error.response
      ) {
        // Access Token was expired
        if (error.response.status === 401 && !originalConfig._retry) {
          originalConfig._retry = true;
          const refresh_token = getRefreshToken();
          const totalRequestRefresh = getItem('g-refresh');
          const { credentials } = store.getState().auth;
          let path: any = "/signin"

          setItem(
            'g-refresh',
            totalRequestRefresh ? parseInt(totalRequestRefresh) + 1 : 0
          );

          if (totalRequestRefresh > 10) {
            store.dispatch(logoutUser());
            localStorage.clear();
            window.location.href = path;
          }

          try {
            const rt: any = await axiosInstance.post(
              '/refresh-token',
              { refresh_token: refresh_token }
            );
            const newCredentials = { ...credentials, access_token: rt?.access_token };

            store.dispatch(refreshToken(newCredentials));

            // setTimeout(() => {
            //   window.location.reload();
            // }, 2000);

            setItem('g-refresh', 0);
            return axiosInstance(originalConfig);
          } catch (_error: any) {
            // const match_refresh_token = getRefreshToken();
            // if (
            //   refresh_token == match_refresh_token &&
            //   _error?.response?.status == 400
            // ) {
            //   store.dispatch(logoutUser());
            //   store.dispatch(clearSelectedData());
            //   window.location.href = path;
            // } else if (_error?.response?.status == 401) {
            //   store.dispatch(logoutUser());
            //   localStorage.clear();
            //   store.dispatch(clearSelectedData());
            //   window.location.reload();
            // } else if (_error?.response?.status == 422) {
            //   store.dispatch(logoutUser());
            //   localStorage.clear();
            //   store.dispatch(clearSelectedData());
            //   window.location.reload();
            // }
            store.dispatch(logoutUser());
            localStorage.clear();
            window.location.reload();
            return Promise.reject(_error);
          }
        } else if (originalConfig?.method == 'get' && error.response.status !== 401) {
          const notification = notificationTemplate(error?.message, 'danger');
          const respMsg = error.response?.data?.message ? replace(error.response?.data?.message, 'Page', 'Path') : ''
          const msg1 = error.message ? `${respMsg}` : ''

          store.dispatch(addNotification({ ...notification, title: `Error ${error.response.status}`, message: [msg1], type: 'danger' }));
        }
      }

      return Promise.reject(error);
    }
  );
  return axiosInstance;
};


export default requestApi;
