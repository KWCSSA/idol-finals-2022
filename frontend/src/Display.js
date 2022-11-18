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
    axios
      .get(`localhost:8080/round`)
      .then((res) => {
        let names = [];
        names.push("A " + res["candidateNames"][0]);
        names.push("B " + res["candidateNames"][1]);
        names.push("C " + res["candidateNames"][2]);
        if (res["roundID"] === "final") {
          names.push("D " + res["candidateNames"][4]);
        }
        setData({
          labels: names,
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
