import { Layout, Menu } from "antd";

const { Header, Content, Footer, Sider } = Layout;

export default function LayoutComponent(props) {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header style={{ background: "#001529", color: "#fff", textAlign: "center" }}>
        Header
      </Header>
      <Layout>
        {/* Left Navigation (Sider) */}
        <Sider width={250} theme="dark" collapsed={false}>
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["1"]}
            items={[
              { key: "1", label: "Home" },
              { key: "2", label: "Dashboard" },
              { key: "3", label: "Settings" },
            ]}
          />
        </Sider>
        {/* Main Content */}
        <Content style={{ padding: "20px", background: "#fff" }}>
          {props.children || "No content provided"}
        </Content>
      </Layout>
      <Footer style={{ textAlign: "center" }}>Footer</Footer>
    </Layout>
  );
}
