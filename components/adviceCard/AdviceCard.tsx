"use client";

import { useEffect, useState } from "react";

interface AdviceCardProps {
  et0: number;
  rainfall: number;
  forecastRain: number;
  lat: number;
  lon: number;
}


export default function AdviceCard({
  et0,
  rainfall,
  forecastRain,
}: AdviceCardProps) {
  const [checked, setChecked] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [usgsData, setUsgsData] = useState<any>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/usgs");
        if (!res.ok) throw new Error(`API error: ${res.status}`);
        const json = await res.json();
        setUsgsData(json);
      } catch (e: any) {
        setError(e.message);
      }
    })();
  }, []);

  let message = "Conditions are normal.";
  if (et0 >= 6 && rainfall < 2) {
    message =
      "High evapotranspiration with low rainfall — irrigation recommended.";
  } else if (et0 >= 4 && rainfall === 0) {
    message =
      "Dry conditions detected — monitor closely and consider watering.";
  } else if (forecastRain > 5) {
    message =
      "Significant rainfall expected tomorrow — irrigation may not be needed.";
  }

  return (
    <div className="bg-white/10 p-4 rounded-xl shadow">
      {/* Checkbox to the LEFT of the title */}
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={checked}
          onChange={() => setChecked(!checked)}
          className="h-5 w-5 accent-green-600"
        />
        <h3 className="text-lg font-semibold">Advice</h3>
      </div>

      <p className={checked ? "" : ""}>{message}</p>

      <div className="mt-2 text-sm text-gray-400">
        <p>ET₀ today: {et0.toFixed(1)} mm</p>
        <p>Rainfall today: {rainfall.toFixed(1)} mm</p>
        <p>Rain forecast tomorrow: {forecastRain.toFixed(1)} mm</p>
      </div>

      <div className="mt-4">
        <h4 className="text-md font-semibold">USGS Data</h4>
        {error && <p className="text-red-400">Error: {error}</p>}
        {!usgsData && !error && <p className="text-gray-400">Loading...</p>}
        {usgsData && (
          <div className="text-sm text-gray-400">
            <p>
              Datasets:{" "}
              {Array.isArray(usgsData.datasets?.results)
                ? usgsData.datasets.results.length
                : "N/A"}
            </p>
            <p>
              Scenes:{" "}
              {Array.isArray(usgsData.scenes?.results)
                ? usgsData.scenes.results.length
                : "N/A"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
