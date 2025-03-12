import { Form } from 'antd';
import CountryPhoneInput from 'antd-country-phone-input';
import React from 'react';
import styled from 'styled-components';
import 'antd-country-phone-input/dist/index.css';

const Container = styled.div``;
export default function PhoneNumber({ className, rules }) {
  return (
    <Container className={className} data-loc="ui-infra-phone-number-container">
      <Form.Item
        name="phoneNumber"
        type="number"
        label="Phone Number"
        initialValue={{
          short: 'in'
        }}
        rules={rules}>
        <CountryPhoneInput />
      </Form.Item>
    </Container>
  );
}
