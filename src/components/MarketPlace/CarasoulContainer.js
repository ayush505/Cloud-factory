import { Carousel, Col, Row } from 'antd';
import frames from 'dummyData/frames';
import React from 'react';
import styled from 'styled-components';
import './Carousel.css';

const StyledRow = styled(Row)`
  background-color: #e5e5e5;
`;
const ResponsiveStyleCol = styled(Col)`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: start;

  font-family: 'Open Sans';
  font-style: normal;

  padding: 20px 40px;
  h1 {
    font-family: 'Open Sans';
    font-weight: 600;
    line-height: 38px;
    color: #3d4961;
  }

  p {
    font-weight: 400;
    color: #3d4961;
    text-align: start;
  }
`;

const StyledCol = styled(Col)`
  height: 200px;

  .ant-carousel {
    height: inherit;
    img {
      object-fit: fill;
    }
  }
`;

export default function CarasoulContainer() {
  return (
    <StyledRow id="carasoulContainer" className="market-place-content-carasoul-container">
      <ResponsiveStyleCol xs={24} lg={6}>
        <div>
          <h1>Explore Apps</h1>
          <p>Solve Challenges with apps tailored for wide range of business needs</p>
        </div>
      </ResponsiveStyleCol>
      <StyledCol xs={24} lg={{ span: 18 }}>
        <Carousel autoplay>
          {frames.map((frame) => (
            <img src={frame} alt="loading" key={frame} />
          ))}
        </Carousel>
      </StyledCol>
    </StyledRow>
  );
}
