import { Layout } from 'antd';
import React from 'react';
// import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { StyledHead } from '../Styling';
import Banner from './Banner';
import Tender from './Tender';

const StyledHeadText = styled(StyledHead)`
  margin: 24px;
`;
export default function ComponentLanding() {
  // const isUserLoggedIn = useSelector((state) => state.auth.isUserLoggedIn);

  return (
    <Layout>
      {/* {isUserLoggedIn ? (
        <Alert
          message="Complete app configuration for view tender applicable for you"
          banner
          closable
        />
      ) : (
        <Alert message="Login and Configure to view tender applicable to you" banner closable />
      )} */}
      <StyledHeadText>GoBizTender</StyledHeadText>
      <Banner />
      <Tender />
    </Layout>
  );
}
