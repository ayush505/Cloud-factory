/* eslint-disable */
import React from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';

import NotFound from 'containers/404';
import HomePageContainer from './containers/HomePageContainer';
import DetailPageContainer from './containers/DetailPageContainer';

import Layout from './Layout';

export default function AppRoutes(props) {
  const history = useHistory();

  return (
    <Layout>
      <Switch>
        <Route exact path={`${props.baseRoute}/`} component={HomePageContainer} />
        <Route exact path={`${props.baseRoute}/:tenderId`} component={DetailPageContainer} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}
