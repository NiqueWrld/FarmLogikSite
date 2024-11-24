import React from 'react';
import { MetricData } from '../../types/metrics';
import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  data: MetricData;
  icon: LucideIcon;
  color: string;
}

function MetricCard({ title, data, icon: Icon, color }: MetricCardProps) {
  return (
    <div className="card hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
          <div className="mt-2 flex items-baseline">
            <p className="text-3xl font-bold" style={{ color }}>
              {data.value}
            </p>
            <p className="ml-2 text-sm text-gray-500">{data.unit}</p>
          </div>
        </div>
        <Icon className="h-8 w-8" style={{ color }} />
      </div>
      <p className="mt-4 text-sm text-gray-500">
        Last updated: {new Date(data.timestamp).toLocaleTimeString()}
      </p>
    </div>
  );
}

export default MetricCard;