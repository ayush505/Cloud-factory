/* eslint-disable */
import actions from 'redux/actions';
import TYPES from '../../actions/types';

const initialState = {
  installedApplications: [],
  otherApplications: [],
  selectedCategory: 'All',
  categories: [],
  loading: false,
  error: false,
  searchText: ''
};

function appReducer(state = initialState, action) {
  switch (action.type) {
    case TYPES.ALL_APP_REQUEST:
      return {
        ...initialState,
        loading: true
      };
    case TYPES.ALL_APP_SUCCESS:
      const totalApp = action.installedApplications.length + action.otherApplications.length;
      // action.installedApplications.map(app => app.category.push('All'))
      // action.otherApplications.map(app => app.category.push('All'))
      return {
        ...initialState,
        installedApplications: [...action.installedApplications],
        otherApplications: [...action.otherApplications],
        categories: [{ name: 'All', count: totalApp }, ...action.categories],
        loading: false
      };
    case TYPES.ALL_APP_ERROR:
      return {
        ...initialState,
        error: true
      };
    case TYPES.ALL_APP_BY_CATEGORY_REQUEST:
      return {
        ...state,
        loading: true,
        error: false
      };
    case TYPES.ALL_APP_BY_CATEGORY_SUCCESS:
      return {
        ...state,
        selectedCategory: action.category,
        loading: false
      };
    case TYPES.ALL_APP_BY_CATEGORY_ERROR:
      return {
        ...state,
        error: true
      };

    case TYPES.INSTALL_APP: {
      const app = state.otherApplications.find((app) => app.app_id === action.appId);
      const otherApplicationsList = state.otherApplications.filter(
        (app) => app.app_id !== action.appId
      );

      return {
        ...state,
        installedApplications: [...state.installedApplications, app],
        otherApplications: [...otherApplicationsList]
      };
    }
    case TYPES.UNINSTALL_APP: {
      const app = state.installedApplications.find((app) => app.app_id === action.appId);
      const installedApplicationsList = state.installedApplications.filter(
        (app) => app.app_id !== action.appId
      );

      return {
        ...state,
        installedApplications: [...installedApplicationsList],
        otherApplications: [...state.otherApplications, app]
      };
    }
    case TYPES.SEARCH_TEXT: {
      return {
        ...state,
        searchText: action.searchText
      };
    }
    default:
      return state;
  }
}
export default appReducer;
