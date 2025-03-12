import { Button, Card, Form, Input } from 'antd';
import styled from 'styled-components';
import { LockOutlined } from '@ant-design/icons';
import { StyledText } from '../../applications/biz-tender/components/Styling';
import { OverlayContent } from './BlurLoginText';

const StyledCard = styled(Card)`
  box-sizing: border-box;

  /* Auto layout */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 16px 16px;
  gap: 8px;

  width: 332px;
  min-height: 238px;

  /* Gray / gray-1 */

  background: #ffffff;
  /* Gray/gray-5 */
  border: 1px solid #d8dde6;
  /* Elevation 1 */
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.15);
  border-radius: 6px;

  position: absolute;
  top: 50%;
  left: 50%;
  -moz-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
  -o-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);

  .ant-card-body {
    padding: 0;
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  .center-align-desc {
    align-self: center;
    margin: 5px 0;
  }

  .ant-form-item {
    margin-bottom: 10px;
  }
`;
export default function BlurLoginForm(props) {
  const { isLoggedIn = false, formPrefix = '', loginAction } = props;
  const handleSubmit = (values) => {
    loginAction(values);
  };
  return (
    <>
      {props.children}
      {!isLoggedIn && (
        <>
          <OverlayContent />
          <StyledCard>
            <LockOutlined color="#99A6BF" style={{ fontSize: '24px' }} />
            <StyledText className="center-align-desc">Login for free access</StyledText>
            <Form onFinish={handleSubmit}>
              <Form.Item
                name="email"
                rules={[
                  { required: true, message: 'Please input your email!' },
                  { type: 'email', message: 'Please input a valid Email Id' }
                ]}>
                <Input placeholder="Enter Email" id={`${formPrefix}BlurFormEmailInput`} />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[
                  { required: true, message: 'Please input your password!' },
                  {
                    min: 8
                  }
                ]}>
                <Input.Password placeholder="Enter password" />
              </Form.Item>

              <Form.Item style={{ float: 'right', margin: '0 0' }}>
                <Button type="primary" htmlType="submit" size="small" ghost>
                  Login
                </Button>
              </Form.Item>
            </Form>
            <StyledText className="center-align-desc">
              Dont have an account?
              <Button type="link" size="small">
                Sign Up
              </Button>
            </StyledText>
          </StyledCard>
        </>
      )}
    </>
  );
}
