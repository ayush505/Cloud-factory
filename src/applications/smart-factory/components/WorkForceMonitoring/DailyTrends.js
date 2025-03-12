/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { Column } from '@ant-design/plots';
import { ContentCard } from '../styling';
import { DatePicker, Row } from 'antd';
import styled from 'styled-components';

import { idlingHours } from 'applications/smart-factory/dummyDataSet/idlingHours';
import { productiveHours } from 'applications/smart-factory/dummyDataSet/productiveHours';
import { filterDataForDateRange, getBeforeCurrentData, getCurrentData } from 'commons/Utils';

const ChartRow = styled(Row)`
  margin: 10px;
`;

const data = [...idlingHours, ...productiveHours];

const { RangePicker } = DatePicker;
const dateFormat = 'YYYY-MM-DD';

export default function DailyTrends() {
  const [dataArr, setData] = useState([]);
  const startDate = getBeforeCurrentData(15);
  const endDate = getCurrentData();
  const [containerWidth, setContainerWidth] = useState(window.innerWidth - 250);

  useEffect(() => {
    const filteredData = filterDataForDateRange({ data, startDate, endDate });
    setData(filteredData);
  }, []);

  useEffect(() => {
    setContainerWidth(window.innerWidth - 250);
  }, [window.innerWidth]);
  const config = {
    // data: data.reverse(),
    data: [...dataArr],
    isStack: true,
    xField: 'date',
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
    },
    autoFit: true,
    width: containerWidth
  };
  const intervalChanged = (value, dateString) => {
    console.log(value, dateString);
    if (value) {
      const filteredData = filterDataForDateRange({
        data,
        startDate: dateString[0],
        endDate: dateString[1]
      });
      setData(filteredData);

      const tempData = data.filter((d) => d.date >= dateString[0] && d.date <= dateString[1]);
      setData(tempData);
    } else {
      setData(data);
    }
  };

  return (
    <ContentCard title="Daily Trends" id="dailyTrends">
      <Row justify="end">
        <RangePicker
          picker="date"
          onChange={intervalChanged}
          // defaultValue={[moment(startDate), moment(endDate)]}
          defaultValue={[startDate, endDate]}
          format={dateFormat}
        />
        {/* <RangePicker defaultValue={} format={dateFormat} /> */}
      </Row>
      <ChartRow justify="center">
        <Column {...config} />
      </ChartRow>
    </ContentCard>
  );
}
