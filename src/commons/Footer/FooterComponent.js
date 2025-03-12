import React from 'react';
import { Row, Col } from 'antd';
import styled from 'styled-components';

const AppFooter = styled.div`
  width: 100%;
  background-color: ${(props) => props.bgColor || 'black'};
  color: ${(props) => props.color || 'white'};
  text-align: center;
  height: 56px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: ${(props) => props.border || ''};
  border-width: 1px 0;
  padding: 17px 0;
`;
function FooterComponent(props) {
  const { data } = props;
  return (
    <AppFooter {...data}>
      <Row type="flex" justify="space-around">
        <Col span={24}>
          © 2014-{new Date().getFullYear()} Smartpaddle Technology Pvt. Ltd. All rights reserved.
        </Col>
      </Row>
    </AppFooter>
  );
}
export default FooterComponent;
