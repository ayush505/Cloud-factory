/* eslint-disable */
import TYPES from 'redux/actions/types';
import apiService from 'apiServices';

export const fetchTender = (
  pageNumber = 1,
  numberOfRecords = 10,
  filters = {},
  sortBy = {},
  saveFilter = false,
  searchText = ''
) => {
  return async (dispatch) => {
    // console.log('ashis fetch', pageNumber, numberOfRecords, filters, sortBy, saveFilter);
    try {
      dispatch({ type: TYPES.TENDER_REQUEST });
      const tempSortBy = [
        {
          columnName: sortBy.selected,
          orderBy: sortBy.isAscending ? 'asc' : 'desc'
        }
      ];
      if (filters.requiredComapnyAge) filters.requiredComapnyAge *= 12;
      if (filters.requiredExperience) filters.requiredExperience *= 12;
      const tenderList = await apiService.fetchTenderListAPI(
        pageNumber,
        numberOfRecords,
        filters,
        tempSortBy,
        saveFilter,
        searchText
      );
      dispatch({ type: TYPES.TENDER_SUCCESS, data: tenderList });
    } catch (error) {
      dispatch({ type: TYPES.TENDER_FAILURE });
    }
  };
};

export const sortByTender = (category = '', sortBy = {}, filters = {}, searchText = '') => {
  return (dispatch) => {
    if (category) {
      const tempSortBy = { ...sortBy };

      if (tempSortBy.selected === category) {
        tempSortBy.isAscending = !tempSortBy.isAscending;
        tempSortBy[category].isAscending = tempSortBy.isAscending;
      } else {
        tempSortBy[tempSortBy.selected].isSelected = false;
        tempSortBy[category].isSelected = true;

        tempSortBy.selected = category;
        tempSortBy.isAscending = tempSortBy[category].isAscending;
      }

      dispatch({ type: TYPES.TENDER_SORT_BY, sortBy: tempSortBy });
      dispatch(fetchTender(1, 10, filters, tempSortBy, false, searchText));
    }
  };
};

export const changeTenderFilter = (filters = {}, sortBy = {}, searchText = '') => {
  return (dispatch) => {
    dispatch({ type: TYPES.TENDER_CHANGE_FILTER, filters });
    dispatch(fetchTender(1, 10, filters, sortBy, true, searchText));
  };
};

export const fetchTenderFilters = (sortBy = {}) => {
  return async (dispatch) => {
    const filterData = await apiService.fetchTenderFiltersAPI();
    // console.log('ashis', filterData);
    const data = {
      tenderMinValue: filterData.tenderMinValue || '',
      tenderMaxValue: filterData.tenderMaxValue || '',
      category: filterData.category || [],
      hsn: filterData.hsn || [],
      state: filterData.state || [],
      requiredExperience: filterData.requiredExperience || '',
      requiredComapnyAge: filterData.requiredComapnyAge || '',
      paymentTerms: filterData.paymentTerms || [],
      emdCost: filterData.emdCost || ''
    };
    dispatch({ type: TYPES.TENDER_CHANGE_FILTER, filters: data });
    dispatch(fetchTender(1, 10, data, sortBy));
  };
};

export const updateTenderSearchText = (filters = {}, sortBy = {}, searchText = '') => {
  return (dispatch) => {
    dispatch({ type: TYPES.TENDER_UPDATE_SEARCH_TEXT, searchText });
    dispatch(fetchTender(1, 10, filters, sortBy, false, searchText));
  };
};
