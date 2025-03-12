/* eslint-disable */
import apiService from 'apiServices';
import actions from 'redux/actions';

const signup = (data) => {
  return async (dispatch) => {
    try {
      await apiService.createUserAPI(data);
      const { email, password } = data;
      dispatch(actions.login(email, password));
    } catch (error) {
      throw error;
    }
  };
};

const signupActions = {
  signup
};

export default signupActions;
