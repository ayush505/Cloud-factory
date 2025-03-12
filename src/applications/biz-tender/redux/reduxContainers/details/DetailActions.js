import TYPES from 'redux/actions/types';
// import Data from 'dummyData/data1';
import apiService from 'apiServices';

export const fetchDetails = (tenderId) => {
  return async (dispatch) => {
    try {
      dispatch({ type: TYPES.DETAILS_REQUEST });

      const details = await apiService.fetchTenderDetailsAPI(tenderId);

      dispatch({ type: TYPES.DETAILS_SUCCESS, data: details });
    } catch (error) {
      dispatch({ type: TYPES.DETAILS_FAILURE });
    }
  };
};

// const getTenderDetailsAPI = async (tenderId) => {
// return Data;
// };
