import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Line, Doughnut } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

interface ChartsProps {
  isDarkMode: boolean;
}

export const Charts: React.FC<ChartsProps> = ({ isDarkMode }) => {
  const textColor = isDarkMode ? 'white' : 'black';

  const salesData = {
    labels: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو'],
    datasets: [
      {
        label: 'المبيعات',
        data: [12, 19, 3, 5, 2, 3],
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
      {
        label: 'الإيرادات',
        data: [7, 11, 5, 8, 3, 7],
        borderColor: 'rgb(255, 99, 132)',
        tension: 0.1,
      },
    ],
  };

  const demographicsData = {
    labels: ['18-24', '25-34', '35-44', '45-54', '55+'],
    datasets: [
      {
        data: [15, 30, 25, 18, 12],
        backgroundColor: [
          'rgba(255, 99, 132, 0.8)',
          'rgba(54, 162, 235, 0.8)',
          'rgba(255, 206, 86, 0.8)',
          'rgba(75, 192, 192, 0.8)',
          'rgba(153, 102, 255, 0.8)',
        ],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: textColor,
        },
      },
    },
    scales: {
      x: {
        ticks: { color: textColor },
        grid: { color: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)' },
      },
      y: {
        ticks: { color: textColor },
        grid: { color: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)' },
      },
    },
  };

  const doughnutOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right' as const,
        labels: {
          color: textColor,
        },
      },
    },
  };

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 mb-8">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 transition-all">
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
          نظرة عامة على المبيعات
        </h2>
        <div className="chart-container">
          <Line data={salesData} options={options} />
        </div>
      </div>
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 transition-all">
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
          توزيع المستخدمين
        </h2>
        <div className="chart-container">
          <Doughnut data={demographicsData} options={doughnutOptions} />
        </div>
      </div>
    </div>
  );
};