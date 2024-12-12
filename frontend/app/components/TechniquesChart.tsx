'use client';
import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js';
import { ChartData } from '../types';
import Spinner from './Spinner';

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const TechniquesChart = () => {
  const [chartData, setChartData] = useState<ChartData | null>(null);
  const url = `${baseURL}/chart-data/techniques`;

  useEffect(() => {
    fetch(url, { credentials: 'include' })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((data: 'string[] | number[]') => {
        const labels = Object.keys(data).map((key) => key.trim()) || [];
        const values = Object.values(data);

        setChartData({
          labels,
          datasets: [
            {
              label: 'Times trained',
              data: values,
              backgroundColor: [
                '#118ab2',
                '#ffd166',
                '#06d6a0',
                '#ef476f',
              ],
              borderColor: [
                '#073b4c',
              ],
              borderWidth: 1,
            },
          ],
        });
      })
      .catch((error) => {
        console.error('Error fetching chart data:', error);
      });
  }, []);

  const options: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top', // Removed 'as const'
      },
      title: {
        display: true,
        text: 'Discipline Frequency Chart',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return chartData ? <Bar data={chartData} options={options} /> : <Spinner />;
};

export default TechniquesChart;
