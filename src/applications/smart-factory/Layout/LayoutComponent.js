/* eslint-disable */
import React from 'react';
import { Layout, Menu } from 'antd';
import './Layout.css';
import SmartFactoryHeader from '../components/Header';
import SmartFactoryFooter from '../components/Footer';

const { Header, Content, Footer, Sider } = Layout;

import { Link } from 'react-router-dom';
import { StyledText } from '../components/styling';

// const StyledMenu = styled(Menu)``;

const items2 = [
  {
    key: '1',
    // icon: <UploadOutlined />,
    label: 'Workforce Monitoring',
    path: '/work-force-monitor'
  },
  {
    key: '2',
    // icon: <UploadOutlined />,
    label: 'Machine Monitoring',
    path: '/machine-monitor'
  },
  {
    key: '3',
    // icon: <UserOutlined />,
    label: 'Production Planner',
    path: '/planner'
  },
  {
    key: '4',
    // icon: <VideoCameraOutlined />,
    label: 'OEE Calculator',
    path: '/calculator'
  },
  {
    key: '5',
    // icon: <UploadOutlined />,
    label: 'Value Stream Mapping',
    path: '/value'
  }
];

export default function LayoutComponent(props) {
  const { baseRoute } = props;
  return (
    <Layout className="smart-factory">
      <Header className="smart-factory_header">
        <SmartFactoryHeader />
      </Header>
      <Layout>
        <Sider width={200} className="smart-factory_left-side-menu">
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{
              height: '100%',
              borderRight: 0
            }}
          >
            {items2.map((item) => (
              <Menu.Item key={item.key}>
                <Link to={`${baseRoute}${item.path}`}>
                  {/* <span className="nav-text">{item.label}</span> */}
                  <StyledText className="nav-text">{item.label}</StyledText>
                </Link>
              </Menu.Item>
            ))}
          </Menu>
        </Sider>
        <Content className="smart-factory_content">{props.children}</Content>
      </Layout>

      <Footer className="smart-factory_footer">
        <SmartFactoryFooter />
      </Footer>
    </Layout>
  );
}
