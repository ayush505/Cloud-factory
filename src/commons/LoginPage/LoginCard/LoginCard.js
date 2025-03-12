import { Card } from 'antd';
import React from 'react';
import styled from 'styled-components';
import Proptypes from 'prop-types';
import LoginForm from './LoginForm';
import GoogleLoginForm from './GoogleLoginForm';

const StyledCard = styled(Card)`
  padding: 20px 20px;
  width: 100%;
`;
export default function LoginCard(props) {
  const {
    onAction,
    actionPending,
    resetPassword,
    googleLogin,
    googleClientId,
    errorMessages,
    errorDetails,
    localeType,
    comboLogin,
    className
  } = props;
  return (
    <StyledCard className={className}>
      {googleLogin ? (
        <GoogleLoginForm
          onAction={onAction}
          actionPending={actionPending}
          googleClientId={googleClientId}
          loading={actionPending}
        />
      ) : (
        <LoginForm
          onAction={onAction}
          actionPending={actionPending}
          resetPassword={resetPassword}
          errorMessages={errorMessages}
          errorDetails={errorDetails}
          localeType={localeType}
          googleClientId={googleClientId}
          comboLogin={comboLogin}
        />
      )}
    </StyledCard>
  );
}

LoginCard.defaultProps = {
  actionPending: false,
  googleLogin: false,
  googleClientId: '',
  errorMessages: [],
  errorDetails: [],
  localeType: 'en',
  comboLogin: false,
  className: '',
  resetPassword: undefined
};

LoginCard.propTypes = {
  actionPending: Proptypes.bool,
  onAction: Proptypes.func.isRequired,
  googleLogin: Proptypes.bool,
  googleClientId: Proptypes.string,
  errorMessages: Proptypes.arrayOf(Proptypes.string),
  errorDetails: Proptypes.arrayOf(Proptypes.string),
  localeType: Proptypes.string,
  comboLogin: Proptypes.bool,
  className: Proptypes.string
};
