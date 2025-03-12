/* eslint-disable */
import { isLoggedIn } from 'commons/Utils';
import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

function CommonRoutes({ component: Component, ...rest }) {
  const isUserLoggedIn = useSelector((state) => state.auth.isUserLoggedIn);
  return (
    <Route
      {...rest}
      render={(props) =>
        isLoggedIn() || isUserLoggedIn ? (
          <Redirect to={{ pathname: '/home' }} />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
}

export default CommonRoutes;
