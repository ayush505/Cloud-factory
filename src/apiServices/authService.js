import { AUTH_URL, VALIDATE_USER } from 'commons/Urls';
import { isEmail } from 'commons/Validations';
import { fetchProfile, getDetailsGstin, getUser } from 'commons/DynamicUrls';
import { getCompanyId } from 'commons/Utils';
import { makeRequest, get, getUms, postUms } from './baseService';

const SELLER_SECRET = `${process.env.REACT_APP_SELLER_SECRET_TOKEN}`;
const APP_SOURCE = `${process.env.APP_SOURCE}`;

const getHeaders = (userId, password) => {
  let authdata = '';
  if (isEmail(userId)) {
    authdata = btoa(`${userId}:${password}`);
  } else {
    authdata = btoa(`+91${userId}:${password}`);
  }
  return {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Seller-Secret-Token': SELLER_SECRET,
    Authorization: `Basic ${authdata}`,
    Type: 'access_token',
    Source: APP_SOURCE,
    IdentityProvider: 'password'
  };
};

const authenticateAPI = (userId, password) => {
  const options = {
    method: 'POST',
    headers: getHeaders(userId, password),
    body: JSON.stringify({ userId, password })
  };
  return makeRequest({ url: AUTH_URL, options, umsRequest: true }).then((response) => response);
};

export const validateUserAPI = (token) => {
  const data = { jwt_token: token };
  return postUms({ url: VALIDATE_USER, data, umsRequest: true }).then((response) => response);
};
export const fetchUserDetailsAPI = (userId) => {
  return getUms({ url: getUser(userId) })
    .then((response) => response)
    .catch((error) => {
      throw error;
    });
};

export const fetchGstinDetailsApi = (params) => {
  return get({ url: getDetailsGstin(params.gstin) })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      throw error;
    });
};

export const getCompanyDetails = () => {
  const id = getCompanyId();
  return get(fetchProfile(id))
    .then((response) => {
      return response;
    })
    .catch((error) => {
      throw error;
    });
};
export default authenticateAPI;
