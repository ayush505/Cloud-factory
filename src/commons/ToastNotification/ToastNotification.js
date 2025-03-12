import * as React from 'react';
import { notification } from 'antd';
import styled from 'styled-components';
import {
  ExclamationCircleFilled,
  InfoOutlined,
  InfoCircleFilled,
  WarningFilled
} from '@ant-design/icons';
import { errorMap } from '../Constants';

const StyledActionContainer = styled.div`
  float: right;
  margin-top: 10px;
`;

function ToastNotification({
  errorResponseProp,
  typeProp,
  messageProp,
  descriptionProp,
  descriptionListProp,
  descriptionActionsProp,
  styleProp,
  durationProp,
  buttonProp,
  className = 'market-place-toast-notification'
}) {
  let style;
  let icon;
  let message;
  let description;

  if (errorResponseProp && errorResponseProp.status && errorResponseProp.errors.length) {
    message = `${errorResponseProp.status} - ${errorMap[errorResponseProp.status].message}`;
    description = errorMap[errorResponseProp.status].description;
    style = {
      backgroundColor: '#FFEBEE',
      border: '1px solid #FEBFC7',
      color: '#3D4961'
    };
    icon = <ExclamationCircleFilled style={{ color: '#D0021B' }} />;
    notification.open({
      message,
      icon,
      style: { ...style, ...styleProp },
      duration: durationProp,
      className,
      description: (
        <>
          {description}
          <ul style={{ padding: '10px 0 0 20px', margin: 0 }}>
            {errorResponseProp.errors.map((error) => {
              return (
                error.detail && (
                  <li>
                    {typeof error.detail === 'string' ? error.detail : JSON.stringify(error.detail)}
                  </li>
                )
              );
            })}
          </ul>
          {/* <StyledActionContainer>{descriptionActionsProp}</StyledActionContainer> */}
        </>
      )
    });
  } else {
    switch (typeProp) {
      case 'INFO': {
        style = {
          backgroundColor: '#F1F8FF',
          border: '1px solid #0486FF',
          color: '#506080'
        };
        icon = <InfoCircleFilled style={{ color: '#0486FF' }} />;
        break;
      }
      case 'WARNING': {
        style = {
          backgroundColor: '#FFF8E2',
          border: '1px solid #FD9F28',
          color: '#3D4961'
        };
        icon = <WarningFilled style={{ color: '#FD9F28' }} />;
        break;
      }
      case 'SUCCESS': {
        style = {
          backgroundColor: '#E8F8F1',
          border: '1px solid #0BA968',
          color: '#3D4961'
        };
        icon = <InfoCircleFilled style={{ color: '#0BA968' }} />;
        break;
      }
      case 'ERROR': {
        style = {
          backgroundColor: '#FFEBEE',
          border: '1px solid #FEBFC7',
          color: '#3D4961'
        };
        icon = <ExclamationCircleFilled style={{ color: '#D0021B' }} />;
        break;
      }
      default: {
        style = {
          backgroundColor: '#F1F8FF',
          border: '1px solid #0486FF',
          color: '#506080'
        };
        icon = <InfoOutlined />;
        break;
      }
    }
    notification.open({
      message: messageProp,
      icon,
      style: { ...style, ...styleProp },
      duration: durationProp,
      btn: buttonProp,
      className,
      description: (
        <>
          {descriptionProp}
          <ul style={{ padding: '10px 0 0 20px', margin: 0 }}>
            {descriptionListProp &&
              descriptionListProp.map((error) => {
                return (
                  <li key={Math.random()}>
                    {typeof error === 'string' ? error : JSON.stringify(error)}
                  </li>
                );
              })}
          </ul>
          <StyledActionContainer>{descriptionActionsProp}</StyledActionContainer>
        </>
      )
    });
  }
  return null;
}

export default ToastNotification;
