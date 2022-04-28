import { Col, Descriptions, Row, Space, Typography } from "antd";
import React, { useContext } from "react";
import { TransactionsContext } from "../context/TransactionsContext";

const { Title } = Typography;
export default function Transactions() {
  const { transactions, transactionCount } = useContext(TransactionsContext);
  return (
    <div>
      <Space
        direction="vertical"
        size="large"
        align="center"
        style={{ width: "100%" }}
      >
        <Title>Transactions{transactionCount}</Title>
        <Row style={{ width: "98vw", padding: "10px 50px" }} gutter={[20, 20]}>
          {transactions.map((transaction, index) => {
            return (
              <Col span={6} key={index}>
                <Descriptions column={1} bordered size="small">
                  <Descriptions.Item label="From">
                    {transaction.sender.slice(0, 10)}...
                  </Descriptions.Item>
                  <Descriptions.Item label="To">
                    {transaction.receiver.slice(0, 10)}...
                  </Descriptions.Item>
                  <Descriptions.Item label="Amount">
                    {transaction.amount}Etr
                  </Descriptions.Item>
                  <Descriptions.Item label="Message">
                    {transaction.message}
                  </Descriptions.Item>
                  <Descriptions.Item label="Keyboard">
                    {transaction.keyboard}
                  </Descriptions.Item>
                  <Descriptions.Item label="Timestamp">
                    {transaction.timestamp}
                  </Descriptions.Item>
                </Descriptions>
              </Col>
            );
          })}
        </Row>
      </Space>
    </div>
  );
}
