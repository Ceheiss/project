"use client";
import { useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";
import { ChartData } from "../../types";
import Spinner from "../spinner/Spinner";

ChartJS.register(ArcElement, Tooltip, Legend);

interface Item {
  discipline: string;
  count: number;
}

const backgroundColors = [
  "#ef476f",
  "#073b4c",
  "#118ab2",
  "#ffd166",
  "#06d6a0",
  "#ef476f",
];

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

const DisciplinesChart = () => {
  const [chartData, setChartData] = useState<ChartData | null>(null);
  const url = `${baseURL}/chart-data/disciplines`;

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const response = await fetch(url, { credentials: "include" });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: Item[] = await response.json();
        const labels = data.map((item) => item.discipline);
        const values = data.map((item) => item.count);
        setChartData({
          labels,
          datasets: [
            {
              label: "Training Sessions",
              data: values,
              backgroundColor: backgroundColors,
              borderColor: ["#171717"],
              borderWidth: 1,
            },
          ],
        });
      } catch (error) {
        console.error("Error while fetching disciplines chart data:", error);
      }
    };
    fetchInfo();
  }, [url]);

  const options: ChartOptions<"doughnut"> = {
    animation: true,
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Disciplines Trained" },
    },
  };

  if (!chartData) {
    return <Spinner />;
  }

  return <Doughnut data={chartData} options={options} />;
};

export default DisciplinesChart;
