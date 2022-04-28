import { Button, Form, Input, InputNumber } from "antd";
import { useContext } from "react";
import { TransactionsContext } from "./context/TransactionsContext";

function App() {
  const { connectWallet, currentAccount, sendTransaction, loading } =
    useContext(TransactionsContext);

  const onFinish = (values) => {
    sendTransaction(values);
  };

  return (
    <div style={{ padding: "50px", width: "400px" }}>
      <Form layout="vertical" onFinish={onFinish} autoComplete="off">
        <Form.Item name="addressTo">
          <Input placeholder="Address To" />
        </Form.Item>

        <Form.Item name="amount">
          <Input style={{ width: "100%" }} placeholder="Amount" />
        </Form.Item>
        <Form.Item name="message">
          <Input placeholder="Message" />
        </Form.Item>
        <Form.Item name="keyboard">
          <Input placeholder="Keyboard" />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit" loading={loading}>
            Send Transaction
          </Button>
        </Form.Item>
      </Form>

      {!currentAccount && (
        <Button type="primary" onClick={connectWallet}>
          Connect account
        </Button>
      )}
    </div>
  );
}

export default App;
