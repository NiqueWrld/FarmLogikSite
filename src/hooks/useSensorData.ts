import { useState, useEffect } from 'react';
import { ref, onValue } from 'firebase/database';
import { db } from '../lib/firebase';
import { SensorData } from '../types/metrics';

export function useSensorData() {
  const [data, setData] = useState<SensorData>({} as SensorData);
  const [history, setHistory] = useState<SensorData[]>([]);

  const [insights, setInsights] = useState({
    temperatureStatus: 'optimal',
    humidityStatus: 'optimal',
    moistureStatus: 'optimal',
    waterLevelStatus: 'optimal',
    co2Status: 'optimal',
    recommendations: [] as string[],
  });

  useEffect(() => {
    const sensorRef = ref(db, 'sensors');
    const historyRef = ref(db, 'history');

    const unsubscribe = onValue(sensorRef, (snapshot) => {
      const sensorData = snapshot.val() || {};
      setData(sensorData);
      
      // Calculate insights
      const recommendations: string[] = [];

      // Temperature insights
      if (sensorData.temperature?.value > 30) {
        recommendations.push('Temperature is too high. Consider activating the cooling system.');
      } else if (sensorData.temperature?.value < 18) {
        recommendations.push('Temperature is too low. Consider increasing the heating.');
      }

      // Humidity insights
      if (sensorData.humidity?.value > 80) {
        recommendations.push('Humidity is too high. Activate dehumidifier.');
      } else if (sensorData.humidity?.value < 40) {
        recommendations.push('Humidity is too low. Consider using a humidifier.');
      }

      // Moisture insights
      if (sensorData.moisture?.value < 30) {
        recommendations.push('Soil moisture is too low. Increase watering frequency.');
      } else if (sensorData.moisture?.value > 70) {
        recommendations.push('Soil moisture is too high. Reduce watering frequency.');
      }

      // Water level insights
      if (sensorData.waterLevel?.value < 20) {
        recommendations.push('Water level is critically low. Refill the water tank immediately.');
      } else if (sensorData.waterLevel?.value > 80) {
        recommendations.push('Water level is too high. Consider draining some water.');
      }

      // CO₂ insights
      if (sensorData.co2Level?.value > 1000) {
        recommendations.push('CO₂ levels are high. Increase ventilation or use air purifiers.');
      } else if (sensorData.co2Level?.value < 400) {
        recommendations.push('CO₂ levels are too low. Ensure proper ventilation.');
      }

      console.log(sensorData)

      // Update insights state
      setInsights({
        temperatureStatus: getStatus(sensorData.temperature?.value, 18, 30),
        humidityStatus: getStatus(sensorData.humidity?.value, 40, 80),
        moistureStatus: getStatus(sensorData.moisture?.value, 30, 70),
        waterLevelStatus: getStatus(sensorData.waterLevel?.value, 20, 100),
        co2Status: getStatus(sensorData.co2Level?.value, 400, 1000),
        recommendations,
      });
    });

    const historyUnsubscribe = onValue(historyRef, (snapshot) => {
      const historyData = snapshot.val() || [];
      setHistory(historyData.slice(-12));  // Show last 12 data points
    });

    return () => {
      unsubscribe();
      historyUnsubscribe();
    };
  }, []);

  return { currentData: data, history, insights };
}

function getStatus(value: number, min: number, max: number): string {
  if (value === undefined || value === null) return 'unknown';
  if (value < min) return 'low';
  if (value > max) return 'high';
  return 'optimal';
}

export default useSensorData;

