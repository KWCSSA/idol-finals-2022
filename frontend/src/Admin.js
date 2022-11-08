import './Admin.css';
import React, { useState } from 'react';
import { Space, Button, Divider, Form, Input } from 'antd';

// TODO: login
// TODO：自动关闭投票通道

const formHelper = [
  { id: 1, displayName: '选手一' },
  { id: 2, displayName: '选手二' },
  { id: 3, displayName: '选手三' },
  { id: 4, displayName: '选手四' }
]

function Admin() {
  const onFinish = (values) => {
    // validation: 至少有三个选手
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Space size="medium" direction="vertical" class="admin-wrapper">
      <h2>初始化选手</h2>
      <Form
        name="basic"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 16 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        {formHelper.map(entry => (
          <Form.Item label={entry.displayName} name={entry.id}>
            <Input />
          </Form.Item>
        ))}
        <Form.Item wrapperCol={{ offset: 11, span: 16 }}>
          <Button type="primary" htmlType="submit" size="large">
            Submit
          </Button>
        </Form.Item>
      </Form>
      <Divider />
      <h2>开启 / 关闭投票通道</h2>
      <Space size="small">
        <Button type="primary" size="large">开启</Button>
        <Button size="large">关闭</Button>
      </Space>
      <Divider />
      <h2>手动加 5 票</h2>
      <Form
        name="basic"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 16 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item label="选手 ID" name="id">
          <Input />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 11, span: 16 }}>
          <Button type="primary" htmlType="submit" size="large">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Space>
  );
}

export default Admin;
