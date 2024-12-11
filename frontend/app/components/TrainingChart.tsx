'use client'
import { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

interface Item {
  month: string;
  logs_count: number;
}

const TrainingChart = () => {
  const [chartData, setChartData] = useState(null);
  const url = 'http://localhost:5000/chart-data/frequency';
  useEffect(() => {
    fetch(url, { credentials: 'include'})
      .then((res) => res.json())
      .then((data: Item[]) => {
        const labels = data.map(item => item.month);
        const values = data.map(item => item.logs_count);

        setChartData({
          labels,
          datasets: [
            {
              label: 'Training Sessions',
              data: values,
              borderColor: 'rgba(75, 192, 192, 1)',
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              pointBackgroundColor: 'rgba(75, 192, 192, 1)',
              pointStyle: 'circle',
              pointRadius: 10,
              pointHoverRadius: 15
            },
          ],
        });
      });
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Training Sessions per Month' },
    },
    scales: {
      y: { beginAtZero: true },
    },
  };

  return chartData ? <Line data={chartData} options={options} /> : <p>Loading...</p>;
};

export default TrainingChart;
