import { Button } from 'antd';
import React from 'react';
import styled from 'styled-components';

export const OverlayContent = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  opacity: 0;
`;

const StyleDiv = styled.div`
  position: absolute;
  width: 120px;
  // width: fit-content;
  box-shadow: 0 4px 6px -2px rgb(0 0 0 / 5%);
  display: -ms-flexbox;
  display: flex;
  z-index: 10;
  background-color: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(8px);
  border-radius: 2px;
  padding: 0;
  line-height: 22px;
  font-size: 14px;
  top: ${(props) => (props.top ? props.top : '50%')};
  left: ${(props) => (props.left ? props.left : '50%')};
  -moz-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
  -o-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);

  button {
    margin: 0 5px;
    padding: 0;
    border: 0;
    height: inherit;
  }
`;

export default function BlurLoginText(props) {
  const { formPrefix = '' } = props;
  const handleClick = () => {
    const emailInput = document.getElementById(`${formPrefix}BlurFormEmailInput`);
    if (emailInput) emailInput.focus();
  };
  return (
    <>
      <OverlayContent />
      <StyleDiv {...props}>
        <Button type="link" onClick={handleClick}>
          Login
        </Button>
        <span className="text">to preview</span>
      </StyleDiv>
    </>
  );
}
