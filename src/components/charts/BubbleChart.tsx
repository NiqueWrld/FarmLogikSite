import React from 'react';
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bubble } from 'react-chartjs-2';

ChartJS.register(LinearScale, PointElement, Tooltip, Legend);

interface BubbleChartProps {
  data: Array<{ x: number; y: number; r: number }>;
  label: string;
  color: string;
}

function BubbleChart({ data, label, color }: BubbleChartProps) {
  const chartData = {
    datasets: [
      {
        label,
        data: data,
        backgroundColor: color + '80',
        borderColor: color,
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            return `${label}: ${context.raw.y} ppm (Volume: ${context.raw.r})`
          }
        }
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'CO₂ Level (ppm)',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Time',
        },
      },
    },
  };

  return (
    <div className="h-[300px]">
      <Bubble data={chartData} options={options} />
    </div>
  );
}

export default BubbleChart;