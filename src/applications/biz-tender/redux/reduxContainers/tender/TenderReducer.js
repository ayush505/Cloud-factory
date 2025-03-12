/* eslint-disable */
import TYPES from 'redux/actions/types';

const initialState = {
  loading: false,
  error: false,
  data: [],
  pageNumber: 1,
  numberOfRecords: 10,
  pageInfo: {},
  filters: {
    tenderMinValue: '',
    tenderMaxValue: '',
    category: [],
    hsn: [],
    state: [],
    requiredExperience: 0,
    requiredComapnyAge: 0,
    paymentTerms: [],
    emdCost: ''
  },
  sortBy: {
    selected: 'openingDate',
    isAscending: false,
    recommended: {
      isAscending: false,
      isSelected: false
    },
    dueDate: {
      isAscending: false,
      isSelected: false
    },
    tenderValue: {
      isAscending: false,
      isSelected: false
    },
    openingDate: {
      isAscending: false,
      isSelected: true
    }
  },
  searchText: ''
};

function TenderReducer(state = initialState, action) {
  switch (action.type) {
    case TYPES.TENDER_REQUEST:
      return {
        ...state,
        error: false,
        loading: true
      };
    case TYPES.TENDER_SUCCESS:
      return {
        ...state,
        loading: false,
        data: [...state.data, ...action.data.data],
        pageInfo: {
          ...action.data.pageInfo
        },
        pageNumber: state.pageNumber + 1
      };
    case TYPES.TENDER_FAILURE:
      return {
        ...state,
        loading: false,
        error: true
      };
    case TYPES.TENDER_SORT_BY: {
      return {
        ...state,
        pageNumber: 1,
        data: [],
        pageInfo: {},
        sortBy: {
          ...action.sortBy
        }
      };
    }
    case TYPES.TENDER_CHANGE_FILTER: {
      return {
        ...state,
        pageNumber: 1,
        data: [],
        pageInfo: {},
        filters: {
          ...action.filters
        }
      };
    }
    case TYPES.TENDER_UPDATE_SEARCH_TEXT: {
      return {
        ...state,
        pageNumber: 1,
        data: [],
        pageInfo: {},
        searchText: action.searchText
      };
    }
    default:
      return state;
  }
}

export default TenderReducer;
