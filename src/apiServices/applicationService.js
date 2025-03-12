import { APPLICATION_ACTION, APPLICATION_LIST, OPEN_APPLICATION_LIST } from 'commons/Urls';
import { get, post } from './baseService';

export const fetchApplicationsListAPI = () => {
  return get({ url: APPLICATION_LIST, marketPlaceServiceRequest: true })
    .then((response) => response)
    .catch((error) => {
      throw error;
    });
};

export const fetchApplicationsListForUnAuthorisedUserAPI = () => {
  return get({ url: OPEN_APPLICATION_LIST, marketPlaceServiceRequest: true })
    .then((response) => response)
    .catch((error) => {
      throw error;
    });
};

export const applicationActionAPI = (data) => {
  return post({ url: APPLICATION_ACTION, data, marketPlaceServiceRequest: true })
    .then((response) => response)
    .catch((error) => {
      throw error;
    });
};
