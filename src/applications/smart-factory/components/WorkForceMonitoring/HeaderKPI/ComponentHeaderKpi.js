/* eslint-disable */
import { UserOutlined } from '@ant-design/icons';
import React from 'react';
import KPICard from './KPICard';
import { ContentCard } from '../../styling';
import { Col, Row } from 'antd';

import Count from './count.svg';
import Distance from './distance.svg';
import Idle from './idle.svg';
import Productive from './productive.svg';

const data = [
  {
    logo: Count,
    logoBgColor: '#8DD8CC',
    title: 'Employee Count',
    content: '18',
    key: 1
  },
  {
    logo: Productive,
    logoBgColor: '#30BFBF',
    title: 'Productive Hours',
    content: '418 Hrs',
    key: 2
  },
  {
    logo: Idle,
    logoBgColor: '#0C98BA',
    title: 'Idling Hours',
    content: '295 Hrs',
    key: 3
  },
  {
    logo: Distance,
    logoBgColor: '#0DAD8D',
    title: 'Distance Covered',
    content: '419 Kms',
    key: 4
  }
];
export default function ComponentHeaderKpi() {
  return (
    <ContentCard title="Live Tracker">
      <Row justify="space-between">
        {data.map((kpi) => (
          <Col key={kpi.key}>
            <KPICard {...kpi} />
          </Col>
        ))}
      </Row>
    </ContentCard>
  );
}
