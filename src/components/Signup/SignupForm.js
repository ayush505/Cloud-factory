/* eslint-disable */
import { Form, Input, Button, Row, Col, Checkbox } from 'antd';
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import PhoneNumber from 'commons/PhoneNumber';
import en from 'world_countries_lists/data/countries/en/world.json';

import { ConfigProvider } from 'antd-country-phone-input';
import { useDispatch } from 'react-redux';
import actions from 'redux/actions';
import CountrySelector from 'commons/CountrySelector';
import apiService from 'apiServices';
import { isValidGstin } from './companydetailsValidate';

const Wrapper = styled.div`
  padding: 1rem;
  max-width: 400px;
  margin-top: 10px;
`;

const StyledButton = styled(Button)`
  padding-left: 7rem;
  padding-right: 7rem;

  border: '#007bff';
  width: 100%;
  .ant-btn {
    background: #f5f5f5;
  }
`;

const AcceptTermsConditions = styled.div`
  display: flex;
  margin-bottom: 10px;
  margin: 20px;
`;

const TnCLink = styled(NavLink)`
  color: #0486ff;

  &:hover {
    color: blue;
    text-decoration: none;
  }
`;
const Stylebottom = styled.p`
  color: #0486ff;
  &:hover {
    color: blue;
    text-decoration: none;
  }
`;
const ErrorText = styled.h6`
  font-size: 0.75rem;
  margin-top: 0.5rem;
  display: block;
`;
const FullPassword = styled(Row)`
  flex-wrap: wrap;
  justify-content: space-evenly;
  margin-left: 0.5rem;
`;
const Terms = styled.div`
  font-size: 0.75rem;
  color: #3d4961;
  margin-top: -1.5rem;
  margin-bottom: 2rem;
  justify-content: center;
  align-items: center;
  padding-left: 1rem;
`;
const emailAlreadyExistsMessage = () => {
  return (
    <ErrorText className="ant-alert ant-alert-error">
      {' '}
      An account has already been registered with this email.
      <a href="/login"> Log in </a>to your account.
    </ErrorText>
  );
};
const showErrorMessage = (message) => {
  return <ErrorText className="ant-alert ant-alert-error"> {message}</ErrorText>;
};
function containsSpecialChars(str) {
  const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
  return specialChars.test(str);
}

