/* eslint-disable*/
import TYPES from 'redux/actions/types';

const initialState = {
  loading: false,
  error: false,
  data: {}
};

function DetailReducer(state = initialState, action) {
  switch (action.type) {
    case TYPES.DETAILS_REQUEST:
      return {
        ...initialState,
        loading: true
      };
    case TYPES.DETAILS_SUCCESS:
      return {
        ...initialState,
        loading: false,
        data: {
          ...action.data
        }
      };
    case TYPES.DETAILS_FAILURE:
      return {
        ...initialState,
        error: true
      };
    default:
      return state;
  }
}

export default DetailReducer;
