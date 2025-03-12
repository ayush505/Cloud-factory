import { Menu, Input } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import actions from 'redux/actions';
import styled from 'styled-components';

const { Search } = Input;

const Styledleft = styled.div`
  ul {
    border: 0px;
  }
`;

const StyledMenu = styled(Menu.Item)`
  font-family: 'Open Sans';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 30px !important;
  height: 30px !important;
  color: #3e4977;
`;
const StyledHeader = styled.h2`
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 28px;
  color: #3d4961;
`;

const StyledCategory = styled.p`
  font-family: 'Open Sans';
  font-style: normal;
  font-weight: 600;
  font-size: 17px;
  line-height: 22px;
  margin-bottom: 30px;
  color: #7a8aac;
`;
const StyledSearch = styled(Search)`
  margin: 20px 0px 35px 0px;

  span {
    width: auto;
    display: flex;
    flex-direction: row;
    align-items: center;
    input {
      height: 40px;
    }
  }
`;
const StyledSpan = styled.span`
  color: #aeb8cc;
  // background: #ffffff;
  border-radius: 2px 0px 0px 2px;
`;

const handleItemClick = function (args, dispatch) {
  dispatch(actions.fetchAllAppsByCategory(args.name));
};

export default function MenuComponent() {
  const allApps = useSelector((state) => state.allApps) || [];

  const { categories, searchText } = allApps;
  const [searchCategories, setSearchCategories] = useState([]);

  useEffect(() => {
    setSearchCategories(allApps.categories);
  }, [categories.length]);

  const dispatch = useDispatch();
  const onSearch = (value) => {
    let allCategories = [...categories];
    if (!value) {
      setSearchCategories(allCategories);
    } else {
      allCategories = allCategories.filter((category) =>
        category.name.toLowerCase().includes(value.toLowerCase())
      );
      setSearchCategories(allCategories);
    }
  };

  const searchByInput = (e) => {
    // onSearch(e.target.value);
    dispatch(actions.updateSearchText(e.target.value));
  };

  useEffect(() => {
    onSearch(searchText);
  }, [searchText]);
  return (
    <Styledleft>
      <Menu defaultSelectedKeys={['All']}>
        <StyledHeader>Filters</StyledHeader>
        <StyledSearch
          placeholder="search by keywords "
          onSearch={onSearch}
          onInput={searchByInput}
          size="large"
        />

        <StyledCategory>Categories</StyledCategory>
        {searchCategories.map((category) => (
          <StyledMenu
            style={{ padding: '0px' }}
            key={category.name}
            onClick={() => {
              handleItemClick(category, dispatch);
            }}>
            {category.name} <StyledSpan>{category.count}</StyledSpan>
          </StyledMenu>
        ))}
      </Menu>
    </Styledleft>
  );
}
