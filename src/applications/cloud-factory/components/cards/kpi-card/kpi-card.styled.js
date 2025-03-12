import styled from 'styled-components';
import { LeftOutlined, ReloadOutlined } from '@ant-design/icons';
import { Button, Col } from 'antd';

import { BLUE_6, GREY_9 } from '../../../../../commons/Colors';

export const StyledHeaderDiv = styled.div`
  display: flex;
  gap: 8.69px;
  align-items: center;
`;

export const StyledLeftOutlined = styled(LeftOutlined)`
  color: ${BLUE_6};
`;

export const StyledColButtonsMinimized = styled(Col)`
  display: flex;
  justify-content: flex-end;
`;

export const StyledColTwoButtonsMinimized = styled(Col)`
  display: flex;
  gap: 5px;
  flex-direction: column;
  align-items: flex-end;
`;

export const StyledRefreshButton = styled(Button)`
  padding: unset;
  border: unset;
  height: unset;
`;

export const StyledReloadOutlined = styled(ReloadOutlined)`
  color: ${GREY_9};
`;
