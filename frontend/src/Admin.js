import "./Admin.css";
import React, { useState } from "react";
import { Space, Button, Divider, Form, Input, Select, Switch } from "antd";
const axios = require("axios");
// TODO: login
// TODO：自动关闭投票通道

const formHelper = [
  { id: "c0", displayName: "选手 0" },
  { id: "c1", displayName: "选手 1" },
  { id: "c2", displayName: "选手 2" },
  { id: "c3", displayName: "选手 3" },
];

function Admin() {
  const onFinishInit = async (values) => {
    // validation: 至少有三个选手
    console.log("Success:", values);
    const data = {};
    data["roundID"] = values["roundID"];
    data["candidateNames"] =
      values.roundID === "final"
        ? [values["c0"], values["c1"], values["c2"], values["c3"]]
        : [values["c0"], values["c1"], values["c2"]];
    console.log("OnFinishInit", data);
    await initRound(data);
  };

  const onToggleChange = (checked) => {
    console.log("开启:", checked);
    if (checked) {
      startRound();
    } else {
      endRound();
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const initRound = async (data) => {
    console.log("initRound");
    await axios
      .post(`http://localhost:8080/round/init/${data.roundID}`, {
        candidateNames: data.candidateNames,
      })
      .then((res) => {
        console.log("initRoundComplete");
      })
      .catch((error) => {
        console.log("initRoundCompleteError", error);
      })
      .then(() => {});
  };

  // POST /round/start
  const startRound = async () => {
    await axios
      .put(`http://localhost:8080/round/start`)
      .then((res) => {})
      .catch((error) => {})
      .then(() => {});
  };

  // POST /round/end
  const endRound = async () => {
    await axios
      .put(`http://localhost:8080/round/end`)
      .then((res) => {})
      .catch((error) => {})
      .then(() => {});
  };

  const onFinishAddVotes = (values) => {
    console.log("Success:", values);
    const data = {};
    data["roundID"] = values["roundID"];
    data["candidateIndex"] = values["candidateIndex"];
    data["votesAdded"] = 5;

    adminVote(data);
  };
  /**
   * data = {
   *      roundID: 'semiFinal1',
   *      candidateIndex: 0,
   *      votesAdded: 5
   * }
   */
  const adminVote = async (data) => {
    await axios
      .put(`http://localhost:8080/vote/${data.candidateIndex}`, {
        votesAdded: data.votesAdded,
      })
      .then((res) => {})
      .catch((error) => {
        console.log(error);
      })
      .then(() => {});
  };

  return (
    <Space size="medium" direction="vertical" class="admin-wrapper">
      <h2>初始化选手</h2>
      <Form
        name="basic"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 16 }}
        onFinish={onFinishInit}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item label="RoundID" name="roundID">
          <Select
            defaultValue="semiFinal1"
            style={{ width: 120 }}
            options={[
              {
                value: "semiFinal1",
                label: "小组赛1",
              },
              {
                value: "semiFinal2",
                label: "小组赛2",
              },
              {
                value: "semiFinal3",
                label: "小组赛3",
              },
              {
                value: "repechage",
                label: "复活赛",
              },
              {
                value: "final",
                label: "决赛",
              },
            ]}
          />
        </Form.Item>
        {formHelper.map((entry) => (
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
        <Switch
          checkedChildren="开启"
          unCheckedChildren="关闭"
          onChange={onToggleChange}
        />
      </Space>
      <Divider />
      <h2>手动加 5 票</h2>
      <Form
        name="basic"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 16 }}
        onFinish={onFinishAddVotes}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item label="选手 ID" name="candidateIndex">
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
