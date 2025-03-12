/* eslint-disable */
import { Button, Col, Row, Space, Tag } from 'antd';
import ContentHeader from 'commons/Header';
import Loader from 'commons/Loader';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { remainingDaysCheckForDeadline } from 'applications/biz-tender/commons/util';
import LoginPopup from 'commons/LoginPopup';
import actions from 'redux/actions';
import MiddleContent from './MiddleContent';
import RightContent from './RightContent';
import { StyledText } from '../Styling';
import './index.css';

const Wrapper = styled.div`
  padding: 0 24px;
  .ant-page-header {
    padding: 15px 0;
  }
`;

const StyledHead = styled(StyledText)`
  font-size: 20px;
  line-height: 28px;
  color: #3d4961;
  display: inline-block;
  margin-right: 15px;
`;

const StyledTag = styled(Tag)`
  &.remaining {
    background: #ffebee;
    border: 1px solid #febfc7;
    border-radius: 4px;
    color: #d0021b;
  }

  &.recommended {
    background: #e6fffb;
    border: 1px solid #5cdbd3;
    border-radius: 2px;
    color: #13c2c2;
  }
`;

const StyledSubText = styled(StyledText)`
  /* Gray/gray-7 */
  color: #99a6bf;
  margin-left: 32px;
`;

export default function Details() {
  const { loading, data } = useSelector((state) => state.bizTender.Details);
  const { isUserLoggedIn } = useSelector((state) => state.auth);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const history = useHistory();

  const { buyer, deadLine, totId, buyerWebsite, isRecommended = false } = data;

  const remainingDays = remainingDaysCheckForDeadline(deadLine);

  useEffect(() => {
    if (isUserLoggedIn) setShowLoginForm(false);
  }, [isUserLoggedIn]);

  const dispatch = useDispatch();
  const login = (data1) => {
    const { email, password } = data1;
    dispatch(actions.login(email, password, '', false));
  };
  const handleApply = () => {
    if (isUserLoggedIn) {
      window.open(buyerWebsite, '_blank');
    } else {
      setShowLoginForm(true);
    }
  };
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Wrapper>
          <ContentHeader
            data={{
              title: <StyledHead>{buyer}</StyledHead>,
              onBack: () => history.push('/app/biz-tender'),
              subTitle: (
                <Space>
                  <StyledTag className="remaining">{remainingDays}</StyledTag>
                  {isRecommended && <StyledTag className="recommended">Recommended</StyledTag>}
                </Space>
              ),
              extra: [
                <Button key="1" type="primary" onClick={handleApply}>
                  Apply
                </Button>
              ]
            }}
          >
            <StyledSubText>{totId}</StyledSubText>
          </ContentHeader>
          <Row gutter={[16, 16]}>
            <Col xs={24} lg={16}>
              <MiddleContent />
            </Col>
            <Col xs={24} lg={8}>
              <RightContent />
            </Col>
          </Row>
          <LoginPopup
            isVisible={showLoginForm}
            setIsVisible={setShowLoginForm}
            loginAction={login}
          />
        </Wrapper>
      )}
    </>
  );
}
