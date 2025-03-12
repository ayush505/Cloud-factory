import { Spin } from 'antd';
import React from 'react';
import styled from 'styled-components';

const CenteredDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;
export default function Loader() {
  return (
    <CenteredDiv>
      <Spin />
    </CenteredDiv>
  );
}
