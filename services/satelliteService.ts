/* eslint-disable @typescript-eslint/no-explicit-any */

export interface SatelliteData {
  et0: number;
  rainfall: number;
  forecastRain: number;
  raw?: any;
}

export async function fetchSatelliteData(lat: number, lon: number): Promise<SatelliteData> {
  try {
    // Allow overriding the endpoint via env, fallback to Open-Meteo default
    const endpoint =
      process.env.OPEN_METEO_ENDPOINT ||
      "https://api.open-meteo.com/v1/forecast";

    const url = `${endpoint}?latitude=${lat}&longitude=${lon}&hourly=et0_fao_evapotranspiration,precipitation&timezone=auto`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Open-Meteo error ${res.status}`);
    const data = await res.json();

    // 🧠 Dates
    const today = new Date().toISOString().split("T")[0];
    const tomorrow = new Date(Date.now() + 86400000).toISOString().split("T")[0];

    // 🧠 Guarded access to arrays
    const times: string[] = data.hourly?.time ?? [];
    const et0s: number[] = data.hourly?.et0_fao_evapotranspiration ?? [];
    const precs: number[] = data.hourly?.precipitation ?? [];

    // 🧠 Sum values for today & tomorrow
    let et0 = 0;
    let rainfall = 0;
    let forecastRain = 0;

    for (let i = 0; i < times.length; i++) {
      const t = times[i] || "";
      if (t.startsWith(today)) {
        et0 += et0s[i] ?? 0;
        rainfall += precs[i] ?? 0;
      } else if (t.startsWith(tomorrow)) {
        forecastRain += precs[i] ?? 0;
      }
    }

    return {
      et0: Number(et0.toFixed(2)),
      rainfall: Number(rainfall.toFixed(2)),
      forecastRain: Number(forecastRain.toFixed(2)),
      raw: data,
    };
  } catch (err) {
    console.error("Failed to fetch satellite data:", err);
    return { et0: 0, rainfall: 0, forecastRain: 0 };
  }
}
