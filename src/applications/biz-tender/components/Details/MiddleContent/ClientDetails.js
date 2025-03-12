import { Row } from 'antd';
import React from 'react';
import parse from 'html-react-parser';
import BlurContent from 'commons/BlurContentWrapper';
import { useSelector } from 'react-redux';
import { StyledHead } from '../../Styling';
import KeyValueRow from './KeyValueRow';

export default function ClientDetails(props) {
  const { buyer, buyerCountry, buyerEmail, buyerWebsite, buyerAddress, tendorCategory, logo } =
    props.data;
  const { isUserLoggedIn } = useSelector((state) => state.auth);
  return (
    <>
      <StyledHead>
        <BlurContent hideText={false} isLoggedInUser={isUserLoggedIn}>
          Client
        </BlurContent>
      </StyledHead>
      <Row>
        <KeyValueRow
          keyText="Name"
          prfixLogo={logo}
          valueText={buyer}
          valueSubText={buyerCountry}
          hideKeyText={false}
        />
        <KeyValueRow
          keyText="Email"
          valueText={<a href={`mailto:${buyerEmail}`}>{buyerEmail}</a>}
          hideKeyText={false}
        />
        <KeyValueRow
          keyText="Website"
          valueText={
            <a href={`${buyerWebsite}`} target="_blank" rel="noopener noreferrer">
              {buyerWebsite}
            </a>
          }
          hideKeyText={false}
        />
        <KeyValueRow keyText="Address" valueText={parse(buyerAddress || '')} hideKeyText={false} />
        <KeyValueRow keyText="Category" valueText={tendorCategory} hideKeyText={false} />
      </Row>
    </>
  );
}
