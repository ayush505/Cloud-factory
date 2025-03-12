import { Divider, List } from 'antd';
import { isLoggedIn } from 'commons/Utils';
import React, { useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import actions from 'redux/actions';
import styled from 'styled-components';
import queryString from 'query-string';
import _ from 'lodash';
import TenderCard from './TenderCard';

const ScrollableDiv = styled.div`
  .ant-list-item {
    padding: 0 0 16px;
  }
`;

export default function ComponentTender() {
  const { loading, data, pageNumber, numberOfRecords, filters, sortBy, pageInfo } = useSelector(
    (state) => state.bizTender.TenderList
  );

  const dispatch = useDispatch();
  const { search } = useLocation();
  const urlValues = queryString.parse(search);

  const loadMoreData = () => {
    if (loading) return;
    if (!isLoggedIn() && !_.isEmpty(urlValues)) {
      const tempFilter = _.cloneDeep(filters);
      if (urlValues.state) tempFilter.state.push(urlValues.state);
      if (urlValues.category) tempFilter.category.push(urlValues.category);
      if (urlValues.min) tempFilter.tenderMinValue = urlValues.min;
      if (urlValues.max) tempFilter.tenderMaxValue = urlValues.max;
      dispatch(actions.fetchTender(pageNumber, numberOfRecords, tempFilter, sortBy));
    } else {
      dispatch(actions.fetchTender(pageNumber, numberOfRecords, filters, sortBy));
    }
  };
  useEffect(() => {
    if (!isLoggedIn()) {
      loadMoreData();
    }
  }, []);

  return (
    <ScrollableDiv id="scrollableDiv">
      <InfiniteScroll
        dataLength={data.length}
        next={loadMoreData}
        hasMore={pageInfo.hasNextPage}
        loader={<h4>Loading...</h4>}
        endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
        scrollableTarget="infinite-scroll-content">
        <List
          dataSource={data}
          renderItem={(item) => (
            <List.Item key={item.totId}>
              <TenderCard tenderData={item} />
            </List.Item>
          )}
        />
      </InfiniteScroll>
    </ScrollableDiv>
  );
}
