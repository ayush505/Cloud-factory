/* eslint-disable */
import { Avatar, Button, Card, Col, Row, Tag } from 'antd';
import { isInXDays, remainingDaysCheckForDeadline } from 'applications/biz-tender/commons/util';
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { getCurrencyFormattedAmount, parseDate } from 'commons/Utils';
import { KeyP, ValueP } from '../Styling';
import ProductCategoryList from './ProductCategoryList';
import recommended from '../../resources/images/recommended.svg';

const StyledCard = styled(Card)`
  width: 100%;
  background: #ffffff;
  /* Gray/gray-5 */
  border: 1px solid #d8dde6;
  border-radius: 6px;

  .ant-card-body {
    // padding: 12px 16px;
    padding: 0;

    .header {
      margin: 12px 16px 8px;

      .avatar-logo {
        background: #ffffff;
        /* Blue/blue-6 */
        img {
          object-fit: contain;
        }
        .ant-avatar-string {
          border: 1px solid #0486ff;
          border-radius: 4px;
          color: #0486ff;
          width: inherit;
          // height: inherit;
        }
      }

      .title {
        font-weight: 600;
        font-size: 14px;
        line-height: 22px;
        margin: 0;
      }
      .sub-title {
        margin-bottom: 0;
        font-weight: 400;
        font-size: 12px;
        line-height: 20px;
        color: #99a6bf;
      }
      .ant-tag {
        width: 42px;
        height: 22px;
        box-sizing: border-box;
        border-radius: 4px;
        font-weight: 400;

        &.new-tag {
          background: #f1f8ff;
          /* Blue/blue-3 */
          border: 1px solid #b4dafd;
          color: #0486ff;
        }
      }
    }
    .category {
      padding: 18px 16px;
    }
  }

  .ant-card-actions {
    border-radius: inherit;
    border-top-right-radius: 0;
    border-top-left-radius: 0;
    li {
      margin: 9px 16px;
    }
  }
`;

const ActionsCol = styled(Col)`
  display: inline-block;
  padding: 0 24px;
  position: relative;

  &.first {
    padding-left: 0px;
  }
  &::after {
    margin-left: 24px;
    position: absolute;
    top: -22px;
    color: #7a8aac;
    content: '.';
    font-size: 30px;
  }
  &.last::after {
    display: none;
  }
  .key,
  .value {
    display: inline;
  }
`;
export default function TenderCard(props) {
  const { tenderData } = props;

  const {
    tot_id,
    logo,
    name,
    place,
    categories,
    openDate,
    dueDate,
    value,
    isRecommended = true
  } = tenderData;
  const nameArr = name.split(' ');

  return (
    <StyledCard
      actions={[
        <Row key={1}>
          <Col xs={20}>
            <Row>
              <ActionsCol className="first">
                <KeyP className="key">Opens: </KeyP>
                <ValueP className="value">{parseDate(openDate, 'DD/MM/yyyy')}</ValueP>
              </ActionsCol>
              <ActionsCol className="last">
                <KeyP className="key">Due: </KeyP>
                <ValueP className="value danger-text">
                  {remainingDaysCheckForDeadline(dueDate)}
                </ValueP>
              </ActionsCol>
              {/* <ActionsCol className="last">
                <KeyP className="key">Value: </KeyP>
                <ValueP className="value">{getCurrencyFormattedAmount(value, 'Not Provided')}</ValueP>
              </ActionsCol> */}
            </Row>
          </Col>
          <Col xs={4}>
            <Button
              type="primary"
              ghost
              size="small"
              href={`/app/biz-tender/${tot_id}`}
              target="_blank"
            >
              View Details
            </Button>
          </Col>
        </Row>
      ]}
    >
      <Row className="header">
        <Col xs={21}>
          <Row>
            <Col xs={2}>
              <Avatar src={logo} className="avatar-logo" shape="square" size={40}>
                {`${name[0][0]}${name[1][0]}`}
              </Avatar>
            </Col>
            <Col xs={22}>
              <Link target="_blank" to={`/app/biz-tender/${tot_id}`} className="title">
                {name}
              </Link>
              <p className="sub-title">{place}</p>
            </Col>
          </Row>
        </Col>
        <Col xs={3}>
          <Row justify="end">
            {isInXDays(openDate, 7) && (
              <Col>
                <Tag className="new-tag">New</Tag>
              </Col>
            )}
            {isRecommended && (
              <Col>
                <img src={recommended} alt="" />
              </Col>
            )}
          </Row>
        </Col>
      </Row>
      <Row className="category">
        <ProductCategoryList categories={categories} />
      </Row>
    </StyledCard>
  );
}
