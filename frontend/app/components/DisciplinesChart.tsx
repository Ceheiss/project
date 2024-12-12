'use client'
import { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, ChartOptions } from 'chart.js';
import { ChartData } from '../types';
import Spinner from './Spinner';

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
                '#ef476f',
                '#073b4c',
                '#118ab2',
                '#ffd166',
                '#06d6a0',
                '#ef476f'
              ],
              borderColor: [
                '#171717',
              ],
              borderWidth: 1
            },
          ],
        });
      })
  }, []);

  const options: ChartOptions<'doughnut'> = {
    animation: true,
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Disciplines Trained' },
    }
  }

  return chartData ? <Doughnut data={chartData} options={options} /> : <Spinner />;
};

export default DisciplinesChart;
