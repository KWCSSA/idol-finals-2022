import "./Vote.css";
import React, { useState, useEffect } from "react";
import { Card, Space, Modal } from "antd";
import hash from "object-hash";
const axios = require("axios");

const displayId = (id) => {
  if (id < 10) {
    return `00${id}`;
  } else if (id < 100) {
    return `0${id}`;
  } else {
    return id;
  }
};

function Vote() {
  const [status, setStatus] = useState(1);
  const [userId, setUserId] = useState(0);
  const [userAuth, setUserAuth] = useState("");

  // 0：通道未开启
  // 1：未投票
  // 2：已投票
  // 3：auth未通过
  // 4: loading
  const mockData = {
    title: "KWCSSA 校园偶像大赛",
    candidates: [
      {
        candidateIndex: 0,
        displayName: "A",
      },
      {
        candidateIndex: 1,
        displayName: "B",
      },
      {
        candidateIndex: 2,
        displayName: "C",
      },
      {
        candidateIndex: 3,
        displayName: "D",
      },
    ],
  }; // display name 如果没有名字直接显示ABCD
  const mockUserData = "001";

  // QR Code validation
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");
    setUserId(id);
    const auth = urlParams.get("auth");
    setUserAuth(auth);
    const validAuth = hash(`${id}kwcssaidols`, { algorithm: "md5" });

    if (auth === validAuth) {
      setStatus(1);
    } else {
      setStatus(3);
    }
  }, []);

  // POST /vote/{roundID}
  const audienceVote = async (data) => {
    await axios
      .post(`3.231.161.68/vote`, {
        candidateIndex: data.candidateIndex,
        id: userId,
        auth: userAuth,
      })
      .then((res) => {
        Modal.success({
          width: 300,
          title: "投票成功",
        });
      })
      .catch((error) => {
        if (error.response.data.message === "VOTED") {
          Modal.info({
            width: 300,
            title: "本轮您已投票",
          });
        } else if (error.response.data.message === "VOTE_CLOSED") {
          Modal.warning({
            width: 300,
            title: "投票通道尚未开启",
          });
        } else if (error.response.data.message === "AUTH_ERROR") {
          Modal.error({
            width: 300,
            title: "投票未成功 请扫描二维码投票",
            onOk: () => setStatus(3),
          });
        } else if (error.response.data.message === "FINAL_BUTTON") {
          Modal.info({
            width: 300,
            title: "决赛尚未开启",
          });
        }
      })
      .then(() => {});
  };

  return (
    <div className="vote-flex-wrapper">
      {status === 1 && (
        <Space align="center" size="medium" direction="vertical">
          <h2>{mockData.title}</h2>
          <h4 class="user-id">{"观众编号：" + displayId(userId)}</h4>
          <Space align="center" size="small" direction="vertical">
            {mockData.candidates.map((candidate) => (
              <Card
                hoverable
                id={candidate.id}
                className="vote-card"
                onClick={() => audienceVote(candidate)}
              >
                <h3>{candidate.displayName}</h3>
              </Card>
            ))}
          </Space>
        </Space>
      )}
      {status === 3 && <h1>请重新扫描二维码投票</h1>}
    </div>
  );
}

export default Vote;
