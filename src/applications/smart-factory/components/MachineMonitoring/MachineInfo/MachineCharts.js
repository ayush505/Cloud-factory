/*eslint-disable */
import { Col, Row } from 'antd';
import React from 'react';
import { DualAxes, Column, RadialBar, Box } from '@ant-design/plots';
import styled from 'styled-components';
import {
  radialChartData1,
  radialChartData2,
  radialChartData3,
  radialChartData4,
  startJob,
  endJob,
  boxChartData
} from 'applications/smart-factory/dataSet';
import { ContentCard } from '../../styling';

const ChartCard = styled(ContentCard)`
  .ant-card-head-title {
    text-align: center;
  }
`;
const StyledP = styled.p`
  text-align: center;
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 0;
  margin-top: -70px;
`;

const StyledText = styled.p`
  padding: 5px 25px;
  background: ${(props) => props.bgColor || 'black'};
  margin: 1px;
  color: white;
  font-size: 14px;
  min-width: 250px;
  text-align: center;
`;
export default function MachineCharts(props) {
  const { data = {} } = props;
  const { data1 = [], data2 = [] } = data;
  const config1 = {
    data: [data1, data1],
    xField: 'time',
    yField: ['value', 'count'],
    geometryOptions: [
      {
        geometry: 'column'
      },
      {
        geometry: 'line',
        lineStyle: {
          lineWidth: 2
        }
      }
    ]
  };
  const config2 = {
    data: data2,
    xField: 'type',
    yField: 'sales',
    label: {
      position: 'middle',
      style: {
        fill: '#FFFFFF',
        opacity: 0.6
      }
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false
      }
    }
  };

  const config3 = {
    data: [],
    width: 400,
    height: 400,
    xField: 'name',
    yField: 'star',
    maxAngle: 270,
    radius: 0.8,
    innerRadius: 0.2,
    tooltip: {
      formatter: (datum) => {
        return {
          name: 'star',
          value: datum.star
        };
      }
    },
    colorField: 'col',
    color: ({ col }) => {
      if (col == '1') {
        return '#8DD8CC';
      }
      if (col == '2') {
        return '#0DAD8D';
      }

      return '#6395f9';
    }
  };

  const config3_1 = {
    ...config3,
    data: radialChartData1
  };
  const config3_2 = {
    ...config3,
    data: radialChartData2
  };
  const config3_3 = {
    ...config3,
    data: radialChartData3
  };
  const config3_4 = {
    ...config3,
    data: radialChartData4
  };

  const config4 = {
    data: boxChartData,
    xField: 'x',
    yField: ['low', 'q1', 'median', 'q3', 'high'],
    boxStyle: {
      stroke: '#545454',
      fill: '#1890FF',
      fillOpacity: 0.3
    },
    animation: false
  };
  const config5 = {
    data: [...startJob, ...endJob],
    isGroup: true,
    xField: 'year',
    yField: 'value',
    seriesField: 'type',

    label: {
      position: 'middle',
      layout: [
        {
          type: 'interval-adjust-position'
        },
        {
          type: 'interval-hide-overlap'
        },
        {
          type: 'adjust-color'
        }
      ]
    }
  };
  return (
    <Row>
      <Col xs={12}>
        <ChartCard title="Throughput energy per job">
          <DualAxes {...config1} />
        </ChartCard>
      </Col>
      <Col xs={12}>
        <ChartCard title="Idling per job">
          <Column {...config2} />
        </ChartCard>
      </Col>
      <Col xs={24}>
        <ChartCard title="Jobs machine value stream mapping (information, material and energy flow)">
          <Row>
            <Col xs={6}>
              <RadialBar {...config3_1} />
              <StyledP>M1</StyledP>
            </Col>
            <Col xs={6}>
              <RadialBar {...config3_2} />
              <StyledP>M2</StyledP>
            </Col>
            <Col xs={6}>
              <RadialBar {...config3_3} />
              <StyledP>M3</StyledP>
            </Col>
            <Col xs={6}>
              <RadialBar {...config3_4} />
              <StyledP>M4</StyledP>
            </Col>
          </Row>
          <Row justify="center" style={{ marginTop: '25px' }}>
            <Col>
              <StyledText bgColor="#8DD8CC">Proportion of Jobs</StyledText>
            </Col>
            <Col>
              <StyledText bgColor="#0DAD8D">Proportion of throughput</StyledText>
            </Col>
            <Col>
              <StyledText bgColor="#6395f9">Proportion of energy consumed</StyledText>
            </Col>
          </Row>
        </ChartCard>
      </Col>
      <Col xs={12}>
        <ChartCard title="Jobs TAT distribution profile (in days)">
          <Box {...config4} />
        </ChartCard>
      </Col>

      <Col xs={12}>
        <ChartCard title="Jobs starts and ends across months">
          <Column {...config5} />
        </ChartCard>
      </Col>
    </Row>
  );
}
