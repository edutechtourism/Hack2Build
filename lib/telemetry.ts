/* eslint-disable @typescript-eslint/no-explicit-any */
export type TelemetryEvent = {
  event: string;
  timestamp: string;
  data?: Record<string, any>;
};

/** added 
 * Logs a telemetry event to localStorage (and console).
 *
 * This utility function can be imported and called anywhere in the app.
 * Intended for tracking important user interactions or debug-relevant state changes.
 *
 * @param event - A short string name for the event (e.g., "walletConnected", "plotCreated")
 * @param data - Optional event data like coordinates, plotId, or any useful metadata
 */
export function logTelemetryEvent(event: string, data?: Record<string, any>) {
  const timestamp = new Date().toISOString();

  const log: TelemetryEvent = {
    event,
    timestamp,
    data,
  };

  console.log("Telemetry Event:", log);

  const logs = JSON.parse(localStorage.getItem("telemetry") || "[]");
  logs.push(log);
  localStorage.setItem("telemetry", JSON.stringify(logs));
}

/**
 * Utility to retrieve all stored telemetry logs.
 */
export function getTelemetryLogs(): TelemetryEvent[] {
  return JSON.parse(localStorage.getItem("telemetry") || "[]");
}
