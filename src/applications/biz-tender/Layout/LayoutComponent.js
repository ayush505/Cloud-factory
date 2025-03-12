/*eslint-disable */
import React from 'react';
import { Layout } from 'antd';
import './Layout.css';
import BizTenderHeader from 'applications/biz-tender/components/Header';
import BizTenderFooter from 'applications/biz-tender/components/Footer';

const { Header, Content, Footer } = Layout;

export default function LayoutComponent(props) {
  return (
    <Layout className="biz-tender">
      <Header className="header">
        <BizTenderHeader />
      </Header>
      <div className="content" id="infinite-scroll-content">
        <Content className="biz-tender-content">{props.children}</Content>
        <Footer className="footer">
          <BizTenderFooter />
        </Footer>
      </div>
    </Layout>
  );
}
