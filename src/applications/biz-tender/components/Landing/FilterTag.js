/* eslint-disable */
import { Col, Row, Tag } from 'antd';
import { getCurrencyFormattedAmount } from 'commons/Utils';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import actions from 'redux/actions';
import styled from 'styled-components';

import filterObject from './filterObject';

const StyledRow = styled(Row)`
  margin: 16px 0px;
`;

const rangeTagFunc = (tenderMinValue, tenderMaxValue, cancelRange) => {
  const min = getCurrencyFormattedAmount(tenderMinValue);
  const max = getCurrencyFormattedAmount(tenderMaxValue);
  let name = '';
  if (tenderMinValue && tenderMaxValue) {
    name = `${min} - ${max}`;
  } else if (tenderMinValue) {
    name = `Above ${min}`;
  } else if (tenderMaxValue) {
    name = `Below ${max}`;
  }
  if (!name) return;
  return (
    <Col>
      <Tag closable onClose={cancelRange}>
        {name}
      </Tag>
    </Col>
  );
};

const getTag = (name, value, cancelFilter, showName = true) => {
  return (
    <Col>
      <Tag closable onClose={(e) => cancelFilter(e, name, value)}>
        {showName ? `${filterObject[name]}: ${value}` : value}
      </Tag>
    </Col>
  );
};

export default function FilterTag(props) {
  const { filterList, setFilterList } = props;
  const { filters, sortBy, searchText } = useSelector((state) => state.bizTender.TenderList);
  const dispatch = useDispatch();

  const updateFilterList = () => {
    const tempFilterList = [];
    if (filters.tenderMinValue || filters.tenderMaxValue) {
      tempFilterList.push(
        rangeTagFunc(filters.tenderMinValue, filters.tenderMaxValue, cancelRange)
      );
    }
    for (const item in filters) {
      if (filters[item] && !(item === 'tenderMinValue' || item === 'tenderMaxValue')) {
        if (Array.isArray(filters[item])) {
          if (!filters[item].length) continue;
          filters[item].map((val) =>
            tempFilterList.push(
              getTag(item, val, cancelFilter, !(item === 'category' || item === 'state'))
            )
          );
        } else {
          tempFilterList.push(getTag(item, filters[item], cancelFilter, true));
        }
      }
    }
    setFilterList(tempFilterList);
  };

  const cancelRange = (e) => {
    e.preventDefault();
    const tempFilters = { ...filters };
    tempFilters.tenderMinValue = '';
    tempFilters.tenderMaxValue = '';
    dispatch(actions.changeTenderFilter(tempFilters, sortBy, searchText));
  };

  const cancelFilter = (e, name, value) => {
    e.preventDefault();
    const tempFilters = { ...filters };
    if (name === 'category' || name === 'state' || name === 'hsn' || name === 'paymentTerms') {
      let tempValue = [...tempFilters[name]];
      tempValue = tempValue.filter((val) => val !== value);
      tempFilters[name] = [...tempValue];
    } else tempFilters[name] = '';
    dispatch(actions.changeTenderFilter(tempFilters, sortBy, searchText));
  };

  useEffect(() => {
    updateFilterList();
  }, [filters]);

  return (
    <>
      {!!filterList.length && (
        <StyledRow gutter={[8, 8]}>{filterList.map((filter) => filter)}</StyledRow>
      )}
    </>
  );
}
