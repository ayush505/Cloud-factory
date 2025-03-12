import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { CloudFactoryLayout } from './layout';
import { FactoryDetailPage, HomePage, MachineDetailPage, NotFound } from './containers';

export default function AppRoutes(props) {
  return (
    <CloudFactoryLayout>
      <Switch>
        <Route exact path={`${props.baseRoute}/`} component={HomePage} />
        <Route
          exact
          path={`${props.baseRoute}/factory-details/:factoryId`}
          component={FactoryDetailPage}
        />
        <Route
          exact
          path={`${props.baseRoute}/machine-details/:machineId`}
          component={MachineDetailPage}
        />
        <Route component={NotFound} />
      </Switch>
    </CloudFactoryLayout>
  );
}
