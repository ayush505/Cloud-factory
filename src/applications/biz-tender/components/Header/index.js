/* eslint-disable */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Header from 'commons/Header';
import logo from 'applications/biz-tender/resources/images/logo1.png';
import './header.css';
// import { BellOutlined, UserOutlined, SettingOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import { Button, Dropdown, Menu, Typography } from 'antd';
import LoginPopup from 'commons/LoginPopup';
import { useDispatch, useSelector } from 'react-redux';
import actions from 'redux/actions';
import { MoreOutlined } from '@ant-design/icons';

const StyledHeader = styled(Header)`
   {
    background: red;
    margin: 50px;
  }
`;
const { Text } = Typography;
const StyledText = styled(Text)`
  white-space: nowrap;
  max-width: 125px;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 19px;
  display: inline-block;
`;
const UserNameText = styled(StyledText)`
  font-weight: 600;
  font-size: 14px;
  vertical-align: middle;
  color: #fff;
`;

export default function Index() {
  const auth = useSelector((state) => state.auth);
  const { isUserLoggedIn, userData } = auth;
  const { name } = userData;
  const history = useHistory();
  const [showLoginForm, setShowLoginForm] = useState(false);
  const moveToHome = () => {
    history.push('/');
  };

  useEffect(() => {
    if (isUserLoggedIn) setShowLoginForm(false);
  }, [isUserLoggedIn]);

  const onMenuItemClick = () => {
    dispatch(actions.logout());
  };
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
  function DropdownMenu() {
    return (
      <Dropdown key="more" overlay={menu} placement="bottomRight">
        <Button
          type="text"
          icon={
            <MoreOutlined
              style={{
                fontSize: 20,
                color: '#fff'
              }}
            />
          }
        />
      </Dropdown>
    );
  }

  const getExtras = () => {
    if (isUserLoggedIn) {
      // return [
      //   <SettingOutlined key="1" className="header-icons" />,
      //   <BellOutlined key="2" className="header-icons" />,
      //   <UserOutlined key="3" className="header-icons" />
      // ];
      return [<UserNameText key="1">{name}</UserNameText>, <DropdownMenu key="more" />];
    }

    return [
      <Button onClick={() => setShowLoginForm(true)} key="1">
        Login
      </Button>
    ];
  };
  const headerData = {
    className: 'biz-tender-header',
    ghost: false,
    avatar: {
      src: logo,
      onClick: moveToHome
    },
    title: 'Bizongo',
    subTitle: 'GoBizTender',
    extra: [...getExtras(name)]
  };
  const dispatch = useDispatch();
  const login = (data) => {
    const { email, password } = data;
    dispatch(actions.login(email, password, '', false));
  };
  return (
    <>
      <StyledHeader data={headerData} />
      <LoginPopup isVisible={showLoginForm} setIsVisible={setShowLoginForm} loginAction={login} />
    </>
  );
}
