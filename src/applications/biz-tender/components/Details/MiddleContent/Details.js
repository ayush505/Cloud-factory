/*eslint-disable*/

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { StyledCard, StyledHead, StyledText } from '../../Styling';
import parse from 'html-react-parser';

import ProductCategory from 'commons/ProductCategory';
import AdditionalDetails from './AdditionalDetails';
import ClientDetails from './ClientDetails';
import BlurContent from 'commons/BlurContentWrapper';
import { Divider, Row } from 'antd';
import actions from 'redux/actions';

const StyledP = styled(StyledText)`
  line-height: 20px;
  /* Grey/grey-10 */
  color: #3d4961;
  white-space: pre-line;
`;

const StyledContent = styled.div``;

const StyledDivider = styled(Divider)`
  margin: 20px 0;
  color: #e2e6ed;
`;

export default function Details() {
  const data = useSelector((state) => state.bizTender.Details.data);
  const { isUserLoggedIn } = useSelector((state) => state.auth);

  const { title, productCategory, tenderDescription } = data;
  const productCategoryList = productCategory ? productCategory.split(',') : [];
  const dispatch = useDispatch();
  const login = (data) => {
    const { email, password } = data;
    dispatch(actions.login(email, password, '', false));
  };

  return (
    <StyledCard title="Details">
      <StyledContent>
        <StyledHead>Summary</StyledHead>
        <StyledP>{title}</StyledP>
      </StyledContent>
      <StyledDivider />
      <StyledContent>
        <StyledHead>Product Category</StyledHead>
        <Row>
          {(productCategoryList || []).map((category, index) => (
            <ProductCategory categoryName={category.trim()} key={index} />
          ))}
        </Row>
      </StyledContent>
      <StyledDivider />
      <StyledContent>
        <StyledHead>Description</StyledHead>
        <StyledP>{parse(tenderDescription || '')}</StyledP>
      </StyledContent>
      <StyledDivider />
      <div style={{ position: 'relative' }}>
        <BlurContent loginAction={login} isLoggedInUser={isUserLoggedIn} showLoginForm>
          <StyledContent>
            <ClientDetails data={data} />
          </StyledContent>
          <StyledDivider />
          <StyledContent>
            <AdditionalDetails data={data} />
          </StyledContent>
        </BlurContent>
      </div>
    </StyledCard>
  );
}
