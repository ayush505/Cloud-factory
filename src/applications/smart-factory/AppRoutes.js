/* eslint-disable */
import React from 'react';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';

import Layout from './Layout';
import NotFound from 'containers/404';
import ProductionPlanner from './containers/ContainerProduction';
import OeeCalculator from './components/OeeCalculator/OeeCalculator';

import ValueStream from './containers/ValueStream';

import ContainerWorkForceMonitoring from './containers/ContainerWorkForceMonitoring';
import ContainerMachineMonitoring from './containers/ContainerMachineMonitoring';

export default function AppRoutes(props) {
  return (
    <Layout baseRoute={props.baseRoute}>
      <Switch>
        <Route exact path={`${props.baseRoute}/planner`} component={ProductionPlanner} />
        <Route exact path={`${props.baseRoute}/calculator`} component={OeeCalculator} />
        <Route exact path={`${props.baseRoute}/value`} component={ValueStream} />
        <Route
          exact
          path={`${props.baseRoute}/work-force-monitor`}
          component={ContainerWorkForceMonitoring}
        />
        <Route
          exact
          path={`${props.baseRoute}/machine-monitor`}
          component={ContainerMachineMonitoring}
        />
        <Redirect to={`${props.baseRoute}/work-force-monitor`} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}
