import React from 'react';
import MarketPlaceHeader from 'components/Header';
import MarketPlaceFooter from 'components/Footer';
import { Layout } from 'antd';
import './Layout.css';

const { Header, Footer, Content } = Layout;
export default function LayoutContainer(props) {
  return (
    <Layout className="market-place">
      <Header className="header">
        <MarketPlaceHeader />
      </Header>
      <div className="market-place-container">
        <Content className="market-place-content">{props.children}</Content>
        <Footer className="footer">
          <MarketPlaceFooter />
        </Footer>
      </div>
    </Layout>
  );
}
