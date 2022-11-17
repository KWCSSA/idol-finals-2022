import './Display.css';

import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import faker from 'faker';
import { Space } from 'antd';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
  },
};

const labels = ['选手 A', '选手 B', '选手 C', '选手 D'];

export const data = {
  labels,
  datasets: [
    {
      label: 'Dataset',
      barThickness: 60,
      maxBarThickness: 80,
      data: labels.map(() => faker.datatype.number({ min: 0, max: 500 })),
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};

function Display() {
  return (
    <div className="display-container-outer">
      <div className="display-container">
        <img src="img.jpg" className="img-frame" />
        <Space size="large" direction="vertical" className="right-container" >
          <h1 className="title">投票结果</h1>
          <Bar options={options} data={data} />
        </Space>
      </div>
    </div>
  );
}

export default Display;

// TODO: 根据票数结果调整
// TODO: improve Style