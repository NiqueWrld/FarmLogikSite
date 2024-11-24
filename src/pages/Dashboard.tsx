import React, { useEffect, useState } from 'react';
import { Thermometer, Droplets, Sprout, Waves, Wind } from 'lucide-react';
import MetricCard from '../components/metrics/MetricCard';
import LineChart from '../components/charts/LineChart';
import RadialGauge from '../components/charts/RadialGauge';
import BarChart from '../components/charts/BarChart';
import AreaChart from '../components/charts/AreaChart';
import BubbleChart from '../components/charts/BubbleChart';
import useSensorData from '../hooks/useSensorData';

function Dashboard() {
  const { currentData, history } = useSensorData();
  const timeLabels = history.map(() => '').slice(-12);
  const [isDataReady, setIsDataReady] = useState(false);

  // Transform data for CO2 bubble chart
  const co2BubbleData = history.map((h, index) => ({
    x: index,
    y: h.co2Level.value,
    r: Math.max(5, Math.min(20, h.co2Level.value / 50)), // Scale bubble size
  }));

  useEffect(() => {
    if (currentData && Object.keys(currentData).length > 0) {
      setIsDataReady(true);
    }
  }, [currentData]);

  if (!isDataReady) {
    return (
      <div className="h-screen flex justify-center items-center bg-gray-100">
        <div className="text-center">
          <div className="spinner-border animate-spin inline-block w-16 h-16 border-4 rounded-full border-t-transparent border-blue-500" role="status"></div>
          <p className="mt-4 text-lg text-gray-700">Loading Greenhouse Data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="py-8">
        <h1 className="text-3xl font-bold text-gray-900">Greenhouse Overview</h1>
        <p className="mt-2 text-gray-600">Real-time monitoring of your greenhouse environment</p>
      </div>

      <div className="flex flex-wrap justify-start gap-6 mb-8">
        <MetricCard
          title="Temperature"
          data={currentData.temperature}
          icon={Thermometer}
          color="#ff6b6b"
        />
        <MetricCard
          title="Humidity"
          data={currentData.humidity}
          icon={Droplets}
          color="#4dabf7"
        />
        <MetricCard
          title="Soil Moisture"
          data={currentData.moisture}
          icon={Sprout}
          color="#51cf66"
        />
        <MetricCard
          title="Water Level"
          data={currentData.waterLevel}
          icon={Waves}
          color="#339af0"
        />
        <MetricCard
          title="CO₂ Level"
          data={currentData.co2Level}
          icon={Wind}
          color="#868e96"
        />
      </div>
      

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="card">
          <h3 className="text-lg font-semibold mb-4">Temperature Trend</h3>
          <LineChart
            data={history.map(h => h.temperature.value)}
            labels={timeLabels}
            label="Temperature"
            color="#ff6b6b"
          />
        </div>
        <div className="card">
          <h3 className="text-lg font-semibold mb-4">Humidity Level</h3>
          <RadialGauge
            value={currentData.humidity.value}
            maxValue={100}
            label="Humidity"
            color="#4dabf7"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="card">
          <h3 className="text-lg font-semibold mb-4">Soil Moisture Zones</h3>
          <BarChart
            data={history.map(h => h.moisture.value)}
            labels={timeLabels}
            label="Moisture"
            color="#51cf66"
          />
        </div>
        <div className="card">
          <h3 className="text-lg font-semibold mb-4">Water Level Trend</h3>
          <AreaChart
            data={history.map(h => h.waterLevel.value)}
            labels={timeLabels}
            label="Water Level"
            color="#339af0"
          />
        </div>
      </div>

      <div className="card mb-8">
        <h3 className="text-lg font-semibold mb-4">CO₂ Release Pattern</h3>
        <BubbleChart
          data={co2BubbleData}
          label="CO₂ Level"
          color="#868e96"
        />
      </div>
    </div>
  );
}

export default Dashboard;
