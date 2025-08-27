// /services/satelliteService.ts

export interface SatelliteData {
  et0?: number;
  rainfall?: number;
  forecastRain?: number;
  [key: string]: any;
}

export async function fetchSatelliteData(
  lat: number,
  lon: number
): Promise<SatelliteData | null> {
  try {
    const endpoint =
      process.env.OPEN_METEO_ENDPOINT || "https://api.open-meteo.com/v1/forecast";

    const params = new URLSearchParams({
      latitude: lat.toString(),
      longitude: lon.toString(),
      daily: "precipitation_sum,et0_fao_evapotranspiration",
      timezone: "auto",
    });

    const res = await fetch(`${endpoint}?${params.toString()}`);

    if (!res.ok) {
      throw new Error(`Open-Meteo API error: ${res.statusText}`);
    }

    const data = await res.json();

    // Map to our format
    return {
      et0: data.daily?.et0_fao_evapotranspiration?.[0],
      rainfall: data.daily?.precipitation_sum?.[0],
      forecastRain: data.daily?.precipitation_sum?.[1], // tomorrow
      raw: data, // keep everything in case we need later
    };
  } catch (err) {
    console.error("Error fetching satellite data:", err);
    return null;
  }
}
