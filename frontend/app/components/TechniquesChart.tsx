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
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const TechniquesChart = () => {
  const [chartData, setChartData] = useState(null);
  const url = 'http://localhost:5000/chart-data/techniques';

  useEffect(() => {
    fetch(url, { credentials: 'include' })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        const labels = Object.keys(data).map((key) => key.trim()) || [];
        const values = Object.values(data);

        setChartData({
          labels,
          datasets: [
            {
              label: 'Frequency',
              data: values,
              backgroundColor: [
                'rgba(255, 99, 132, 0.5)',
                'rgba(54, 162, 235, 0.5)',
                'rgba(255, 206, 86, 0.5)',
                'rgba(75, 192, 192, 0.5)',
                'rgba(153, 102, 255, 0.5)',
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
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

  const options = {
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

  return chartData ? <Bar data={chartData} options={options as any} /> : <p>Loading chart...</p>;
};

export default TechniquesChart;
