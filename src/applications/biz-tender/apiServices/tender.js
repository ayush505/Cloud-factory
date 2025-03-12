/*eslint-disable */
import { get, post } from 'apiServices/baseService';
import {
  TENDER_CATEGORY_LIST,
  TENDER_DETAIL,
  TENDER_FILTER_DATA,
  TENDER_HSN_CODE_LIST,
  TENDER_LIST,
  TENDER_PAYMENT_TERMS_LIST,
  TENDER_STATE_LIST
} from 'commons/Urls';

export const fetchTenderListAPI = (
  pageNumber = 1,
  numberOfRecords = 10,
  filters = {},
  sortBy = [],
  saveFilter = false,
  searchText = ''
) => {
  const url = TENDER_LIST + `?per_page=${numberOfRecords}&page=${pageNumber}`;

  const data = {
    ...filters,
    // isAscending: sortBy.isAscending,
    // sortingParamete: [sortBy.selected],
    sortByParam: sortBy,
    saveFilter,
    searchText
  };
  return post({ url, data, marketPlaceServiceRequest: true })
    .then((response) => response)
    .catch((error) => {
      throw error;
    });
};

export const fetchTenderDetailsAPI = (tenderId) => {
  return get({ url: TENDER_DETAIL + tenderId, marketPlaceServiceRequest: true })
    .then((response) => response)
    .catch((error) => {
      throw error;
    });
};

export const fetchTenderFiltersAPI = () => {
  return get({ url: TENDER_FILTER_DATA, marketPlaceServiceRequest: true })
    .then((response) => response)
    .catch((error) => {
      throw error;
    });
};

export const fetchTenderStateList = () => {
  return get({ url: TENDER_STATE_LIST, marketPlaceServiceRequest: true })
    .then((response) => response)
    .catch((error) => {
      throw error;
    });
};

export const fetchTenderHsnList = () => {
  return get({ url: TENDER_HSN_CODE_LIST, marketPlaceServiceRequest: true })
    .then((response) => response)
    .catch((error) => {
      throw error;
    });
};

export const fetchTenderCategoryList = () => {
  return get({ url: TENDER_CATEGORY_LIST, marketPlaceServiceRequest: true })
    .then((response) => response)
    .catch((error) => {
      throw error;
    });
};

export const fetchPaymentTermsList = () => {
  return get({ url: TENDER_PAYMENT_TERMS_LIST, marketPlaceServiceRequest: true })
    .then((response) => response)
    .catch((error) => {
      throw error;
    });
};
