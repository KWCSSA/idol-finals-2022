import "./Display.css";
import React, { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import faker from "faker";
import { Space } from "antd";

const axios = require("axios");

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

function Display() {
  const [data, setData] = useState({
    labels: ["A", "B", "C"],
    datasets: [
      {
        label: "Dataset",
        barThickness: 60,
        maxBarThickness: 80,
        data: [0, 0, 0],
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  });

  const getCurrentRound = () => {
    // const res = {
    //   isVoting: false,
    //   roundID: "semiFinal1",
    //   candidateNames: ["A", "B", "C"],
    //   candidateVotes: [20, 10, 30],
    // };

    axios
      .get(`3.231.161.68:8080/round`)
      .then((res) => {
        setData({
          labels: res["candidateNames"],
          datasets: [
            {
              label: "Dataset",
              barThickness: 60,
              maxBarThickness: 80,
              data: res["candidateVotes"],
              backgroundColor: "rgba(53, 162, 235, 0.5)",
            },
          ],
        });
      })
      .catch((error) => {})
      .then(() => {});

    console.log("data:", data);
  };
  return (
    <div className="display-container-outer">
      <div className="display-container">
        <img src="img.jpg" className="img-frame" onClick={getCurrentRound} />
        <Space size="large" direction="vertical" className="right-container">
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
