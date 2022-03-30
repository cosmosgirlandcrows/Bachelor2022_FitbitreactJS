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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineChart = ({ options, labels, chartData }) => {
  const data = {
    labels,
    datasets: [
      {
        label: "Hours slept",
        data: chartData,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        spanGaps: true,
      },
    ],
  };

  return (
    <div>
      <Line data={data} options={options} />
    </div>
  );
};

LineChart.defaultProps = {
  options: {
    plugins: {
      legend: {
        display: false,
      },
    },
    responsive: true,
  },
};

export default LineChart;
