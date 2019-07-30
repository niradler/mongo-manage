import React from "react";
import axios from "axios";
import "./App.css";
import { Table, Layout } from "antd";

const { Header, Content, Footer } = Layout;
const { Column, ColumnGroup } = Table;

export class App extends React.PureComponent {
  state = {
    data: []
  };

  componentDidMount() {
    this.getCollectionDocs().then(res =>
      this.setState({ data: res.data.map(d => ({ ...d, key: d._id })) })
    );
  }

  getCollectionDocs = () => {
    return axios({
      method: "post",
      url: "http://localhost:3005/db/devresources/collection/resources/find",
      data: { limit: 1000 }
    });
  };

  renderColumn = (obj, title) => {
    if (typeof obj[title] == "object" && obj[title].length) {
      return (
        <Column
          width="150"
          title={title}
          dataIndex={title}
          key={title}
          render={arr =>
            arr && arr.length && arr.length > 0 ? (
              <span>{arr.join(", ")}</span>
            ) : (
              ""
            )
          }
        />
      );
    } else if (typeof obj[title] == "object" && !obj[title].length) {
      return (
        <Column
          width="150"
          title={title}
          dataIndex={title}
          key={title}
          render={o => JSON.stringify(o)}
        />
      );
    } else if (typeof obj[title] == "object" && !obj[title].length) {
      return (
        <ColumnGroup title={title}>
          {Object.keys(obj[title]).map(subtitle => (
            <Column
              width="150"
              title={subtitle}
              dataIndex={subtitle}
              key={"subtitle-" + subtitle}
            />
          ))}
        </ColumnGroup>
      );
    } else if (typeof obj[title] == "boolean") {
      return (
        <Column
          width="150"
          title={title}
          dataIndex={title}
          key={title}
          render={bool => (bool ? "true" : "false")}
        />
      );
    } else {
      return <Column width="150" title={title} dataIndex={title} key={title} />;
    }
  };

  render() {
    const { data } = this.state;
    console.log({ data });
    return (
      <Layout className="layout">
        <Header />
        <Content style={{ padding: "50px 50px 50px 50px" }}>
          <div style={{ background: "#fff", padding: 24, minHeight: 280 }}>
            {data.length > 0 && (
              <Table dataSource={data}>
                {Object.keys(data[0])
                  .filter(t => t !== "key")
                  .filter(t => !t.includes("__"))
                  .map(title => this.renderColumn(data[0], title))}
              </Table>
            )}
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    );
  }
}

export default App;
