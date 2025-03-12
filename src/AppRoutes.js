import React, { Suspense, useEffect } from 'react';

import { Redirect, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { checkSavedToken } from 'redux/reduxContainers/auth/AuthActions';
import { isLoggedIn } from 'commons/Utils';
import Loader from 'commons/Loader';
import NotFound from './containers/404';
import PrivateRoute from './routes/PrivateRoutes';

const BizTender = React.lazy(() => import('./applications/biz-tender/AppRoutes'));
const SmartFactory = React.lazy(() => import('./applications/smart-factory/AppRoutes'));
const CloudFactory = React.lazy(() => import('./applications/cloud-factory/AppRoutes'));
const LoginContainer = React.lazy(() => import('./containers/LoginContainer'));
const SignupContainer = React.lazy(() => import('./containers/SignupContainer'));
const App = React.lazy(() => import('./containers/AppContainer'));

function LoginRouteRender() {
  // if(props.history.action==="REPLACE"){
  //   props.history.push(`/login?redirect-uri=${props.location.state.from.pathname}${props.location.state.from.search}`);
  // }
  const authToken = localStorage.getItem('auth_token');
  const userId = localStorage.getItem('user_id');
  return authToken && userId ? <Redirect to="/home" /> : <LoginContainer />;
}

function AppRouteRender() {
  return isLoggedIn() ? <Redirect to="/home" /> : <App />;
}

export default function AppRoutes() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  useEffect(() => {
    if (!token) {
      dispatch(checkSavedToken());
    }
  }, [token]);
  return (
    <Suspense fallback={<Loader />}>
      <Switch>
        <Route exact path="/login" component={LoginRouteRender} />
        <Route exact path="/signup" component={SignupContainer} />
        <PrivateRoute exact path="/home" component={App} />
        <Route exact path="/" component={AppRouteRender} />
        <Route
          path="/app/biz-tender"
          render={(props) => <BizTender {...props} baseRoute="/app/biz-tender" />}
        />
        <Route
          path="/app/smart-factory"
          render={(props) => <SmartFactory {...props} baseRoute="/app/smart-factory" />}
        />
        <Route
          path="/app/cloud-factory"
          render={(props) => <CloudFactory {...props} baseRoute="/app/cloud-factory" />}
        />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}
