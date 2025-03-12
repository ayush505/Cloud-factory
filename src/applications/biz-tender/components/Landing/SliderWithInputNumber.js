/* eslint-disable */
import { Col, Form, Input, Row, Slider } from 'antd';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { StyledText } from '../Styling';

const SliderInputRow = styled(Row)`
  // .ant-input-suffix {
  //   color: #99A6BF;
  // }
  // .ant-slider-rail {
  //   background: #E2E6ED;
  // }
  // .ant-slider-track {
  //   background: #0486FF;
  // }
  // .ant-slider-handle {
  //   border-color: #0486FF;
  // }
`;

export default function SliderWithInputNumber(props) {
  const { label, name, suffix, minRange = 0, maxRange = 100, defaultValue } = props;
  const form = Form.useFormInstance();
  const [inputValue, setInputValue] = useState(defaultValue || 0);

  const onChange = (newValue) => {
    if (typeof newValue === 'object') {
      let value = parseInt(newValue.target.value);
      setInputValue(value);
    } else {
      setInputValue(newValue);
      form.setFieldsValue({ [name]: newValue });
      form.validateFields([name]);
    }
  };

  const onInputChange = (e) => {
    let value = parseInt(e.target.value);
    if (value > maxRange) value = maxRange;
    else if (value < minRange) value = minRange;
    e.target.value = value;
  };
  const check = (e) => {
    setInputValue(form.getFieldsValue()[name]);
  };

  useEffect(() => {
    setInputValue(defaultValue || 0);
  }, [defaultValue]);

  return (
    <SliderInputRow>
      <Col xs={24} className="header-label">
        <StyledText>{label}</StyledText>
      </Col>

      <Col xs={13}>
        <Slider
          max={maxRange}
          onChange={onChange}
          value={isNaN(inputValue) ? 0 : parseInt(inputValue)}
        />
      </Col>
      <Col xs={1} />
      <Col xs={10}>
        <Form.Item name={name} onReset={check}>
          <Input
            type="number"
            style={{ width: '100%' }}
            suffix={suffix}
            onChange={onChange}
            onInput={onInputChange}
            max={maxRange}
            className="hide-input-number-arrow"
          />
        </Form.Item>
      </Col>
    </SliderInputRow>
  );
}
