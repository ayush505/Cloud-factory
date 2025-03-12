/* eslint-disable */
import TYPES from '../../actions/types';

const object = {
  requesting: false,
  successful: false,
  messages: [],
  errors: [],
  data: null
};
const initialState = {
  token: null,
  forgotpassword: { ...object },
  resetpassword: { ...object },
  authData: {},
  userData: {},
  isUserLoggedIn: false
};

function authReducer(state = initialState, action) {
  switch (action.type) {
    case TYPES.AUTH_REQUEST:
      return {
        ...initialState,
        authData: {
          requesting: true,
          successful: false
        }
      };
    case TYPES.AUTH_SET:
      return {
        ...state,
        token: action.token,
        authData: {
          requesting: false,
          successful: true
        }
      };
    case TYPES.AUTH_UNSET:
      return {
        ...initialState
      };
    case TYPES.AUTH_ERROR:
      return {
        ...state,
        authData: {
          requesting: false,
          successful: false,
          error: action.error
        }
      };

    case TYPES.USER_LOGIN_REQUEST:
      return {
        ...state,
        userData: {
          requesting: true,
          successful: false
        },
        isUserLoggedIn: false
      };
    case TYPES.USER_LOGIN_SUCCESS:
      return {
        ...state,
        userData: {
          requesting: false,
          successful: true,
          ...action.userDetails
        },
        isUserLoggedIn: true
      };
    case TYPES.USER_LOGIN_ERROR:
      return {
        ...state,
        userData: {
          requesting: false,
          successful: false
        },
        isUserLoggedIn: false
      };
    default:
      return state;
  }
}

export default authReducer;
