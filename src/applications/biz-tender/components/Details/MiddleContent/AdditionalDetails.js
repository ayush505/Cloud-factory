import { Row } from 'antd';
import React from 'react';
import BlurContent from 'commons/BlurContentWrapper';
import { useSelector } from 'react-redux';
import { StyledHead } from '../../Styling';
import KeyValueRow from './KeyValueRow';

export default function AdditionalDetails(props) {
  const { biddingType, docsRequirement, deliverySchedule, paymentTerms } = props.data;
  const { isUserLoggedIn } = useSelector((state) => state.auth);
  return (
    <>
      <StyledHead>
        <BlurContent hideText={false} isLoggedInUser={isUserLoggedIn}>
          Additional Details
        </BlurContent>
      </StyledHead>
      <Row>
        <KeyValueRow keyText="Bid Type" valueText={biddingType} hideKeyText={false} />
        <KeyValueRow keyText="Required Documents" valueText={docsRequirement} hideKeyText={false} />
        <KeyValueRow keyText="Delivery Schedule" valueText={deliverySchedule} hideKeyText={false} />
        <KeyValueRow keyText="Payment Terms" valueText={paymentTerms} hideKeyText={false} />
      </Row>
    </>
  );
}
