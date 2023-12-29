import React from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  registerables,
} from 'chart.js';
import { Line, Pie } from 'react-chartjs-2';
import { ChartProps } from './types';
import { CategoryScale } from 'chart.js';

ChartJS.register(CategoryScale);
ChartJS.register(ArcElement, Tooltip, Legend);
ChartJS.register(...registerables);

const options = {
  scales: {
    x: {
      type: 'category',
      title: {
        display: true,
        text: 'Month',
      },
      ticks: {
        beginAtZero: true,
      },
    },
    y: {
      beginAtZero: true,
    },
  },
} as any;

export const getData = (data: any) => {
  const labels = ['Todo', 'Doing', 'Done'];
  return labels.map((label: any) => {
    return {
      label,
      data: Object.values(data).filter((value: any) => value[label]),
      borderColor: 'rgba(75,192,192,1)',
      borderWidth: 2,
      fill: false,
    };
  });
};
export const getChartData = (header: string, labels: string[], data: any) => {
  return {
    labels,
    datasets: getData(data),
  };
};

export const LineChart: React.FC<ChartProps> = ({ header, labels, data }) => {
  console.log('labelsss', labels);
  return <Line data={getChartData(header, labels, data)} />;
};
