/* eslint-disable */
import React from 'react';

import { Col, Row, DatePicker } from 'antd';
import styled from 'styled-components';
import { ContentCard } from '../styling';
import parse from 'html-react-parser';
// const { RangePicker } = DatePicker;
const textColor = '#B6B6B4';

const TableRow = styled(Row)`
  // margin: 10px 0;
`;
const StyledCol = styled(Col)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  min-height: 150px;
  padding: 10px;
  padding-left: 20px;

  p {
    margin-bottom: 0px;
    color: ${textColor};
    font-weight: 600;

    &.header-title {
      font-size: 22px;
    }

    &.content-text {
      //   margin-top: 30px;
      font-size: 28px;
      color: #808080;
      font-weight: 400;
    }
  }
`;
const StyledContentCard = styled(ContentCard)`
  .ant-card-body {
    padding: 0;
  }
`;
const getBorder = (index) => {
  const styleData = {
    border: '1px dotted #d1d0ce',
    'border-top': '1px dotted white',
    'border-right': '1px dotted white'
  };
  if (index >= 4) {
    styleData['border-bottom'] = '1px dotted white';
  }

  if (index === 0 || index === 4) {
    styleData['border-left'] = '1px dotted white';
  }

  return styleData;
};
export default function TableCard(props) {
  const { data, title, selectDropDown, showVideo } = props;
  // const intervalChanged = (value, dateString) => {
  //   console.log('changed');
  // };

  return (
    <StyledContentCard title={title} extra={[showVideo, selectDropDown]}>
      <Row justify="space-between">
        {/* <Col>{selectDropDown && selectDropDown}</Col> */}
        {/* <Col>
          <RangePicker picker="year" onChange={intervalChanged} />
        </Col> */}
      </Row>
      <TableRow>
        {(data || []).map((d, index) => (
          <StyledCol xs={6} style={{ ...getBorder(index) }}>
            <div>
              <p className="header-title">{d.title}</p>
              <p className="sub-title">{d.subTitle}</p>
            </div>
            <p className="content-text"> {parse(d.value || '')}</p>
          </StyledCol>
        ))}
      </TableRow>
    </StyledContentCard>
  );
}
