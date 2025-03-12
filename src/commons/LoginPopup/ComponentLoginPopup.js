/*eslint-disable */
import { Button, Form, Input, Modal } from 'antd';
import React from 'react';
import LoginForm from './LoginForm';
// import LoginForm from './LoginForm';

export default function ComponentLoginPopup(props) {
  const { isVisible = false, setIsVisible, loginAction } = props;

  const [form] = Form.useForm();
  const handleCancel = () => {
    form.resetFields();
    setIsVisible(false);
  };
  const handleOk = () => {
    form.submit();
  };
  return (
    <Modal title="Login" visible={isVisible} onCancel={handleCancel} onOk={handleOk}>
      <LoginForm form={form} loginAction={loginAction} />
    </Modal>
  );
}
