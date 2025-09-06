"use client";

import { useEffect, useState } from "react";
import { getTelemetryLogs } from "@/lib/telemetry";

interface TelemetryEvent {
  event: string;
  timestamp: string;
  data?: Record<string, unknown>;
}

export function Telemetry() {
  const [logs, setLogs] = useState<TelemetryEvent[]>([]);

  useEffect(() => {
    setLogs(getTelemetryLogs());
  }, []);

  return (
    <div>
      <h3>Telemetry Logs</h3>
      <ul>
        {logs.length === 0 ? (
          <li>No telemetry events yet.</li>
        ) : (
          logs.map((log, i) => (
            <li key={i}>
              <strong>{log.event}</strong> at {log.timestamp}
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
