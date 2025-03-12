/*eslint-disable*/
import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { isLoggedIn } from '../commons/Utils';

function PrivateRoute({ component: Component, ...rest }) {
  const isUserLoggedIn = useSelector((state) => state.auth.isUserLoggedIn);
  return (
    <Route
      {...rest}
      render={(props) =>
        isLoggedIn() || isUserLoggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        )
      }
    />
  );
}

export default PrivateRoute;
