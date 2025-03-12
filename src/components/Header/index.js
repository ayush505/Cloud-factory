/* eslint-disable */
import React, { useEffect, useState } from 'react';
import logo from 'resources/images/logo.png';
import Header from 'commons/Header';
import './header.css';
import { Button, Dropdown, Menu, Typography } from 'antd';
import { MoreOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import actions from 'redux/actions';
import { useHistory, useLocation } from 'react-router-dom';
const { Text } = Typography;

const UserNameText = styled(Text)`
  white-space: nowrap;
  max-width: 125px;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 19px;
  display: inline-block;
  font-weight: 600;
  font-size: 14px;
  vertical-align: middle;
`;

export default function index() {
  const { isUserLoggedIn } = useSelector((state) => state.auth);
  const user = useSelector((state) => state.auth.userData);
  const { name } = user;
  const dispatch = useDispatch();
  const onMenuItemClick = () => {
    dispatch(actions.logout());
  };
  const history = useHistory();
  const location = useLocation();

  const [pathName, setPathName] = useState(location.pathname);

  useEffect(() => {
    setPathName(location.pathname);
  }, [location]);
  const menu = (
    <Menu
      onClick={onMenuItemClick}
      items={[
        {
          key: 'logout',
          label: 'Logout'
        }
      ]}
    />
  );

  const DropdownMenu = () => (
    <Dropdown key="more" overlay={menu} placement="bottomRight">
      <Button
        type="text"
        icon={
          <MoreOutlined
            style={{
              fontSize: 20
            }}
          />
        }
      />
    </Dropdown>
  );
  const moveToHome = () => {
    history.push('/');
  };
  const handleUnAuthorisedClick = () => {
    if (pathName === '/login') {
      history.push('/signup');
    } else {
      history.push('/login');
    }
  };
  const getExtras = () => {
    if (isUserLoggedIn) {
      return [<UserNameText key="1">{name}</UserNameText>, <DropdownMenu key="more" />];
    }
    if (pathName === '/login') return [];
    return [
      <Button key="1" type="primary" ghost onClick={handleUnAuthorisedClick}>
        {pathName === '/login' ? 'Signup' : 'Login'}
      </Button>
    ];
  };
  const headerData = {
    className: 'market-place-header',
    ghost: false,
    avatar: {
      src: logo,
      onClick: moveToHome
    },
    title: 'Bizongo',
    subTitle: 'App Marketplace',
    extra: [...getExtras(name)]
  };

  return <Header data={headerData} />;
}
