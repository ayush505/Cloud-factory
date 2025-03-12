/* eslint-disable */

import React, { useState } from 'react';
import { Col, InputNumber, Row, Slider, Button, Progress } from 'antd';
import oeePageGIF from '../../assets/oeePageGIF.gif';

import styled from 'styled-components';
import Insight from './Insight';
import { ContentCard, PageHeaderText } from '../styling';

const InputLabel = styled.label`
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  color: #3e4977;
  display: block;
  margin: 20px 0 10px 5px;
`;
const StyledCol = styled(Col)``;
const StyledSmall = styled.small`
  color: ${(props) => props.color || '#99A6BF'};
  font-size: ${(props) => props.size || '12px'};
  font-weight: ${(props) => props.weight || 'normal'};
`;

const StyledProgressBar = styled(Progress)`
  .ant-progress-inner {
    width: 200px !important;
    height: 200px !important;
  }
`;

export default function OeeCalculator() {
  const [insight, setInsight] = useState(false);
  const [shiftDuration, setshiftDuration] = useState(8);
  const [numberOfShifts, setnumberOfShifts] = useState(3);
  const [plannedDowntime, setplannedDowntime] = useState(1);
  const [unPlannedDowntime, setunPlannedDowntime] = useState(2);
  const [productionRate, setproductionRate] = useState(4);
  const [actualProduction, setactualProduction] = useState(47);
  const [totalScrap, settotalScrap] = useState(8);

  const roundOff = (vl) => {
    return Math.round(parseFloat(vl) * 100) / 100;
  };

  const generateInsight = () => {
    setInsight(true);
  };
  const onChangeshiftDuration = (e) => {
    setshiftDuration(e);
  };

  const onChangeplannedDowntime = (e) => {
    setplannedDowntime(e);
  };
  const onChangeunPlannedDowntime = (e) => {
    setunPlannedDowntime(e);
  };
  const onChangeproductionRate = (e) => {
    setproductionRate(e);
  };
  const onChangeactualProduction = (e) => {
    setactualProduction(e);
  };

  const onChangetotalScrap = (e) => {
    settotalScrap(e);
  };

  const onChangenumberOfShifts = (vl) => {
    vl = parseInt(vl);
    const p = parseInt(24 / parseInt(shiftDuration));
    console.log(`vl: ${vl}, p: ${p}`);
    if (vl > p) {
      vl = p;
    }
    console.log(`vl: ${vl}, p: ${p}`);

    setnumberOfShifts(vl);
  };

  const resetOeeCalculator = () => {
    setshiftDuration(8);
    setnumberOfShifts(3);
    setplannedDowntime(1);
    setunPlannedDowntime(2);
    setproductionRate(4);
    setactualProduction(47);
    settotalScrap(8);
  };

  const getAvailability = () => {
    let k = shiftDuration * numberOfShifts - plannedDowntime;
    if (k == 0) return 0;
    return roundOff((shiftDuration * numberOfShifts - plannedDowntime - unPlannedDowntime) / k);
  };
  const getPerformance = () => {
    let k = productionRate * (shiftDuration * numberOfShifts - plannedDowntime - unPlannedDowntime);
    if (k == 0) return 0;
    return roundOff(actualProduction / k);
  };

  const getQuality = () => {
    let k = actualProduction;
    if (k == 0) return 0;
    return roundOff((actualProduction - totalScrap) / k);
  };
  const getOee = () => {
    return 100 * roundOff(getAvailability() * getPerformance() * getQuality());
  };

  return (
    <>
      {/* <PageHeaderText>OEE Calculator</PageHeaderText> */}
      <ContentCard>
        <Row>
          <Col span={12}>
            <InputLabel>Duration of each day shift</InputLabel>
            <Row>
              <Col span={18}>
                <Slider min={1} max={20} onChange={onChangeshiftDuration} value={shiftDuration} />
              </Col>
              <Col span={6}>
                <InputNumber
                  min={1}
                  max={20}
                  value={shiftDuration}
                  onChange={onChangeshiftDuration}
                />
              </Col>
            </Row>
            <InputLabel>Number of shifts in a day</InputLabel>
            <Row>
              <Col span={24}>
                <InputNumber
                  min={1}
                  style={{ width: '90%' }}
                  onChange={onChangenumberOfShifts}
                  value={numberOfShifts}
                />
              </Col>
            </Row>
            <InputLabel>Planned downtime</InputLabel>
            <Row>
              <Col span={18}>
                <Slider
                  min={0}
                  max={numberOfShifts * shiftDuration}
                  onChange={onChangeplannedDowntime}
                  value={plannedDowntime}
                />
              </Col>
              <Col span={6}>
                <InputNumber
                  min={0}
                  max={numberOfShifts * shiftDuration}
                  value={plannedDowntime}
                  onChange={onChangeplannedDowntime}
                />
              </Col>
            </Row>
            <InputLabel>Unplanned downtime</InputLabel>
            <Row>
              <Col span={18}>
                <Slider
                  min={0}
                  max={numberOfShifts * shiftDuration - plannedDowntime}
                  onChange={onChangeunPlannedDowntime}
                  value={unPlannedDowntime}
                />
              </Col>
              <Col span={6}>
                <InputNumber
                  min={1}
                  max={numberOfShifts * shiftDuration - plannedDowntime}
                  value={unPlannedDowntime}
                  onChange={onChangeunPlannedDowntime}
                />
              </Col>
            </Row>
            <InputLabel>Units produced per hour by the production line at full capacity</InputLabel>
            <Row>
              <Col span={24}>
                <InputNumber
                  min={1}
                  style={{ width: '90%' }}
                  onChange={onChangeproductionRate}
                  value={productionRate}
                />
              </Col>
            </Row>
            <InputLabel>Total units produced in a day</InputLabel>
            <Row>
              <Col span={24}>
                <InputNumber
                  min={1}
                  max={
                    productionRate *
                    (numberOfShifts * shiftDuration - plannedDowntime - unPlannedDowntime)
                  }
                  style={{ width: '90%' }}
                  onChange={onChangeactualProduction}
                  value={actualProduction}
                />
              </Col>
            </Row>
            <InputLabel>Units rejected or reworked per day</InputLabel>
            <Row>
              <Col span={24}>
                <InputNumber
                  min={0}
                  max={actualProduction}
                  style={{ width: '90%' }}
                  onChange={onChangetotalScrap}
                  value={totalScrap}
                />
              </Col>
            </Row>
            <div style={{ margin: '20px 5px' }}>
              <Button type={'danger'} size="large" onClick={resetOeeCalculator}>
                Reset
              </Button>
              <Button
                type={'primary'}
                size="large"
                onClick={generateInsight}
                style={{ marginLeft: '10px' }}
              >
                {/* this.saveAndGenerate */}
                Save &#38; Generate Insights
              </Button>
            </div>
          </Col>
          <Col span={12}>
            <Row>
              <Col span={24}>
                <Row justify="center">
                  <StyledProgressBar
                    type="circle"
                    percent={roundOff(getOee())}
                    format={(percent) => (
                      <div>
                        {percent}% <div>OEE</div>{' '}
                      </div>
                    )}
                  />
                </Row>
              </Col>
              <Col span={24} style={{ marginTop: '30px' }}>
                <StyledSmall>Availability</StyledSmall>
                <Progress
                  percent={roundOff(100 * getAvailability())}
                  size="small"
                  status="active"
                />
                <StyledSmall>Performance</StyledSmall>
                <Progress percent={roundOff(100 * getPerformance())} size="small" status="active" />
                <StyledSmall>Quality</StyledSmall>
                <Progress percent={roundOff(100 * getQuality())} size="small" status="active" />
              </Col>
              <Col xs={24} style={{ marginTop: '40px' }}>
                <img src={oeePageGIF} alt="loading..." />
              </Col>
              <Col span={24}>
                <Insight
                  availability={roundOff(100 * getAvailability())}
                  performance={roundOff(100 * getPerformance())}
                  quality={roundOff(100 * getQuality())}
                  oee={roundOff(getOee())}
                  getClicked={insight}
                />
              </Col>
            </Row>
          </Col>
        </Row>
      </ContentCard>
    </>
  );
}
