export interface SatelliteData {
  et0: number;
  rainfall: number;
  forecastRain: number;
  raw?: any;
}

export async function fetchSatelliteData(lat: number, lon: number): Promise<SatelliteData> {
  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=et0_fao_evapotranspiration,precipitation&timezone=auto`;
    const res = await fetch(url);
    const data = await res.json();

    // 🧠 Get today's date string
    const today = new Date().toISOString().split("T")[0];
    const tomorrow = new Date(Date.now() + 86400000).toISOString().split("T")[0];

    // 🧠 Sum today's values
    const times: string[] = data.hourly.time;
    const et0s: number[] = data.hourly.et0_fao_evapotranspiration;
    const precs: number[] = data.hourly.precipitation;

    let et0 = 0;
    let rainfall = 0;
    let forecastRain = 0;

    times.forEach((time, i) => {
      if (time.startsWith(today)) {
        et0 += et0s[i] ?? 0;
        rainfall += precs[i] ?? 0;
      } else if (time.startsWith(tomorrow)) {
        forecastRain += precs[i] ?? 0;
      }
    });

    console.log("Fetched values:", { et0, rainfall, forecastRain });

    return {
      et0: Number(et0.toFixed(2)),
      rainfall: Number(rainfall.toFixed(2)),
      forecastRain: Number(forecastRain.toFixed(2)),
    };
  } catch (err) {
    console.error("Failed to fetch satellite data:", err);
    return { et0: 0, rainfall: 0, forecastRain: 0 };
  }
}
