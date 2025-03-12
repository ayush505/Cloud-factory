/* eslint-disable */
import Details from 'applications/biz-tender/components/Details';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import actions from 'redux/actions';

export default function DetailPageContainer() {
  const dispatch = useDispatch();
  const { tenderId } = useParams();

  useEffect(() => {
    if (!!tenderId) dispatch(actions.fetchDetails(tenderId));
  }, []);
  return <Details />;
}
