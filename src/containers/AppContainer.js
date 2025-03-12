import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import MarketPlace from 'components/MarketPlace';
import CarasoulContainer from 'components/MarketPlace/CarasoulContainer';
import action from '../redux/actions';
import Layout from './LayoutContainer';

export default function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(action.fetchAllApps());
  }, []);
  return (
    <Layout>
      <CarasoulContainer />
      <MarketPlace />
    </Layout>
  );
}
