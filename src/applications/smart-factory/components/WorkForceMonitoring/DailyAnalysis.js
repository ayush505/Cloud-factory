/* eslint-disable */
import { Table } from 'antd';
import React from 'react';
import { ContentCard } from '../styling';
import { dataSource } from 'applications/smart-factory/dataSet';

const columns = [
  {
    title: 'S.No.',
    dataIndex: 'seriel_number',
    key: 'serielNumber'
  },
  {
    title: 'Date',
    dataIndex: 'date',
    key: 'date'
  },
  {
    title: 'Employee ID',
    dataIndex: 'tag_id',
    key: 'tagId'
  },
  {
    title: 'Idling (in hr)',
    dataIndex: 'idling',
    key: 'idling'
  },
  {
    title: 'Average Speed (m/s)',
    dataIndex: 'avg_speed',
    key: 'avgSpeed'
  },
  {
    title: 'Distance Travelled (km)',
    dataIndex: 'distance_travelled',
    key: 'distanceTravelled'
  }
];

export default function DailyAnalysis() {
  return (
    <ContentCard title="Daily Analysis">
      <Table columns={columns} dataSource={dataSource} pagination={true} />
    </ContentCard>
  );
}
