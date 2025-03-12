/* eslint-disable */
const variable_url = `REACT_APP_API_URL_DEVELOPMENT`;
const variable_ums_url = `REACT_APP_UMS_API_URL`;
const variable_market_place_service_url = 'REACT_APP_MARKETPLACE_URL';

export const BASE_URL = process.env[variable_url];
export const BASE_UMS_URL = process.env[variable_ums_url];
export const BASE_MARKET_PLACE_SERVICE_URL = process.env[variable_market_place_service_url];

/* AUTH APIs */
export const AUTH_URL = 'auth-verify';
export const FETCH_USER_URL = 'api/user';
export const GET_USER_URL = 'api/users';
export const SELLER_URL = 'api/seller';

export const RESET_PASSWORD_URL = 'api/user/request-password';
export const UPDATE_PASSWORD_URL = FETCH_USER_URL + '/update-password';
export const VALIDATE_USER = GET_USER_URL + '/validate';

export const CHANGE_PASSWORD_URL = 'api/user/update-password';

/* PROFILE APIs */
export const COMPANIES_DEFAULT_URL = 'api/companies';

/* SIGNUP APIS */
export const VALIDATE_EMAIL_URL = 'api/signup/validate';
export const VALIDATE_COMPANY_URL = 'api/signup/validate';
export const CREATE_USER_URL = 'users/signup';
export const SEND_OTP_URL = 'send-otp';
export const VERIFY_OTP_URL = 'verify-otp';
export const FETCH_CATEGORIES_URL = 'categories';
export const CREATE_COMPANY_URL = 'api/companies';
export const STATE_CODES_URL = 'api/state-codes';
export const GSTIN_DEFAULT_URL = 'api/get-details-by-gstin';
export const GSTIN_DETAILS = 'get-gstin-details';
export const SELLER_CATEGORIES_URL = 'api/seller/sub-sub-categories';
export const FETCH_CITY_URL = 'api/seller/service-availability/search-pincode';

/* MARKET PLACE APPLICATIONS */
export const APPLICATION = 'application';
export const OPEN_APPLICATION_LIST = APPLICATION + '/open/application-list';
export const APPLICATION_LIST = APPLICATION + '/application-list';
export const APPLICATION_ACTION = APPLICATION + '/event';

/* BizTender */
export const BIZ_TENDER_APPLICATION = 'biztender';
export const TENDER_LIST = BIZ_TENDER_APPLICATION + '/listing-details';
export const TENDER_DETAIL = BIZ_TENDER_APPLICATION + '/tender-details/';
export const TENDER_FILTER_DATA = BIZ_TENDER_APPLICATION + '/get-filters';
export const TENDER_STATE_LIST = BIZ_TENDER_APPLICATION + '/get-state-list';
export const TENDER_HSN_CODE_LIST = BIZ_TENDER_APPLICATION + '/get-hsncode-list';
export const TENDER_CATEGORY_LIST = BIZ_TENDER_APPLICATION + '/get-tendercategory-list';
export const TENDER_PAYMENT_TERMS_LIST = BIZ_TENDER_APPLICATION + '/get-paymentterms-list';
