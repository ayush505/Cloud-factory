import TYPES from 'redux/actions/types';
import authenticateAPI, { validateUserAPI, fetchUserDetailsAPI } from 'apiServices/authService';
import {
  // confirmLogin,
  setToken,
  setUserDetails,
  setJwtTokenEnabled,
  setJwtToken,
  removeUserDetails,
  removeToken,
  getJwtToken
} from 'commons/Utils';
import { ShowSuccess } from 'commons/Notifications/Errors';
import { showErrorForAction } from 'redux/actions/appUtils';
import history from '../../../history';

function authApi(userId, password) {
  return authenticateAPI(userId, password)
    .then((response) => {
      setJwtToken(response.jwt_token);
      setJwtTokenEnabled();
      return response;
    })
    .catch((error) => {
      throw error;
    });
}

export const fetchUserDetails = (userId) => {
  return async (dispatch) => {
    try {
      dispatch({ type: TYPES.USER_LOGIN_REQUEST });
      const userDetails = await fetchUserDetailsAPI(userId);
      dispatch({ type: TYPES.USER_LOGIN_SUCCESS, userDetails });
      setUserDetails(userDetails);
    } catch (error) {
      removeUserDetails();
      dispatch({ type: TYPES.USER_LOGIN_ERROR });
      showErrorForAction(error);
    }
  };
};
export const login = (id, password, urlLocation, redirectToHome = true) => {
  return async (dispatch) => {
    try {
      dispatch({ type: TYPES.AUTH_REQUEST });
      const response = await authApi(id, password);
      dispatch({ type: TYPES.AUTH_SET, token: response.jwt_token });

      const userDecodeData = await validateUserAPI(response.jwt_token);
      const userId = JSON.parse(userDecodeData.user).id;
      await dispatch(fetchUserDetails(userId));

      setToken(response.auth_token);
      if (urlLocation && urlLocation.search !== '') {
        history.push(urlLocation.search.replace('?redirect-uri=', ''));
      } else if (redirectToHome) history.push('home');
      ShowSuccess({
        text: (
          <>
            <h3>Successfully logged in on Market Place</h3>
            <h4>You have successfully logged in on Market place app.</h4>
          </>
        )
      });
    } catch (error) {
      removeToken();
      removeUserDetails();
      dispatch({ type: TYPES.AUTH_ERROR, error: error.messages });
      showErrorForAction(error);
    }
  };
};

export const checkSavedToken = (showErroor = false) => {
  return async (dispatch) => {
    try {
      const jwtToken = getJwtToken();
      if (!jwtToken) throw new Error();
      dispatch({ type: TYPES.AUTH_SET, token: jwtToken });
      const userDecodeData = await validateUserAPI(getJwtToken());
      const userId = JSON.parse(userDecodeData.user).id;
      await dispatch(fetchUserDetails(userId));
    } catch (error) {
      removeToken();
      removeUserDetails();
      if (showErroor) showErrorForAction(error);
    }
  };
};

export const logout = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: TYPES.AUTH_UNSET });
      removeToken();
      removeUserDetails();
      // history.push('/');
      window.location.reload();
      ShowSuccess({ text: 'Logout successfully' });
    } catch (error) {
      // dispatch({ type: USER_LOGOUT_ERROR, error });
      showErrorForAction(error);
    }
  };
};
