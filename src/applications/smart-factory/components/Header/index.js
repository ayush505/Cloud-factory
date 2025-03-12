/* eslint-disable */
import React from 'react';
import Header from 'commons/Header';
import logo from 'applications/biz-tender/resources/images/logo1.png';
import './header.css';
import { BellOutlined, UserOutlined, SettingOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';

export default function index() {
  const history = useHistory();

  const moveToHome = () => {
    history.push('/');
  };

  const headerData = {
    className: 'smart-factory-header',
    ghost: false,
    avatar: {
      src: logo,
      onClick: moveToHome
    },
    title: 'Bizongo',
    subTitle: 'Smart Factory',
    extra: [
      <SettingOutlined key="1" className="header-icons" />,
      <BellOutlined key="2" className="header-icons" />,
      <UserOutlined key="3" className="header-icons" />
    ]
  };

  return (
    <div>
      <Header data={headerData} />
    </div>
  );
}
