import React from 'react';
import { AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import useSensorData from '../hooks/useSensorData';

function Insights() {
  const { insights, currentData } = useSensorData();

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'optimal':
        return <CheckCircle className="h-6 w-6 text-green-500" />;
      case 'high':
        return <AlertTriangle className="h-6 w-6 text-yellow-500" />;
      case 'low':
        return <AlertTriangle className="h-6 w-6 text-yellow-500" />;
      default:
        return <XCircle className="h-6 w-6 text-red-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'optimal':
        return 'bg-green-100 text-green-800';
      case 'high':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-red-100 text-red-800';
    }
  };

  return (
    <div className="pt-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="py-8">
        <h1 className="text-3xl font-bold text-gray-900">Insights</h1>
        <p className="mt-2 text-gray-600">Smart analysis of your greenhouse conditions</p>
      </div>

      <div className="grid gap-6 mb-8">
        <div className="card">
          <h2 className="text-xl font-semibold mb-4">Current Status</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(insights).filter(([key]) => key.endsWith('Status')).map(([key, status]) => (
              <div key={key} className="p-4 rounded-lg bg-white shadow-sm border">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium text-gray-600">
                    {key.replace('Status', '').replace(/([A-Z])/g, ' $1').trim()}
                  </h3>
                  {getStatusIcon(status as string)}
                </div>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(status as string)}`}>
                  {status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <h2 className="text-xl font-semibold mb-4">Recommendations</h2>
          <div className="space-y-4">
            {insights.recommendations.map((recommendation, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-blue-500 mt-0.5" />
                <p className="text-blue-700">{recommendation}</p>
              </div>
            ))}
            {insights.recommendations.length === 0 && (
              <div className="flex items-center justify-center p-6 text-gray-500">
                <p>All systems are operating within optimal parameters</p>
              </div>
            )}
          </div>
        </div>

        <div className="card">
          <h2 className="text-xl font-semibold mb-4">Historical Analysis</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-gray-50">
                <h3 className="text-sm font-medium text-gray-600 mb-2">Daily Average Temperature</h3>
                <p className="text-2xl font-bold text-gray-900">
                  {currentData.temperature?.value.toFixed(1)}°C
                </p>
              </div>
              <div className="p-4 rounded-lg bg-gray-50">
                <h3 className="text-sm font-medium text-gray-600 mb-2">Daily Average Humidity</h3>
                <p className="text-2xl font-bold text-gray-900">
                  {currentData.humidity?.value.toFixed(1)}%
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Insights;