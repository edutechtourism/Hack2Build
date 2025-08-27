/* eslint-disable @typescript-eslint/no-explicit-any */
export type TelemetryEvent = {
  event: string;
  timestamp: string;
  data?: Record<string, unknown>; // ✅ safer than "any"
};

/**
 * Logs a telemetry event to localStorage (and console).
 *
 * @param event - A short string name for the event (e.g., "walletConnected", "plotCreated")
 * @param data - Optional event data like coordinates, plotId, or any useful metadata
 */
export function logTelemetryEvent(event: string, data?: Record<string, unknown>) {
  const timestamp = new Date().toISOString();

  const log: TelemetryEvent = {
    event,
    timestamp,
    data,
  };

  // Save in localStorage
  if (typeof window !== "undefined") {
    const logs = JSON.parse(localStorage.getItem("telemetry") || "[]");
    logs.push(log);
    localStorage.setItem("telemetry", JSON.stringify(logs));
  }

  console.log("Telemetry Event:", log);
}

/**
 * Retrieve all stored telemetry logs
 */
export function getTelemetryLogs(): TelemetryEvent[] {
  if (typeof window === "undefined") {
    return []; // avoid SSR crash
  }
  return JSON.parse(localStorage.getItem("telemetry") || "[]");
}
