/* eslint-disable*/
import { getJwtToken } from 'commons/Utils';
import { ShowError, ShowSuccess } from 'commons/Notifications/Errors';
import { BASE_URL, BASE_UMS_URL, BASE_MARKET_PLACE_SERVICE_URL } from 'commons/Urls';
import fetch from './fetchWithTimeout';

const BIZONGO_SECRET = `${process.env.REACT_APP_BIZONGO_SECRET_TOKEN}`;
const SELLER_SECRET = `${process.env.REACT_APP_SELLER_SECRET_TOKEN}`;
const APP_SOURCE = `${process.env.APP_SOURCE}`;

const authorizationHeader = () => {
  const jwtToken = getJwtToken();
  return `Bearer ${jwtToken}`;
};

export const getHeaders = () => {
  const jwtTokenEnable = localStorage.getItem('jwt_token_enabled')
    ? localStorage.getItem('jwt_token_enabled')
    : false;
  const headerObj = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Secret-Token': BIZONGO_SECRET,
    'Seller-Secret-Token': SELLER_SECRET,
    'Jwt-Token-Enabled': jwtTokenEnable
  };
  const jwtToken = getJwtToken();
  if (jwtToken) {
    headerObj.Authorization = authorizationHeader();
    headerObj['X-tenant-id'] = '1';
    headerObj['X-source'] = 'goops';
  }
  return headerObj;
};

export const makeRequest = (props) => {
  const { url, options } = props;

  let absoluteUrl = `${BASE_URL}/${url}`;
  if (props.umsRequest) absoluteUrl = `${BASE_UMS_URL}/${url}`;
  if (props.marketPlaceServiceRequest) absoluteUrl = `${BASE_MARKET_PLACE_SERVICE_URL}/${url}`;

  return fetch(absoluteUrl, options)
    .then(function (response) {
      if (response.status >= 200 && response.status < 300) {
        return response;
      }
      const networkerror = response;

      const error = new Error(response && response.statusText);
      error.code = response.status;
      return response
        .json()
        .then((body) => {
          error.messages = body.errors || body.error || body.error_messages;
          const errorMessage = (body.errors && [body.errors]) ||
            (body.error && [body.error]) ||
            (body.error_message && [body.error_message]) || [networkerror.statusText];
          if (error.messages[0] === 'company does exist with this name and gstin ') {
            ShowSuccess({
              text: 'Your Primary Contact has been informed to add you as a team member'
            });
          } else {
            ShowError({
              errorCode: response.status,
              errorTexts: errorMessage,
              errorUrl: response.url,
              errorMethod: options.method
            });
          }
          throw error;
        })
        .catch((other_error) => {
          error.message = other_error;
          throw error;
        });
    })
    .then(function (response) {
      return response.json();
    })
    .catch((error) => {
      throw error;
    });
};

export const get = (props) => {
  let { url, params, headers } = props;
  const options = {
    method: 'GET',
    headers: headers ? { ...getHeaders(), ...headers } : getHeaders()
  };
  if (!!params && typeof params !== 'string') {
    url += `?`;
    let count = 0;
    for (const param in params) {
      url += count > 0 ? '&' : '';
      url += Array.isArray(params[param])
        ? parametrizeUrlForArrayParam(param, params[param])
        : `${param}=${params[param]}`;
      count++;
    }
  } else if (!!params && typeof params === 'string') {
    url += params;
  }
  return makeRequest({
    ...props,
    url,
    options
  });
};

export const putRequest = (url, data) => {
  const options = {
    method: 'PUT',
    headers: getHeaders(),
    body: JSON.stringify(data)
  };
  return makeRequest({ url, options });
};

export const putRequestUms = (url, data) => {
  const options = {
    method: 'PUT',
    headers: getHeaders(),
    body: JSON.stringify(data)
  };
  return makeRequest({ url, options, umsRequest: true });
};

export const post = (props) => {
  const { url, data } = props;
  const options = {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(data)
  };
  return makeRequest({ ...props, url, options });
};

export const postUms = (props) => {
  const { url, data } = props;
  const header = getHeaders();
  header.source = APP_SOURCE;
  header.user_id = localStorage.getItem('user_id');
  const options = {
    method: 'POST',
    headers: header,
    body: JSON.stringify(data)
  };
  return makeRequest({ url, options, umsRequest: true });
};

export const getUms = (props) => {
  let { url, params } = props;
  const options = {
    method: 'GET',
    headers: getHeaders()
  };
  if (!!params && typeof params !== 'string') {
    url += `?`;
    let count = 0;
    for (const param in params) {
      url += count > 0 ? '&' : '';
      url += Array.isArray(params[param])
        ? parametrizeUrlForArrayParam(param, params[param])
        : `${param}=${params[param]}`;
      count++;
    }
  } else if (!!params && typeof params === 'string') {
    url += params;
  }
  return makeRequest({
    url,
    options,
    umsRequest: true
  });
};

export const postSignup = (props) => {
  const { url, data } = props;
  const options = {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(data)
  };
  return makeRequest({ ...props, url, options, umsRequest: true });
};

// export const postFile = (url, data, dcmsRequest) => {
//   const headers = getHeaders();
//   delete headers.Accept;
//   delete headers['Content-Type'];
//   const options = {
//     method: 'POST',
//     headers,
//     body: data
//   };
//   return makeRequest({ url, options, dcmsRequest });
// };

// export const getRequestWithBody = (url, data) => {
//   const options = {
//     method: 'GET',
//     headers: getHeaders(),
//     body: JSON.stringify(data)
//   };
//   return makeRequest({ url, options });
// };
