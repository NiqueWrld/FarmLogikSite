import React from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

interface RadialGaugeProps {
  value: number;
  maxValue: number;
  label: string;
  color: string;
}

function RadialGauge({ value, maxValue, label, color }: RadialGaugeProps) {
  const percentage = (value / maxValue) * 100;
  const remaining = 100 - percentage;

  const data = {
    datasets: [
      {
        data: [percentage, remaining],
        backgroundColor: [color, '#f3f4f6'],
        borderWidth: 0,
        circumference: 180,
        rotation: 270,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
    cutout: '75%',
  };

  return (
    <div className="relative h-[200px]">
      <Doughnut data={data} options={options} />
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-bold" style={{ color }}>
          {percentage.toFixed(1)}%
        </span>
        <span className="text-sm text-gray-500">{label}</span>
      </div>
    </div>
  );
}

export default RadialGauge;