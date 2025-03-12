import styled from 'styled-components';
import { Button } from 'antd';
import { VideoCameraOutlined } from '@ant-design/icons';
import { GREY_5 } from '../../../../../commons/Colors';

export const StyledButtonDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 9px;
`;

export const StyledVideoCameraOutlined = styled(VideoCameraOutlined)`
  size: 12px;
`;

export const StyledButton = styled(Button)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1px 8px;
  gap: 8px;

  width: 106px;
  height: 24px;
  border: 1px solid ${GREY_5};
  border-radius: 4px;
`;
