import { Col, Row, Steps } from 'antd';
import { getCurrencyFormattedAmount, getDaysSuffix, parseDate } from 'commons/Utils';
import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import BlurContent from 'commons/BlurContentWrapper';
import { reminingTime } from 'applications/biz-tender/commons/util';
import { StyledCard, StyledText } from '../../Styling';

const { Step } = Steps;

const TextCol = styled(Col)`
  p {
    margin-bottom: 3px;
  }
`;

const TimelineCard = styled(StyledCard)`
  padding: 16px;

  .ant-card-body {
    border: 0px solid red;
    padding: 0;

    .timeline-steps {
      width: 110%;
      margin-left: -5%;
    }
  }
`;
const StyledP = styled(StyledText)`
  display: flex;
  justify-content: space-between;
`;

const getStatus = (postingDate, biddingDate, deadLine) => {
  let dateTime;

  dateTime = reminingTime(deadLine);
  if (dateTime <= 0) return 2;

  dateTime = reminingTime(biddingDate);
  if (dateTime <= 0) return 1;

  dateTime = reminingTime(postingDate);
  if (dateTime <= 0) return 0;

  return -1;
};
export default function Timeline() {
  const data = useSelector((state) => state.bizTender.Details.data);
  const isLoggedInUser = useSelector((state) => state.auth.isUserLoggedIn);
  const {
    postingDate,
    openingDate: biddingOpeningDate,
    deadLine,
    est,
    emd,
    bidOfferValidity
  } = data;

  const postDate = parseDate(postingDate, 'DD-MM-YY');
  const openingDate = parseDate(biddingOpeningDate, 'DD-MM-YY');
  const deadLineDate = parseDate(deadLine, 'DD-MM-YY');

  return (
    <TimelineCard>
      <Row>
        <Col xs={{ span: 18 }}>
          <Steps
            progressDot
            current={getStatus(postingDate, biddingOpeningDate, deadLine)}
            className="timeline-steps">
            <Step title={postDate} description="Posted" />
            <Step title={openingDate} description="Bid Open" />
            <Step title={deadLineDate} description="Bid Close" />
          </Steps>
        </Col>
        <TextCol xs={{ span: 5, offset: 1 }}>
          <div>
            <BlurContent showLoginPopup isLoggedInUser={isLoggedInUser}>
              <StyledP>
                <span>Value:</span>
                <span> {getCurrencyFormattedAmount(est)}</span>
              </StyledP>
              <StyledP>
                <span>EMD Cost:</span>
                <span> {getCurrencyFormattedAmount(emd)}</span>
              </StyledP>
              <StyledP>
                <span>Offer Validity:</span>
                <span> {getDaysSuffix(bidOfferValidity)}</span>
              </StyledP>
            </BlurContent>
          </div>
        </TextCol>
      </Row>
    </TimelineCard>
  );
}
