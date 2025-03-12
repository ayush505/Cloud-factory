/* eslint-disable */
import React, { useState } from 'react';
import { Col, Input, Table, Row, InputNumber, Radio, Button } from 'antd';
import styled from 'styled-components';
import { Space, Tag } from 'antd';
import currentImageUrl from '../../assets/vsm_base.png';
import currentImageUrlget from '../../assets/vsm_base2.png';
import { ContentCard, PageHeaderText } from '../styling';

const { Column } = Table;

const Wrapper = styled.div`
  background-color: white;
  margin: 5px;
`;
const DetailsGrid = styled.div`
  display: grid;
  grid-gap: 20px;
  padding-right: 15px;
  .ant-input-number {
    width: 100% !important;
  }
`;
const InputLabel = styled.label`
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  color: #3e4977;
  display: block;
  margin: 20px 0 10px 5px;
`;
const StyledDiv = styled.div`
  margin: 30px 0px;
`;
const StyledDivImageContainer = styled(StyledDiv)`
  img {
    width: 100%;
  }
`;

const StyledSmall = styled.small`
  color: ${(props) => props.color || '#99A6BF'};
  font-size: ${(props) => props.size || '12px'};
  font-weight: ${(props) => props.weight || 'normal'};
`;

const data = [
  {
    key: '1',
    Detail: 'Uptime (%)',
    Column1: 'John',
    Column2: 'Brown',
    Column3: 32,
    Column4: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer']
  },
  {
    key: '2',
    Detail: 'Cycle Time (mins per part) ',
    Column1: 'John',
    Column2: 'Brown',
    Column3: 32,
    Column4: 'New York No. 1 Lake Park',
    tags: ['loser']
  },
  {
    key: '3',
    Detail: 'Changover Time (mins per job change)',
    Column1: 'John',
    Column2: 'Brown',
    Column3: 32,
    Column4: 'New York No. 1 Lake Park',
    tags: ['cool', 'teacher']
  },
  {
    key: '4',
    Detail: 'In-line Holding Inventory (kgs)',
    Column1: 'John',
    Column2: 'Brown',
    Column3: 32,
    Column4: 'New York No. 1 Lake Park',
    tags: ['cool', 'teacher']
  }
];

// const columns = [
//     {
//       title: 'Name',
//       dataIndex: 'item',
//       align: 'left',
//       width: '50%'
//     },
//     {
//       title: 'Quantity',
//       dataIndex: 'quantity',
//       align: 'right'
//     },
//     {
//       title: 'Rate',
//       dataIndex: 'price',
//       align: 'right'
//     },
//     {
//         title: 'value',
//         dataIndex: 'price',
//         align: 'right'
//       }
//   ];

//   const dataSource = [
//     {
//       type: 'Revenue',
//       requirement: 10
//     },
//     {
//       type: 'Company Age',
//       requirement: 20
//     },
//     {
//       type: 'Experience',
//       requirement:30
//     }
//   ];

