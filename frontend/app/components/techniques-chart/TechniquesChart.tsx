"use client";
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";
import { ChartData } from "../../types";
import Spinner from "../spinner/Spinner";

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;
const backgroundColors = ["#118ab2", "#ffd166", "#06d6a0", "#ef476f"];

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

const TechniquesChart = () => {
  const [chartData, setChartData] = useState<ChartData | null>(null);
  const url = `${baseURL}/chart-data/techniques`;

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const response = await fetch(url, { credentials: "include" });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: string[] | number[] = await response.json();
        const labels = Object.keys(data).map((key) => key.trim());
        const values = Object.values(data);
        setChartData({
          labels,
          datasets: [
            {
              label: "Times trained",
              data: values,
              backgroundColor: backgroundColors,
              borderColor: ["#073b4c"],
              borderWidth: 1,
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching chart data:", error);
      }
    };
    fetchInfo();
  }, [url]);

  const options: ChartOptions<"bar"> = {
    responsive: true,
    plugins: {
      legend: {
        position: "top", // Removed 'as const'
      },
      title: {
        display: true,
        text: "Discipline Frequency Chart",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  if (!chartData) {
    return <Spinner />;
  }

  return <Bar data={chartData} options={options} />;
};

export default TechniquesChart;
