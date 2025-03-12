import { Table } from 'antd';
import React from 'react';
import BlurContent from 'commons/BlurContentWrapper';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { StyledCardWithTable } from '../../Styling';

const columns = [
  {
    title: 'Name',
    dataIndex: 'item',
    align: 'left',
    width: '40%'
  },
  {
    title: 'Quantity',
    dataIndex: 'quantity',
    align: 'right'
  },
  {
    title: 'Rate',
    dataIndex: 'price',
    align: 'right'
  }
];
const StyledTable = styled(Table)`
  .ant-table-cell {
    word-break: break-word;
  }
`;

export default function ItemList(props) {
  const { items } = props;
  const { isUserLoggedIn } = useSelector((state) => state.auth);
  return (
    <StyledCardWithTable title={`Item List (${items?.length})`}>
      <BlurContent
        type="table"
        showLoginPopup
        hideFirstColOfTable={false}
        isLoggedInUser={isUserLoggedIn}>
        <StyledTable columns={columns} dataSource={items} pagination={false} />
      </BlurContent>
    </StyledCardWithTable>
  );
}
