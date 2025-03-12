/* eslint-disable */
import { Col, Row } from 'antd';
import Card from '@smartpaddle/biz-bamboo-v2.ui.card.card';
import {
  StyledColButtonsMinimized,
  StyledColTwoButtonsMinimized,
  StyledHeaderDiv,
  StyledLeftOutlined,
  StyledRefreshButton,
  StyledReloadOutlined
} from './kpi-card.styled';
import { StyledLink } from '../../common/index';
import { GREY_5 } from '../../../../../commons/Colors';

export default function KpiCard(props) {
  const { variant, headerElement, contentProps, onBack, onRefresh } = props;

  function getHeaderNode() {
    if (!headerElement) return null;
    switch (variant) {
      case 'minimized':
      case 'minimized-with-buttons':
        return (
          <StyledHeaderDiv>
            {headerElement}
            <StyledRefreshButton onClick={onRefresh} type={'link'}>
              <StyledReloadOutlined />
            </StyledRefreshButton>
          </StyledHeaderDiv>
        );
      case 'expanded':
        return (
          <StyledHeaderDiv>
            <StyledLink onClick={onBack}>
              <StyledLeftOutlined />
            </StyledLink>
            {headerElement}
            <StyledRefreshButton onClick={onRefresh} type={'link'}>
              <StyledReloadOutlined />
            </StyledRefreshButton>
          </StyledHeaderDiv>
        );
      default:
        return null;
    }
  }

  function getContentNode() {
    if (!contentProps) return null;
    const { metricNodes, viewDetailsButton, liveVideoButton } = contentProps;
    switch (variant) {
      // Show 3 KPIs with 1 button
      case 'minimized':
        return (
          <Row align={'middle'}>
            {metricNodes.slice(0, 3).map((metricNode) => {
              return <Col flex={1}>{metricNode}</Col>;
            })}
            <StyledColButtonsMinimized flex={1}>{viewDetailsButton}</StyledColButtonsMinimized>
          </Row>
        );
      // Show 3 KPIs with 2 buttons
      case 'minimized-with-buttons':
        return (
          <Row align={'middle'}>
            {metricNodes.slice(0, 3).map((metricNode) => {
              return <Col flex={1}>{metricNode}</Col>;
            })}
            <StyledColTwoButtonsMinimized flex={1}>
              {liveVideoButton}
              {viewDetailsButton}
            </StyledColTwoButtonsMinimized>
          </Row>
        );
      // Show8 KPIs
      case 'expanded':
        return (
          <Row gutter={[24, 16]} align={'middle'}>
            {metricNodes.map((metricNode) => {
              return <Col span={6}>{metricNode}</Col>;
            })}
          </Row>
        );
      default:
        return null;
    }
  }

  const header = {
    node: getHeaderNode(variant, headerElement)
  };
  const content = {
    node: getContentNode(variant, contentProps),
    style: { paddingLeft: '24px', paddingRight: '24px' }
  };
  return (
    <Card
      header={header}
      content={content}
      span={8}
      style={{
        border: `1px solid ${GREY_5}`,
        borderRadius: `16px`
      }}
    />
  );
}
