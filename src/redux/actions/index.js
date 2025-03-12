import signupActions from 'redux/reduxContainers/signup/signupActions';
import bizTenderActions from 'applications/biz-tender/redux/actions';
import * as authActions from '../reduxContainers/auth/AuthActions';
import * as appActions from '../reduxContainers/allApps/AppActions';

const actions = {
  ...authActions,
  ...appActions,
  ...signupActions,
  ...bizTenderActions
};

export default actions;
