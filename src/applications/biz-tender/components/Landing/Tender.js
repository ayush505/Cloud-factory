import { Button, Col, Input, Row, Space } from 'antd';
import LoginPopup from 'commons/LoginPopup';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import actions from 'redux/actions';
import styled from 'styled-components';
import { StyledText } from '../Styling';
import ComponentTender from './ComponentTender';
import Filter from './Filter';
import FilterTag from './FilterTag';
import SortByFilter from './SortByFilter';

const { Search } = Input;

const StyledDiv = styled.div`
  width: 684px;
`;

const StyledRow = styled(Row)`
  margin: 16px 0px;
`;
const StyledSearch = styled(Search)`
  input {
    // border-right: 0;
  }
  button {
    // border-left: 0;
    svg {
      color: #1890ff;
    }
  }
`;
export const StyledButton = styled(Button)`
  background: #fff;
  color: #1890ff;
`;
const FilterCount = styled(StyledText)`
  margin-left: 8px;
  color: #7a8aac;
  display: inline-block;
  align-self: center;
  margin-top: 5px;
`;

export default function Tender() {
  const [visibleFilter, setVisibleFilter] = useState(false);
  const [filterList, setFilterList] = useState([]);
  const [showLoginForm, setShowLoginForm] = useState(false);

  const { isUserLoggedIn } = useSelector((state) => state.auth);
  const { filters, sortBy, searchText } = useSelector((state) => state.bizTender.TenderList);
  const dispatch = useDispatch();
  const login = (data) => {
    const { email, password } = data;
    dispatch(actions.login(email, password, '', false));
  };

  const showFilter = () => {
    if (!isUserLoggedIn) {
      setShowLoginForm(true);
    } else {
      setVisibleFilter(true);
    }
  };

  useEffect(() => {
    if (isUserLoggedIn) setShowLoginForm(false);
  }, [isUserLoggedIn]);

  const onSearch = (value) => {
    dispatch(actions.updateTenderSearchText(filters, sortBy, value.trim()));
  };
  return (
    <Row justify="center">
      <Col>
        <StyledDiv>
          <StyledRow justify="space-between" align="center">
            <Col xs={18}>
              <StyledSearch
                placeholder="Search using HSN, category, client or location"
                onSearch={onSearch}
                style={{
                  width: '360px'
                }}
                defaultValue={searchText}
              />
              {!!filterList.length && (
                <FilterCount>{`${filterList.length} Applied Filters`}</FilterCount>
              )}
            </Col>
            <Col xs={6}>
              <Row justify="end">
                <Space>
                  {/* <StyledButton type="primary">
                    Configure
                  </StyledButton> 
                  */}
                  <SortByFilter setShowLoginForm={setShowLoginForm} />

                  <Button type="primary" onClick={showFilter}>
                    Filter
                  </Button>
                </Space>
              </Row>
            </Col>
          </StyledRow>

          <FilterTag filterList={filterList} setFilterList={setFilterList} />

          <Filter visible={visibleFilter} setVisible={setVisibleFilter} />
          <ComponentTender />
          <LoginPopup
            isVisible={showLoginForm}
            setIsVisible={setShowLoginForm}
            loginAction={login}
          />
        </StyledDiv>
      </Col>
    </Row>
  );
}
