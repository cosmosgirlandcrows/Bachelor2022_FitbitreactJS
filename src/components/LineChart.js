import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useEffect, useRef } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineChart = ({ options, labeltext, labels, chartData }) => {
  const data = {
    labels,
    datasets: [
      {
        label: labeltext,
        data: chartData,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        spanGaps: true,
      },
    ],
  };

  const defaultOptions = {
    plugins: {
      legend: {
        display: false,
      },
    },
    responsive: true,
    maintainAspectRatio: false,
    ...options,
  };

  return (
    <div>
      <Line data={data} options={defaultOptions} />
    </div>
  );
};

LineChart.defaultProps = {
  options: {},
};

export default LineChart;
