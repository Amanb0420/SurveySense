"use client"
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface BarChartProps {
  data: {
    positive: number;
    negative: number;
    neutral: number;
  };
}

export const BarChartExcel: React.FC<BarChartProps> = ({ data }) => {
  const chartData = {
    labels: ['Positive', 'Negative', 'Neutral'],
    datasets: [
      {
        label: 'Sentiment Analysis',
        data: [data.positive, data.negative, data.neutral],
        backgroundColor: ['rgba(75, 192, 192, 0.8)', 'rgba(255, 99, 132, 0.8)', 'rgba(255, 206, 86, 0.8)'],
        borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)', 'rgba(255, 206, 86, 1)'],
        borderWidth: 1,
      },
    ],
  };
  

  return <Bar data={chartData} />;
};

export default BarChartExcel;