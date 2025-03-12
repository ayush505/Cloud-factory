import styled from 'styled-components';
import { Typography } from 'antd';
import { ArrowDownOutlined, ArrowUpOutlined, QuestionCircleOutlined } from '@ant-design/icons';

import { GREEN_6, GREY_8, GREY_9, RED_7 } from '../../../../commons/Colors';

const { Text } = Typography;

// @ts-ignore - TS2339
export const StyledMetric = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  width: 156px;
  height: 52px;
`;

export const StyledTitleDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 4.75px;
  // TODO For ellipsis and tooltip. Change according to design
  width: 160px;
`;

export const StyledTitle = styled(Text)`
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 20px;
  color: ${GREY_8};
`;

export const StyledQuestionCircleOutlined = styled(QuestionCircleOutlined)`
  color: ${GREY_8};
  font-size: 12px;
`;

export const StyledSubTextDiv = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 9.8px;
`;

export const StyledLeftText = styled(Text)`
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  color: ${GREY_9};
`;

export const StyledRightDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 5.8px;
`;

export const StyledRightText = styled(Text)`
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 20px;
  color: ${(props) => (props.textVariant === 'up' ? GREEN_6 : RED_7)};
`;

export const StyledArrowDownOutlined = styled(ArrowDownOutlined)`
  color: ${RED_7};
  font-size: 12px;
`;

export const StyledArrowUpOutlined = styled(ArrowUpOutlined)`
  color: ${GREEN_6};
  font-size: 12px;
`;
