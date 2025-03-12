import { Col, Layout, Row } from 'antd';
import React from 'react';
import styled from 'styled-components';
import Proptypes from 'prop-types';
import LoginCard from './LoginCard';

const { Content } = Layout;

const StyledLayout = styled(Layout)`
  width: 100ww;
`;

const StyledRow = styled(Row)``;
const StyledRightImage = styled.img`
  width: 100%;
`;
export default function LoginPage(props) {
  const { data } = props;
  const {
    rightImage,
    resetPassword,
    onAction,
    actionPending,
    googleLogin,
    googleClientId,
    errorMessages,
    errorDetails,
    localeType,
    comboLogin,
    className
  } = data;

  return (
    <StyledLayout>
      <Content className={className}>
        <StyledRow align="middle" justify="center" className="login-page-content">
          <Col xxl={5} xl={7} lg={9} md={16} sm={24} xs={24}>
            <LoginCard
              onAction={onAction}
              actionPending={actionPending}
              resetPassword={resetPassword}
              googleLogin={googleLogin}
              googleClientId={googleClientId}
              errorMessages={errorMessages}
              errorDetails={errorDetails}
              localeType={localeType}
              comboLogin={comboLogin}
            />
          </Col>
          <Col offset={2} xl={9} lg={9} md={0} sm={0} xs={0}>
            <StyledRightImage src={rightImage} alt="placeholder" />
          </Col>
        </StyledRow>
      </Content>
    </StyledLayout>
  );
}

LoginPage.defaultProps = {
  data: {
    googleLogin: false,
    googleClientId: '',
    actionPending: false,
    errorMessages: [],
    errorDetails: [],
    localeType: 'en',
    comboLogin: false,
    headerData: {},
    footerData: {},
    rightImage: '',
    resetPassword: false,
    className: ''
  }
};

LoginPage.propTypes = {
  data: Proptypes.objectOf(
    Proptypes.shape({
      headerData: Proptypes.objectOf(
        Proptypes.shape({
          className: Proptypes.string,
          ghost: false,
          avatar: Proptypes.objectOf(
            Proptypes.shape({
              logo: Proptypes.string.isRequired
            })
          ),
          title: Proptypes.string.isRequired,
          subTitle: Proptypes.string.isRequired
        })
      ),
      footerData: Proptypes.objectOf(
        Proptypes.shape({
          className: Proptypes.string
        })
      ),
      onAction: Proptypes.func.isRequired,
      actionPending: Proptypes.bool.isRequired,
      errorMessages: Proptypes.arrayOf(Proptypes.string),
      errorDetails: Proptypes.arrayOf(Proptypes.string),
      googleLogin: Proptypes.bool,
      googleClientId: Proptypes.string,
      localeType: Proptypes.string,
      comboLogin: Proptypes.bool
    })
  )
};
