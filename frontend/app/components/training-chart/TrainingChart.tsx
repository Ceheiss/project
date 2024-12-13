"use client";
import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";
import { ChartData } from "../../types";
import Spinner from "../spinner/Spinner";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
);

interface Item {
  month: string;
  logs_count: number;
}

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

const TrainingChart = () => {
  const [chartData, setChartData] = useState<ChartData | null>(null);
  const url = `${baseURL}/chart-data/frequency`;

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const response = await fetch(url, { credentials: "include" });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: Item[] = await response.json();
        const labels = data.map((item) => item.month);
        const values = data.map((item) => item.logs_count);
        setChartData({
          labels,
          datasets: [
            {
              label: "Training Sessions",
              data: values,
              borderColor: "#118ab2",
              backgroundColor: "#06d6a0",
              pointBackgroundColor: "#06d6a0",
              pointStyle: "circle",
              pointRadius: 10,
              pointHoverRadius: 15,
            },
          ],
        });
      } catch (error) {
        console.error("Error while getting charter data", error);
      }
    };
    fetchInfo();
  }, [url]);

  const options: ChartOptions<"line"> = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Training Sessions per Month" },
    },
    scales: {
      y: { beginAtZero: true },
    },
  };

  if (!chartData) {
    return <Spinner />;
  }

  return <Line data={chartData} options={options} />;
};

export default TrainingChart;
