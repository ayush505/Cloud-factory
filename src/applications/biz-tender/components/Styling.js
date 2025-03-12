import { Card } from 'antd';
import styled from 'styled-components';

export const StyledCard = styled(Card)`
  background: #ffffff;
  border: 1px solid #d8dde6;
  box-sizing: border-box;
  margin-bottom: 16px;

  .ant-card-head {
    padding: 0 16px;
    min-height: auto;

    .ant-card-head-title {
      font-weight: 600;
      line-height: 24px;
    }
  }
  .ant-card-body {
    padding: 10px 16px;
    font-size: 16px;
    line-height: 24px;
  }
`;

export const StyledCardWithTable = styled(StyledCard)`
  .ant-card-body {
    padding: 0;

    th,
    td {
      padding: 8px 16px;
    }
    th {
      background: #f7f8fb;
    }
    td {
      white-space: pre-line;
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

  .count-class {
    color: #99a6bf;
  }
`;

export const StyledHead = styled(StyledText)`
  font-size: 20px;
  line-height: 28px;
  margin-bottom: 12px;
  color: #3d4961;
`;
export const KeyP = styled(StyledText)`
  line-height: 20px;
  /* Grey/grey-8 */
  color: #7a8aac;
`;

export const ValueP = styled(StyledText)`
  margin-bottom: 0px;
  white-space: pre-line;

  &.danger-text {
    color: red;
  }
`;

export const CountP = styled(StyledText)`
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  /* Gray/gray-9 */
  color: #3d4961;
`;
