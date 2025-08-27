/* eslint-disable @typescript-eslint/no-explicit-any */
export type TelemetryEvent = {
  event: string;
  timestamp: string;
  data?: Record<string, any>;
};

export function logTelemetryEvent(event: string, data?: Record<string, any>) {
  const timestamp = new Date().toISOString();
  const log: TelemetryEvent = { event, timestamp, data };

  const logs = JSON.parse(localStorage.getItem("telemetry") || "[]");
  logs.push(log);
  localStorage.setItem("telemetry", JSON.stringify(logs));

  console.log("Telemetry event logged:", log);
}

export function getTelemetryLogs(): TelemetryEvent[] {
  if (typeof window === "undefined") {
    return []; // prevent server crash
  }
  return JSON.parse(localStorage.getItem("telemetry") || "[]");
}
