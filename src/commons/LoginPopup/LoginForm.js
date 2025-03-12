/*eslint-disable*/
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Form, Input } from 'antd';
import { RED, RED_40 } from 'commons/Colors';
import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

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
export default function LoginForm(props) {
  const { form, loginAction } = props;
  const authData = useSelector((state) => state.auth.authData);
  const error = authData.error || '';
  const handleSubmit = (values) => {
    loginAction(values);
  };
  return (
    <Form
      layout="vertical"
      onFinish={handleSubmit}
      className="login-form"
      data-loc="ui-infra-login-form"
      autoComplete="off"
      form={form}
    >
      {error && (
        <ErrorBox>
          <ExclamationCircleOutlined />
          <ErrorMessage>
            <div style={{ fontWeight: 600 }}>{error}</div>
          </ErrorMessage>
        </ErrorBox>
      )}
      <Form.Item
        label="Email ID"
        name="email"
        rules={[
          { required: true, message: 'Please input your email!' },
          { type: 'email', message: 'Please input a valid Email Id' }
        ]}
      >
        <Input data-loc="ui-infra-login-username" />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          { required: true, message: 'Please input your password!' },
          {
            min: 8
          }
        ]}
      >
        <Input.Password />
      </Form.Item>
      <p>
        Didn't have an account? <a> Sign Up</a>
      </p>
    </Form>
  );
}