export default function SignupForm() {
  const [form] = Form.useForm();
  const [password, setPassword] = useState('');
  const [isPasswordOnFocus, handlePasswordOnFocus] = useState(false);
  const [isEightChar, setIsEightCharacters] = useState(false);
  const [isLowerCase, setLowerCase] = useState(false);
  const [isUpperCase, setUpperCase] = useState(false);
  const [isSpecialChar, setSpecialChar] = useState(false);
  const [countryOfOrigin, handleCountryOriginChange] = useState('India');
  const [ischeckboxTicked, handlecheckboxChange] = useState(true);
  const dispatch = useDispatch();

  const handlePasswordChange = (e) => {
    const { value } = e.target;
    setPassword(value);
    if (value.length >= 8) {
      setIsEightCharacters(true);
    } else {
      setIsEightCharacters(false);
    }
    if (value.toLowerCase() === value) {
      setUpperCase(false);
    } else {
      setUpperCase(true);
    }
    if (value.toUpperCase() === value) {
      setLowerCase(false);
    } else {
      setLowerCase(true);
    }
    if (containsSpecialChars(value)) {
      setSpecialChar(true);
    } else {
      setSpecialChar(false);
    }
  };
  const registerUser = (values) => {
    const {
      email,
      password,
      firstName,
      lastName,
      checkGst,
      companyName,
      country,
      gstin,
      pan,
      PhoneNumber
    } = values;

    const obj = {
      email,
      password,
      firstName,
      lastName
    };
    try {
      dispatch(actions.signup(obj));
    } catch (error) {
      console.log(error);
    }
  };
  const handleEmailValidation = async (_, email) => {
    try {
      const response = await apiService.validateEmailAPI({ email });

      if (response.user.error) return Promise.reject(response.user.message);
      return Promise.resolve(true);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const fetchgstin = async (value) => {
    const response = await apiService.fetchGstinDetailsApiForSignup({ gstin: value });
  };

  const checkGSTInput = (value) => {
    if (isValidGstin(value)) {
      // setGstinValidity(true);
      fetchgstin(value);
    }
  };
  return (
    <Wrapper>
      <ConfigProvider locale={en}>
        <Form
          layout="vertical"
          onFinish={registerUser}
          className="login-form"
          data-loc="ui-infra-signup-form"
          scrollToFirstError="true"
          form={form}
          onFinishFailed={registerUser}
          initialValues={{
            checkGst: ischeckboxTicked,
            country: {
              name: countryOfOrigin
            }
          }}
        >
          <Form.Item
            name="email"
            label="Email Address"
            validateFirst
            validateTrigger="onBlur"
            rules={[
              {
                type: 'email',
                message: showErrorMessage('The input is not valid E-mail!')
              },
              {
                required: true,
                message: showErrorMessage('Please input your E-mail!')
              },
              {
                validator: handleEmailValidation,
                message: emailAlreadyExistsMessage()
              }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[
              {
                required: true,
                message: showErrorMessage('Password is required')
              },
              {
                pattern: new RegExp(
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
                ),
                message: (
                  <p style={{ display: 'none' }}>
                    Password must contain atleast one uppercase, one lowecase, one number and one
                    special character!
                  </p>
                )
              }
            ]}
          >
            <Input.Password
              onFocus={() => handlePasswordOnFocus(true)}
              onBlur={() => {
                if (isEightChar && isSpecialChar && isUpperCase && isLowerCase) {
                  handlePasswordOnFocus(false);
                }
              }}
              onChange={handlePasswordChange}
            />
          </Form.Item>
          {isPasswordOnFocus && (
            <FullPassword>
              <div style={{ display: 'flex', flexDirection: 'column', lineHeight: '0.8' }}>
                <p
                  style={{
                    fontSize: '0.7rem',
                    marginRight: '1rem',
                    color: isEightChar ? '#26b37a' : '#d31028'
                  }}
                >
                  • 8 characters minimum
                </p>
                <p style={{ fontSize: '0.7rem', color: isSpecialChar ? '#26b37a' : '#d31028' }}>
                  • One special character
                </p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', lineHeight: '0.8' }}>
                <p
                  style={{
                    fontSize: '0.7rem',
                    marginRight: '1rem',
                    color: isLowerCase ? '#26b37a' : '#d31028'
                  }}
                >
                  • One lowercase character
                </p>
                <p style={{ fontSize: '0.7rem', color: isUpperCase ? '#26b37a' : '#d31028' }}>
                  • One uppercase character
                </p>
              </div>
            </FullPassword>
          )}

          <Form.Item label="Country/Region" name="country">
            <CountrySelector
            // defaultValue={countryOfOrigin}
            // onChange={(countryObj) => {
            //   handleCountryOriginChange(countryObj.name);
            // }}
            />
          </Form.Item>
          {countryOfOrigin === 'India' && (
            <Form.Item name="checkGst" valuePropName="checked">
              <Checkbox
                checked={ischeckboxTicked}
                onChange={(e) => handlecheckboxChange(e.target.checked)}
              >
                Use GSTIN to fetch your company details
              </Checkbox>
            </Form.Item>
          )}
          {ischeckboxTicked && (
            <>
              <Form.Item label="GSTIN" name="gstin">
                <Input
                  placeholder="example: XYZ00001234"
                  onBlur={(e) => checkGSTInput(e.target.value)}
                />
              </Form.Item>

              <Form.Item label="PAN" name="pan">
                <Input />
              </Form.Item>
            </>
          )}
          <Form.Item
            label="Company (legal) Name"
            name="comapnyName"

            // rules={[
            //   {
            //     validator: handleEmailValidation,
            //     message: showErrorMessage('Someone has already registered this company on Partner Hub.Please contact your administrator')
            //   }
            // ]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Name">
            <Row justify="space-between">
              <Col xs={24} md={11}>
                <Form.Item
                  name="firstName"
                  rules={[{ required: true, message: showErrorMessage('First Name is required') }]}
                >
                  <Input placeholder="First Name" />
                </Form.Item>
              </Col>
              <Col xs={24} md={11}>
                <Form.Item
                  name="lastName"
                  rules={[{ required: true, message: showErrorMessage('Last Name is required') }]}
                >
                  <Input placeholder="Last Name" />
                </Form.Item>
              </Col>
            </Row>
          </Form.Item>

          <PhoneNumber />

          <Form.Item>
            <StyledButton
              type="primary"
              htmlType="submit"
              className="signup-form-button"
              data-loc="ui-infra-signup-submit"
            >
              Sign up
            </StyledButton>
          </Form.Item>
        </Form>

        <AcceptTermsConditions>
          <Terms>
            By signing up, you are indicating that you have read and agree to Bizongo's
            <TnCLink to="/terms" target="blank">
              {' '}
              Terms & Conditions
            </TnCLink>
          </Terms>
        </AcceptTermsConditions>

        <Stylebottom style={{ color: '#7A8AAC', fontSize: '12px', paddingLeft: '4.5rem' }}>
          Already have an account?
          <TnCLink to="/login"> Log in</TnCLink>
        </Stylebottom>
      </ConfigProvider>
    </Wrapper>
  );
}
