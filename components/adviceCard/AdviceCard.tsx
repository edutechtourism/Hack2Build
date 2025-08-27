interface AdviceCardProps {
  et0: number;
  rainfall: number;
  forecastRain: number;
}

export function AdviceCard({ et0, rainfall, forecastRain }: AdviceCardProps) {
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
      <h3 className="text-lg font-semibold">Advice</h3>
      <p>{message}</p>

      <div className="mt-2 text-sm text-gray-400">
        <p>ET₀ today: {et0.toFixed(1)} mm</p>
        <p>Rainfall today: {rainfall.toFixed(1)} mm</p>
        <p>Rain forecast tomorrow: {forecastRain.toFixed(1)} mm</p>
      </div>
    </div>
  );
}
