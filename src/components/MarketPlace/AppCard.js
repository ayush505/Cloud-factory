import { Card } from 'antd';
import React from 'react';
import styled from 'styled-components';
import CardButton from './CardButton';

const { Meta } = Card;
const StyledCard = styled(Card)`
  width: 260px;
  height: 300px;
  padding-top: 20px;
  box-sizing: border-box;
  // box-shadow: 0.5px 0.5px 0.5px 0.5px #ffffff;
  border: 0.4px solid #d8dde6;
  border-radius: 6px;
  .ant-card-cover {
    height: 30%;
    .app-banner {
      height: 100%;
      margin-left: 10px;
      width: calc(100% - 10px);
      object-fit: contain;
      object-position: left;
    }
  }
  .ant-card-body {
    height: 70%;
    padding: 24px 10px;

    .ant-card-meta {
      height: 90%;
      .ant-card-meta-title {
        p {
          margin-bottom: 0;
          &.title {
            font-size: 16px;
            line-height: 22px;
            color: #3d4961;
          }
          &.sub-title {
            font-weight: 400;
            font-size: 12px;
            line-height: 18px;
            color: #7a8aac;
          }
        }
      }

      .ant-card-meta-description {
        font-weight: 400;
        line-height: 20px;
        color: #7a8aac;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        white-space: pre-line;
      }
    }
  }
`;

const InstallBanner = styled.span`
  position: absolute;
  top: 10px;
  right: 10px;
  box-sizing: border-box;
  background: #e8f8f1;
  border: 1px solid #cff0e2;
  border-radius: 4px;
  width: 64px;
  height: 22px;
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 18px;
  text-align: center;
  color: #0ba968;
`;
const getCardTitle = (app) => {
  return (
    <>
      <p className="title">{app.title}</p>
      <p className="sub-title">by Bizongo</p>
    </>
  );
};
export default function AppCard(props) {
  const { isInstalled, app } = props;
  return (
    <StyledCard cover={<img className="app-banner" alt={app.title} src={app.app_image_url} />}>
      {isInstalled && <InstallBanner>installed</InstallBanner>}
      <Meta title={getCardTitle(app)} description={app.description} />
      <CardButton app={app} isInstalled={isInstalled} />
    </StyledCard>
  );
}
