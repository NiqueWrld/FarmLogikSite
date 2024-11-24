export interface MetricData {
  value: number;
  unit: string;
  timestamp: string;
}

export interface SensorData {
  temperature: MetricData;
  humidity: MetricData;
  moisture: MetricData;
  waterLevel: MetricData;
  co2Level: MetricData;
}