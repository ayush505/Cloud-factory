import styled from 'styled-components';
import { Typography } from 'antd';
import { BLUE_6 } from 'commons/Colors';

const { Link } = Typography;

export const StyledLink = styled(Link)`
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 22px;
  color: ${BLUE_6};
`;
