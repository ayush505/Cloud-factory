import { COMPANIES_DEFAULT_URL, GET_USER_URL, GSTIN_DEFAULT_URL, GSTIN_DETAILS } from './Urls';

/* SIGNUP API'S */

export const getDetailsGstin = (gstin) => `${GSTIN_DEFAULT_URL}/${gstin}`;

export const getGstin = () => `${GSTIN_DEFAULT_URL}`;

export const getGstinDetails = (gstin) => `${GSTIN_DEFAULT_URL}/${GSTIN_DETAILS}?id=${gstin}`;

/* LOGIN API'S */

export const getUser = (id) => `${GET_USER_URL}/${id}`;

export const fetchProfile = (id) => `${COMPANIES_DEFAULT_URL}/${id}`;

//  Distribution Centers API's

export const fetchDistributionCenters = () => `api/addresses/get-addresses`;
