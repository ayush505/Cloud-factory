import { Col, Row } from 'antd';
import Loader from 'commons/Loader';
import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import AppComponents from './AppComponents';
import MenuComponent from './MenuComponent';

const StyledRow = styled(Row)`
  padding: 40px;
`;

export default function Index() {
  const loading = useSelector((state) => state.allApps.loading);

  return (
    <StyledRow className="market-place-content-app-container">
      {loading ? (
        <Loader />
      ) : (
        <>
          <Col
            xs={0}
            sm={10}
            md={5}
            // lg={5}
            className="market-place-content-app-container-side_menu">
            <MenuComponent />
          </Col>
          <Col
            xs={24}
            sm={{ span: 13, offset: 1 }}
            md={18}
            // lg={18}
            className="market-place-content-app-container-main_content">
            <AppComponents />
          </Col>
        </>
      )}
    </StyledRow>
  );
}
