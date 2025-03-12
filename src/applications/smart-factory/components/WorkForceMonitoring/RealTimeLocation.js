import React from 'react';
import styled from 'styled-components';
import { ContentCard } from '../styling';
import factory from './jsw_fp.png';

const StyledImg = styled.img`
  // height: 100px;
  width: 100%;
  object-fit: contain;
  object-position: center;
`;
export default function RealTimeLocation() {
  return (
    <ContentCard title="Real Time Location">
      <StyledImg src={factory} alt="alt" />
    </ContentCard>
  );
}
