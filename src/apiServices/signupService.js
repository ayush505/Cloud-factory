import { getGstinDetails } from 'commons/DynamicUrls';
import { CREATE_USER_URL, VALIDATE_EMAIL_URL } from 'commons/Urls';
import { get, getUms, postSignup } from './baseService';

export const validateEmailAPI = (options) => {
  return getUms({ url: VALIDATE_EMAIL_URL, params: options })
    .then((response) => response)
    .catch((error) => {
      throw error;
    });
};

export const createUserAPI = (data) => {
  return postSignup({ url: CREATE_USER_URL, data })
    .then((response) => response)
    .catch((error) => {
      throw error;
    });
};

export const fetchGstinDetailsApiForSignup = (params) => {
  return get({ url: getGstinDetails(params.gstin) })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      throw error;
    });
};
