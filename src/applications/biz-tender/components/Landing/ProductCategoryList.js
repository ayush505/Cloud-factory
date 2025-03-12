import { Avatar } from 'antd';
import ProductCategory from 'commons/ProductCategory';
import React from 'react';
import styled from 'styled-components';

const StyledAvatar = styled(Avatar)`
  /* Gray/gray-8 */
  color: #7a8aac;
  img {
    border: 1px solid #d8dde6;
    border-radius: 50%;
  }
`;

export default function ProductCategoryList({ categories = [] }) {
  const array1 = categories.slice(0, 3);
  const array2 = categories.slice(3);
  return (
    <>
      {!!array1.length &&
        array1
          .filter((category) => !!category.categoryName)
          .map((category) => <ProductCategory {...category} key={category.categoryName} />)}
      {!!array2.length && (
        <Avatar.Group>
          {array2.map((category) => (
            <StyledAvatar src={category.logo} size="small" key={category.categoryName}>
              {category.categoryName.charAt(0)}
            </StyledAvatar>
          ))}
        </Avatar.Group>
      )}
    </>
  );
}
