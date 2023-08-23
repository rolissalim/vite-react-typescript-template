import { getItem } from '@app/helper/localstorage.helper';

/**
 * GET REFRESH TOKEN
 */
const getRefreshToken = () => {
  const refreshToken: any = getItem('credentials')?.refresh_token;
  return refreshToken;
};

/**
 * GET ACCESS TOKEN
 */
const getAccessToken = () => {
  const refreshToken: any = getItem('credentials')?.access_token;
  return refreshToken;
};

export { getRefreshToken, getAccessToken };
