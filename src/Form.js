import React, { useState } from "react";
import "antd/dist/antd.css";
import { Form, Input, Button, Radio } from "antd";

const FormLayoutDemo = () => {
  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState("horizontal");

  const onFormLayoutChange = ({ layout }) => {
    setFormLayout(layout);
  };

  const formItemLayout =
    formLayout === "horizontal"
      ? {
          labelCol: {
            span: 4,
          },
          wrapperCol: {
            span: 14,
          },
        }
      : null;
  const buttonItemLayout =
    formLayout === "horizontal"
      ? {
          wrapperCol: {
            span: 14,
            offset: 4,
          },
        }
      : null;
  return (
    <>
      <Form
        {...formItemLayout}
        layout="horizontal"
        form={form}
        initialValues={{
          layout: formLayout,
        }}
        onValuesChange={onFormLayoutChange}
      >
        <Form.Item label="Action" name="layout">
          <Radio.Group value="vertical">
            <Radio.Button value="horizontal">Buy</Radio.Button>
            <Radio.Button value="vertical">Sell</Radio.Button>
            <Radio.Button value="inline">Deposit</Radio.Button>
            <Radio.Button value="inline">Withdraw</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="Ticker">
          <Input placeholder="'AAPL'" />
        </Form.Item>
        <Form.Item label="# Shares">
          <Input placeholder="'20'" />
        </Form.Item>
        <Form.Item label="Price">
          <Input placeholder="'100'" />
        </Form.Item>
        <Form.Item {...buttonItemLayout}>
          <Button type="primary">Submit</Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default FormLayoutDemo;