export default function ValueSteamContainer() {
  const [productName, setproductName] = useState('test');
  const [ihvolume, setihvolume] = useState(100);
  const [osSheduling, setosSheduling] = useState(2);
  const [customOrderFrequency, setCustomOrderFrequency] = useState(2);
  const [inventoryReplenishmentTime, setinventoryReplenishmentTime] = useState(2);
  const [dispatchInventoryHolding, setdispatchInventoryHolding] = useState(2);
  const [orderPlacementTime, setorderPlacementTime] = useState(2);
  const [productionLeadTime, setproductionLeadTime] = useState(2);
  const [toMarketing, settoMarketing] = useState(2);
  const [toProduction, settoProduction] = useState(1);
  const [toFactoryFloor, settoFactoryFloor] = useState(2);
  const [deliveryDuration, setdeliveryDuration] = useState(2);
  const [generatevsm, setgeneratevsm] = useState(false);

  const onChangeProductName = (event) => {
    setproductName(event.target.value);
    console.log(productName);
  };
  const onChangeihvolume = (event) => {
    setihvolume(event);
    console.log(ihvolume);
  };
  const onChangeosSheduling = (event) => {
    setosSheduling(event);
    console.log(osSheduling);
  };
  const onChangeCustomOrderFrequency = (event) => {
    setCustomOrderFrequency(event);
    console.log(customOrderFrequency);
  };
  const onChangeinventoryReplenishmentTime = (event) => {
    setinventoryReplenishmentTime(event);
    console.log(inventoryReplenishmentTime);
  };
  const onChangedispatchInventoryHolding = (event) => {
    setdispatchInventoryHolding(event);
    console.log(dispatchInventoryHolding);
  };
  const onChangeorderPlacementTime = (event) => {
    setorderPlacementTime(event);
    console.log(orderPlacementTime);
  };
  const onChangeproductionLeadTime = (event) => {
    setproductionLeadTime(event);
    console.log(productionLeadTime);
  };
  const onChangedeliveryDuration = (event) => {
    setdeliveryDuration(event);
    console.log(deliveryDuration);
  };
  const onChangetoMarketing = (event) => {
    settoMarketing(event.target.value);
    console.log(toMarketing);
  };
  const onChangetoProduction = (event) => {
    settoProduction(event.target.value);
    console.log(toProduction);
  };
  const onChangetoFactoryFloor = (event) => {
    settoFactoryFloor(event.target.value);
    console.log(toFactoryFloor);
  };
  const onClickgeneratevsm = (event) => {
    setgeneratevsm(true);
    console.log(generatevsm);
  };

  return (
    <>
      {/* <PageHeaderText>Value Stream Mapping</PageHeaderText> */}
      <ContentCard title="Product Details">
        <Row>
          <Col span={10}>
            <DetailsGrid>
              <div>
                <InputLabel>Prodcut Name</InputLabel>
                <Input value={productName} onChange={onChangeProductName} />
              </div>
              <div>
                <InputLabel>Inventory holding volume (in kg)</InputLabel>
                <InputNumber value={ihvolume} onChange={onChangeihvolume} />
              </div>
              <div>
                <InputLabel>Order scheduling frequency (in days)</InputLabel>
                <InputNumber value={osSheduling} onChange={onChangeosSheduling} />
              </div>
            </DetailsGrid>
          </Col>
          <Col span={10}>
            <DetailsGrid>
              <div>
                <InputLabel>Custom order frequency (in days)</InputLabel>
                <InputNumber value={customOrderFrequency} onChange={onChangeCustomOrderFrequency} />
              </div>
              <div>
                <InputLabel>Inventory replenishment time (in days)</InputLabel>
                <InputNumber
                  value={inventoryReplenishmentTime}
                  onChange={onChangeinventoryReplenishmentTime}
                />
              </div>
              <div>
                <InputLabel>Dispatch inventory holding volume (in days)</InputLabel>
                <InputNumber
                  value={dispatchInventoryHolding}
                  onChange={onChangedispatchInventoryHolding}
                />
              </div>
            </DetailsGrid>
          </Col>
          <Row style={{ marginTop: '20px' }}>
            <Col span={24}>
              <DetailsGrid style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
                <div>
                  <InputLabel>Order placement time (in days)</InputLabel>
                  <InputNumber value={orderPlacementTime} onChange={onChangeorderPlacementTime} />
                </div>
                <div>
                  <InputLabel>Production Lead time (in days)</InputLabel>
                  <InputNumber value={productionLeadTime} onChange={onChangeproductionLeadTime} />
                </div>
                <div>
                  <InputLabel>Delivery duration (in days)</InputLabel>
                  <InputNumber value={deliveryDuration} onChange={onChangedeliveryDuration} />
                </div>
              </DetailsGrid>
            </Col>
          </Row>

          <StyledDiv>
            <h3 style={{ margin: '10px 0px' }}>
              How does your customer requirement flow in the following?
            </h3>
            <Row>
              <Col span={8}>
                <StyledSmall>Consider to marketing</StyledSmall>
                <Radio.Group onChange={onChangetoMarketing} value={toMarketing}>
                  <Radio value={1}>Manual</Radio>
                  <Radio value={2}>Automated</Radio>
                </Radio.Group>
              </Col>
              <Col span={8}>
                <StyledSmall>Marketing to production</StyledSmall>
                <Radio.Group onChange={onChangetoProduction} value={toProduction}>
                  <Radio value={1}>Manual</Radio>
                  <Radio value={2}>Automated</Radio>
                </Radio.Group>
              </Col>
              <Col span={8}>
                <Row>
                  <StyledSmall>Production to Factory Floor</StyledSmall>
                </Row>
                <Row>
                  <Radio.Group onChange={onChangetoFactoryFloor} value={toFactoryFloor}>
                    <Radio value={1}>Manual</Radio>
                    <Radio value={2}>Automated</Radio>
                  </Radio.Group>
                </Row>
              </Col>
            </Row>
          </StyledDiv>
          <Col span={24}>
            <StyledDiv>
              <h3 style={{ margin: '10px 0px' }}>Machine details</h3>
              <>
                <Table pagination={false} bordered="true" dataSource={data}>
                  <Column title="" dataIndex="Detail" key="Detail" />
                  <Column
                    title="Column 1"
                    dataIndex="Column1"
                    key="Column1"
                    render={(tags) => (
                      <>
                        <InputNumber />
                      </>
                    )}
                  />
                  <Column
                    title="Column 2"
                    dataIndex="Column2"
                    key="Column2"
                    render={(tags) => (
                      <>
                        <InputNumber />
                      </>
                    )}
                  />
                  <Column
                    title="Column 3"
                    dataIndex="Column3"
                    key="Column3"
                    render={(tags) => (
                      <>
                        <InputNumber />
                      </>
                    )}
                  />
                  <Column
                    title="Column 4"
                    dataIndex="Column4"
                    key="Column4"
                    render={(tags) => (
                      <>
                        <InputNumber />
                      </>
                    )}
                  />
                </Table>
                <Button
                  type="primary"
                  style={{ margin: '10px 0px' }}
                  size="large"
                  onClick={onClickgeneratevsm}
                >
                  Generate VSM
                </Button>
              </>
              <StyledDiv>
                {generatevsm ? (
                  <>
                    <h2>Insights</h2>
                    <div>
                      <h3>
                        a.) Machine m4 is your bottleneck with highest cycle time. You should add
                        additional machinery if capex is available or try to improve its efficiency.
                      </h3>

                      <h3>
                        b.) You have on-time full deliveries (OTIF), you can improve your marketing
                        to source more orders and increase capacity utilisation.
                      </h3>
                      <h3>
                        b.) You have good demand but delayed deliveries. If sufficient capacity is
                        available, you should exand your suppliers network and decrease per unit
                        production time.
                      </h3>
                    </div>
                  </>
                ) : null}
              </StyledDiv>
            </StyledDiv>

            <StyledDivImageContainer>
              {!generatevsm && <img src={currentImageUrl} alt="loading..." />}
              {generatevsm && <img src={currentImageUrlget} alt="loading..." />}
            </StyledDivImageContainer>
          </Col>
        </Row>
      </ContentCard>
    </>
  );
}
