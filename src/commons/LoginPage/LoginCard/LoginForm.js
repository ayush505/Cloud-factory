import { Button, Input, Form, Typography } from 'antd';
import React from 'react';
import styled from 'styled-components';
import Proptypes from 'prop-types';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import localeStrings from './locales';
import { RED, RED_40 } from '../../../themes/colors';
import GoogleLoginFormArtwork from './GoogleLoginFormArtwork';

const { Title } = Typography;
const StyledForm = styled(Form)`
  align: center;
  width: 100%;

  label {
    font-weight: 600;
    margin-bottom: 0px;
  }
`;
const StyledTitle = styled(Title)`
  text-align: center;
  margin-bottom: 32px;
  margin-top: 0;
`;
const StyledLink = styled(Button)`
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  margin-bottom: 32px;
  margin-right: -15px;
  margin-left: -15px;
`;
const ErrorBox = styled.div`
  font-size: 13px;
  color: ${RED};
  display: flex;
  align-items: center;
  padding: 12px;
  margin: 25px 0;
  background-color: ${RED_40};
  border: 1px solid ${RED};
  border-radius: 4px;
  margin-right: -8px;
  margin-left: -8px;
  flex-direction: row;

  span {
    margin-right: 10px;
  }
`;
const ErrorMessage = styled.div`
  font-size: 11px;
  color: ${RED};
  display: flex;
  flex-direction: column;
`;
function LoginForm(props) {
  const {
    onAction,
    actionPending,
    resetPassword,
    errorMessages,
    errorDetails,
    localeType,
    googleClientId,
    comboLogin
  } = props;
  const handleSubmit = (values) => {
    onAction(values);
  };
  return (
    <StyledForm
      layout="vertical"
      onFinish={handleSubmit}
      className="login-form"
      data-loc="ui-infra-login-form">
      <StyledTitle>{localeStrings[localeType].welcome}</StyledTitle>
      {errorMessages.length > 0 && (
        <ErrorBox>
          <ExclamationCircleOutlined />
          <ErrorMessage>
            <div style={{ fontWeight: 600 }}>{errorMessages.join(', ')}</div>
            {errorDetails.length > 0 && <div>{errorDetails.join(', ')}</div>}
          </ErrorMessage>
        </ErrorBox>
      )}
      <Form.Item label={localeStrings[localeType].email}>
        <Form.Item
          name={localeStrings[localeType].email}
          noStyle
          rules={[
            {
              required: true,
              message: `${localeStrings[localeType].emailMessage}`
            },
            {
              type: 'email',
              message: `${localeStrings[localeType].validEmail}`
            }
          ]}>
          <Input data-loc="ui-infra-login-username" />
        </Form.Item>
      </Form.Item>
      <Form.Item label={localeStrings[localeType].password}>
        <Form.Item
          name={localeStrings[localeType].password}
          noStyle
          rules={[
            {
              required: true,
              message: `${localeStrings[localeType].password}`
            },
            {
              min: 8
            }
          ]}>
          <Input.Password
            data-analytics-id="bz-input-password"
            data-loc="ui-infra-login-password"
          />
        </Form.Item>
      </Form.Item>
      <Form.Item>
        {resetPassword && (
          <StyledLink
            type="link"
            className="login-form-forgot"
            data-loc="ui-infra-forgot-password"
            onClick={resetPassword}>
            {localeStrings[localeType].forgotPassword}
          </StyledLink>
        )}
        <Button
          type="primary"
          htmlType="submit"
          className="login-form-button"
          data-loc="ui-infra-login-submit"
          loading={actionPending}
          block>
          {localeStrings[localeType].login}
        </Button>
      </Form.Item>
      {comboLogin ? (
        <div>
          {' '}
          <GoogleLoginFormArtwork
            onAction={onAction}
            actionPending={actionPending}
            googleClientId={googleClientId}
            loading={actionPending}
            comboLogin={comboLogin}
            localeType={localeType}
          />{' '}
        </div>
      ) : (
        ''
      )}
    </StyledForm>
  );
}

LoginForm.defaultProps = {
  errorMessages: [],
  errorDetails: [],
  resetPassword: null,
  comboLogin: false,
  actionPending: false,
  localeType: 'en',
  googleClientId: ''
};

LoginForm.propTypes = {
  resetPassword: Proptypes.func,
  onAction: Proptypes.func.isRequired,
  errorMessages: Proptypes.arrayOf(Proptypes.string),
  errorDetails: Proptypes.arrayOf(Proptypes.string),
  comboLogin: Proptypes.bool,
  actionPending: Proptypes.bool,
  localeType: Proptypes.string,
  googleClientId: Proptypes.string
};

export default LoginForm;
