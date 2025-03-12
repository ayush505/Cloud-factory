/* eslint-disable */
import { Table } from 'antd';
import React from 'react';
import { ContentCard } from '../styling';
import { dataSourceIncident } from 'applications/smart-factory/dataSet';
const columns = [
  {
    title: 'S.No.',
    dataIndex: 'seriel_number',
    key: 'serielNumber'
  },
  {
    title: 'Employee ID',
    dataIndex: 'employee_id',
    key: 'employeeID'
  },
  {
    title: 'Event',
    dataIndex: 'event',
    key: 'event'
  },
  {
    title: 'Duration (mins)',
    dataIndex: 'duration',
    key: 'duration'
  },
  {
    title: 'Zone',
    dataIndex: 'zone',
    key: 'zone'
  },
  {
    title: 'Date',
    dataIndex: 'date',
    key: 'date'
  },
  {
    title: 'Time',
    dataIndex: 'time',
    key: 'time'
  }
];

export default function TableData() {
  return (
    <ContentCard title="Incident Center">
      <Table columns={columns} dataSource={dataSourceIncident} pagination={true} />
    </ContentCard>
  );
}
