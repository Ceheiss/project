'use client'
import { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, ChartOptions } from 'chart.js';
import { ChartData } from '../types';

ChartJS.register(ArcElement, Tooltip, Legend);

interface Item {
  discipline: string;
  count: number;
}

const DisciplinesChart = () => {
  const [chartData, setChartData] = useState<ChartData | null>(null);
  const url = 'http://localhost:5000/chart-data/disciplines';
  useEffect(() => {
    fetch(url, { credentials: 'include'})
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((data: Item[]) => {
        const labels = data.map(item => item.discipline);
        const values = data.map(item => item.count);
        setChartData({
          labels,
          datasets: [
            {
              label: 'Training Sessions',
              data: values,
              backgroundColor: [
                'rgba(75, 192, 192, 0.6)',
                'rgba(255, 99, 132, 0.6)',
                'rgba(54, 162, 235, 0.6)',
                'rgba(44, 66, 192, 0.6)'
              ],
              borderColor: [
                'rgba(75, 192, 192, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(104, 162, 135, 1)',
              ],
              borderWidth: 1
            },
          ],
        });
      })
  }, []);

  const options: ChartOptions<'doughnut'> = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Disciplines Trained' },
    }
  }

  return chartData ? <Doughnut data={chartData} options={options} /> : <p>Loading...</p>;
};

export default DisciplinesChart;
