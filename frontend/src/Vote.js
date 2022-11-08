import './Vote.css';
import React, { useState } from 'react';
import { Card, Space, Modal } from 'antd';

function Vote() {
  const [status, setStatus] = useState(1);
  // 0：通道未开启
  // 1：未投票
  // 2：已投票
  const mockData = {
    title: '复赛',
    candidates: [
      {
        id: 1,
        displayName: 'A 同学'
      },
      {
        id: 2,
        displayName: 'B 同学'
      },
      {
        id: 3,
        displayName: 'C 同学'
      }
    ]
  }; // display name 如果没有名字直接显示ABCD
  const mockUserData = '001';

  // TODO:
  // useEffect(() => {
  //   // 拉取关于投票是否开始以及可选人的名单
  // }, []);

  const voteCandidate = ({ id, displayName }) => {
    // TODO:
    // post voted id to the backend
    // validate if the user has been voted
    if (false/*success*/) {
      const modal = Modal.success({
        width: 300,
        title: '您已成功为 ' + displayName + ' 投票',
        onOk: () => setStatus(2)
      });
    } else if (false/*已投票*/) {
      const modal = Modal.info({
        width: 300,
        title: '您已为 ' + displayName + ' 投过一票',
        onOk: () => setStatus(2)
      });
    } else if (true/*投票时间已过*/) {
      const modal = Modal.error({
        width: 300,
        title: '投票通道未开启',
        onOk: () => setStatus(0)
      });
    }
  }

  return (
    <div className="vote-flex-wrapper">
      {status === 0 &&
        <h1>投票通道尚未开启</h1>
      }
      {status === 1 &&
        <Space align="center" size="medium" direction="vertical">
          <h2>{mockData.title}</h2>
          <h4 class="user-id">{'观众编号：' + mockUserData}</h4>
          {/* TODO: 要不要加照片？ */}
          <Space align="center" size="small" direction="vertical">
            {mockData.candidates.map(candidate => (
              <Card hoverable id={candidate.id} className="vote-card"
                onClick={() => voteCandidate(candidate)}>
                <h3>{candidate.displayName}</h3>
              </Card>))
            }
          </Space>
        </Space>
      }
      {status === 2 &&
        <h1>您已投票</h1>
      }
    </div>
  );
}

export default Vote;
