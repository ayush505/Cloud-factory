/* eslint-disable */
import { ArrowDownOutlined, ArrowUpOutlined, DownOutlined } from '@ant-design/icons';
import { Button, Dropdown, Menu, Space } from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import actions from 'redux/actions';
import styled from 'styled-components';
export const StyledButton = styled(Button)`
  background: #fff;
  color: #1890ff;
`;

const StyledMenu = styled(Menu)`
  width: 322px;
  .ant-dropdown-menu-item {
    flex-direction: row-reverse;
  }
`;

export default function SortByFilter(props) {
  const { setShowLoginForm } = props;
  const { isUserLoggedIn } = useSelector((state) => state.auth);
  const { sortBy, filters, searchText } = useSelector((state) => state.bizTender.TenderList);
  const { selected, isAscending, recommended, dueDate, tenderValue, openingDate } = sortBy;

  const dispatch = useDispatch();
  const handleMenuClick = (props) => {
    if (!isUserLoggedIn) {
      setShowLoginForm(true);
    } else {
      const { key } = props;
      if (key === '1') {
        dispatch(actions.sortByTender('recommended', sortBy, filters, searchText));
      } else if (key === '2') {
        dispatch(actions.sortByTender('dueDate', sortBy, filters, searchText));
      } else if (key === '3') {
        dispatch(actions.sortByTender('tenderValue', sortBy, filters, searchText));
      } else if (key === '4') {
        dispatch(actions.sortByTender('openingDate', sortBy, filters, searchText));
      } else {
        console.log(props);
      }
    }
  };

  const menu = (
    <StyledMenu
      onClick={handleMenuClick}
      items={[
        // {
        //   label: 'Recommended',
        //   key: 1,
        //   icon: recommended.isSelected ? recommended.isAscending ? <ArrowUpOutlined /> : <ArrowDownOutlined /> : ""
        // },
        {
          label: 'Due Date',
          key: 2,
          icon: dueDate.isSelected ? (
            dueDate.isAscending ? (
              <ArrowUpOutlined />
            ) : (
              <ArrowDownOutlined />
            )
          ) : (
            ''
          )
        },
        // {
        //   label: 'Tender Value',
        //   key: 3,
        //   icon: tenderValue.isSelected ? tenderValue.isAscending ? <ArrowUpOutlined /> : <ArrowDownOutlined /> : ""
        // },
        {
          label: 'Opening',
          key: 4,
          icon: openingDate.isSelected ? (
            openingDate.isAscending ? (
              <ArrowUpOutlined />
            ) : (
              <ArrowDownOutlined />
            )
          ) : (
            ''
          )
        }
      ]}
    />
  );
  return (
    <>
      <Dropdown overlay={menu} open={true} trigger="click">
        <StyledButton type="primary">
          <Space>
            Sort by
            <DownOutlined size="small" />
          </Space>
        </StyledButton>
      </Dropdown>
    </>
  );
}
