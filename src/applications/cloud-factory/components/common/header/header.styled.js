import styled from 'styled-components';
import { Typography } from 'antd';
import { GREY_8, GREY_9 } from '../../../../../commons/Colors';

const { Text } = Typography;

export const StyledDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

export const StyledLeftText = styled(Text)`
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 22px;

  color: ${GREY_9};
`;

export const StyledRightText = styled(Text)`
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 20px;
  color: ${GREY_8};
`;
