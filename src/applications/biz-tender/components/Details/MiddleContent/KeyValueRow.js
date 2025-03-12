import { Avatar, Col } from 'antd';
import React from 'react';
import styled from 'styled-components';
import BlurContent from 'commons/BlurContentWrapper';
import { useSelector } from 'react-redux';
import { KeyP, ValueP } from '../../Styling';

const StyledCol = styled(Col)`
  margin-bottom: 10px;
`;

const ValueSpan = styled.span`
  font-weight: 400;
  font-size: 12px;
  line-height: 20px;
  color: #99a6bf;
`;

const StyledAvatar = styled(Avatar)`
  margin-right: 8px;

  img {
    object-fit: contain;
  }
`;

export default function KeyValueRow(props) {
  const {
    keyText = '',
    valueText = '',
    valueSubText = '',
    keyColSpan = { xs: 8 },
    valueColSpan = { xs: 16 },
    hideKeyText = true,
    hideValueText = true,
    prfixLogo = ''
  } = props;
  const { isUserLoggedIn } = useSelector((state) => state.auth);
  return (
    <>
      <StyledCol {...keyColSpan}>
        <KeyP>
          <BlurContent hideText={hideKeyText} isLoggedInUser={isUserLoggedIn}>
            {keyText}
          </BlurContent>
        </KeyP>
      </StyledCol>
      <StyledCol {...valueColSpan}>
        <ValueP>
          <BlurContent hideText={hideValueText} isLoggedInUser={isUserLoggedIn}>
            {prfixLogo && <StyledAvatar src={prfixLogo} size={20} shape="square" />}
            {valueText}
          </BlurContent>
        </ValueP>
        <ValueSpan>
          <BlurContent hideText={hideValueText} isLoggedInUser={isUserLoggedIn}>
            {valueSubText}
          </BlurContent>
        </ValueSpan>
      </StyledCol>
    </>
  );
}
