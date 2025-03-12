/* eslint-disable */
import React from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Card, Col, Row } from 'antd';
import styled from 'styled-components';

const StyledCard = styled(Card)`
  width: 320px;
  height: 75px;
  margin: 4px;

  // https://getcssscan.com/css-box-shadow-examples
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  .ant-card-body {
    padding: 5px;
    box-sizing: border-box;

    .content {
      padding: 6px;
      padding-left: 10px;
      p {
        margin-bottom: 3px;
      }
      .titleP {
        font-weight: 600;
      }
      .contentP {
        font-weight: bold;
      }
    }
  }
`;

const StyledImg = styled.img`
  height: 65px;
  background: ${(props) => props.bgColor || 'black'};
`;
export default function KPICard(props) {
  const { logo, title, content, logoBgColor } = props;
  return (
    <StyledCard>
      <Row>
        <Col xs={6} className="side-logo">
          <StyledImg src={logo} alt={title} bgColor={logoBgColor} />
        </Col>
        <Col xs={18} className="content">
          <p className="titleP">{title}</p>
          <p className="contentP">{content}</p>
        </Col>
      </Row>
    </StyledCard>
  );
}
