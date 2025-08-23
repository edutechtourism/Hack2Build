"use client";

type Props = {
  et0?: number;
  rainfall?: number;
  forecastRain?: number;
};

export function AdviceCard({ et0, rainfall, forecastRain }: Props) {
  let advice = "Waiting for advice...";

  if (forecastRain !== undefined && et0 !== undefined && rainfall !== undefined) {
    if (forecastRain > 80) {
      advice = "Too much rain expected – no irrigation needed.";
    } else if (et0 > 50 && rainfall < 10) {
      advice = "Irrigation recommended.";
    } else {
      advice = "Conditions are normal.";
    }
  }

  return (
    <div className="rounded-lg shadow-md p-6 bg-white text-gray-900 max-w-sm">
      <h2 className="text-xl font-bold mb-2">Advice</h2>
      <p>{advice}</p>
    </div>
  );
}
