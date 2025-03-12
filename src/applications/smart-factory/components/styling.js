import { Card } from 'antd';
import styled from 'styled-components';

export const ContentCard = styled(Card)`
  margin: 10px 5px;
  // box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  .ant-card-head {
    // background: #e7f5f8;
    background: #e6f7ff;

    .ant-card-head-title {
      font-weight: 600;
    }
  }
`;

export const StyledText = styled.p`
  font-size: 14px;
  line-height: 22px;
  font-weight: 400;
  /* identical to box height, or 143% */
  /* Gray/gray-9 */
  color: #3d4961;
  margin-bottom: 0px;
`;

export const StyledHead = styled(StyledText)`
  font-size: 20px;
  line-height: 28px;
  margin-top: 0.2em;
  margin-bottom: 0.5em;
`;
export const KeyP = styled(StyledText)`
  line-height: 20px;
  /* Grey/grey-8 */
  color: #7a8aac;
`;

export const ValueP = styled(StyledText)`
  margin-bottom: 0px;
`;

export const PageHeaderText = styled(StyledHead)`
  margin: 10px;
`;
