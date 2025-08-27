/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { getTelemetryLogs } from "@/lib/telemetry";

interface SatelliteData {
  et0: number;
  rainfall: number;
  forecastRain: number;
}

export default function AdviceCard({ data }: { data?: SatelliteData }) {
  return (
    <div>
      <h3 className="mt-4">Satellite Data</h3>
      {data ? (
        <div>
          <p>ET₀: {data.et0 ?? "N/A"}</p>
          <p>Rainfall today: {data.rainfall ?? "N/A"} mm</p>
          <p>Rainfall tomorrow: {data.forecastRain ?? "N/A"} mm</p>
        </div>
      ) : (
        <p>No satellite data yet.</p>
      )}
    </div>
  );
}

export function Telemetry() {
  const logs = getTelemetryLogs();

  return (
    <div>
      <h3>Telemetry Logs</h3>
      {logs.length === 0 ? (
        <p>No telemetry events yet.</p>
      ) : (
        <ul>
          {logs.map((log, i) => (
            <li key={i}>
              <strong>{log.event}</strong> at {log.timestamp}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
