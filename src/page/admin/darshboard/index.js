import React from "react";
import { Row, Col, Card, Statistic, Icon } from "antd";

function index() {
  return (
    <div>
      <Card title="数据汇总" bordered={false}>
        <Row gutter={8}>
          <Col span={8}>
            <Card title="新增用户" color="red">
              <Statistic
                title="新增用户"
                value="80"
                prefix={<Icon type="arrow-up" />}
              ></Statistic>
            </Card>
          </Col>
          <Col span={8}>
            <Card title="总用户">
              <Statistic
                title="总用户"
                value="840"
                prefix={<Icon type="arrow-up" />}
              ></Statistic>
            </Card>
          </Col>
          <Col span={8}>
            <Card title="订单">
              <Statistic
                title="订单"
                value="80"
                prefix={<Icon type="arrow-up" />}
              ></Statistic>
            </Card>
          </Col>
        </Row>
      </Card>
      <Card title="其他" bordered={false}></Card>
    </div>
  );
}

export default index;
