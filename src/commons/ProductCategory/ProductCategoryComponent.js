import { Avatar } from 'antd';
import React from 'react';
import styled from 'styled-components';

const StyledCategory = styled.span`
  /* Gray/gray-5 */
  border: 1px solid #d6e4ff;
  color: #7a8aac;
  // padding: 2px 0px;
  border-radius: 20px;
  border-left: 0px;
  margin-right: 15px;
  font-weight: 400;
  line-height: 20px;
  height: 26px;
`;

const StyledCategoryText = styled.span`
  padding: 0 10px;
  font-size: 14px;
  display: inline-block;
  height: 100%;
  text-transform: capitalize;
`;
const StyledAvatar = styled(Avatar)`
  /* Gray/gray-8 */
  background: #d6e4ff;
  color: #7a8aac;
  text-transform: uppercase;
  img {
    border: 1px solid #d6e4ff;
    border-radius: 50%;
  }
`;

export default function ProductCategory(props) {
  const { categoryName = '', logo } = props;
  return (
    <StyledCategory>
      <StyledAvatar src={logo} size="small">
        {categoryName.charAt(0)}
      </StyledAvatar>
      <StyledCategoryText>{categoryName}</StyledCategoryText>
    </StyledCategory>
  );
}
