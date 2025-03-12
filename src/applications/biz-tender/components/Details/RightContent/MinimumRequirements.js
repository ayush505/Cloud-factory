import { Table } from 'antd';
import React from 'react';
import BlurContent from 'commons/BlurContentWrapper';
import { useSelector } from 'react-redux';
import { getCurrencyFormattedAmount, getMonthsToYear } from 'commons/Utils';
import { StyledCardWithTable } from '../../Styling';

const columns = [
  {
    title: 'Type',
    dataIndex: 'type',
    width: '50%'
  },
  {
    title: 'Requirement',
    dataIndex: 'requirement'
  }
];
export default function MinimumRequirements(props) {
  const { minRevenue, minAge, minExperience } = props.data;
  const { isUserLoggedIn } = useSelector((state) => state.auth);
  const dataSource = [
    {
      type: 'Revenue',
      requirement: getCurrencyFormattedAmount(minRevenue, 'Not Provided')
    },
    {
      type: 'Company Age',
      requirement: getMonthsToYear(minAge, 'Not Provided')
    },
    {
      type: 'Experience',
      requirement: getMonthsToYear(minExperience, 'Not Provided')
    }
  ];
  return (
    <StyledCardWithTable title="Minimum Requirements">
      <BlurContent type="table" showLoginPopup isLoggedInUser={isUserLoggedIn}>
        <Table columns={columns} dataSource={dataSource} pagination={false} />
      </BlurContent>
    </StyledCardWithTable>
  );
}
