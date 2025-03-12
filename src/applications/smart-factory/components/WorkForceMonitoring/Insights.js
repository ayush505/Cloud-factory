/*eslint-disable */
import { MailFilled, ClockCircleFilled } from '@ant-design/icons';
import { Button, Card, Col, Row, Timeline } from 'antd';
import React from 'react';
import styled from 'styled-components';
import { ContentCard } from '../styling';

const { Item } = Timeline;

const incidentList = [
  {
    title: 'New Safety Insight',
    text: 'MHE operator Ashok oversped 20 times during Shift A',
    time: ' 19.05'
  },
  {
    title: 'New Productivity Insight',
    text: 'Picker operator has idled for 30% time on an average during the last 10 days',
    time: ' 14.05'
  },
  {
    title: 'New Productivity Insight',
    text: 'Picker operator has idled for 30% time on an average during the last 10 days',
    time: ' 08.05'
  }
];

const StyledCard = styled(Card)`
  .ant-card-head {
    height: 50px;
    background: transparent;
    .ant-card-head-wrapper {
      height: inherit;

      .ant-card-head-title,
      .ant-card-extra {
        padding: 4px 0;

        p {
          margin: auto;
          // color: #ccc;
        }
      }
    }
  }
`;

export default function Insights() {
  return (
    <ContentCard title="Insights" className="insights">
      <Timeline className="insights_timeline">
        <Item className="first_timeline">
          <p className="first_timeline_content">04-08-2022</p>
        </Item>
        {incidentList.map((incident) => (
          <Item dot={<MailFilled className="timeline-mail-icon" />}>
            <StyledCard
              title={incident.title}
              extra={
                <p>
                  <ClockCircleFilled />
                  {incident.time}
                </p>
              }
            >
              <p>{incident.text}</p>
              <div className="card-button">
                <Button type="primary">Email</Button>
                <Button type="primary">Raise Ticket</Button>
              </div>
            </StyledCard>
          </Item>
        ))}
        <Item dot={<ClockCircleFilled className="timeline-clock-icon" />} />
      </Timeline>
    </ContentCard>
  );
}
