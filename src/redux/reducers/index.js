import { combineReducers } from 'redux';
import bizTender from 'applications/biz-tender/redux/reducers';
import auth from '../reduxContainers/auth/AuthReducer';
import allApps from '../reduxContainers/allApps/AppReducer';

const rootReducer = combineReducers({
  auth,
  allApps,
  bizTender
});

export default rootReducer;
