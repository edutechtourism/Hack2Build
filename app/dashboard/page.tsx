"use client";

import { useState, useEffect } from "react";
import { fetchSatelliteData } from "@/services/satelliteService";
import { Account } from "@/components/Account";
import { CommonLayout } from "@/components/commons/CommonLayout";
import AdviceCard from "@/components/adviceCard/AdviceCard";

interface SatData {
  et0: number;
  rainfall: number;
  forecastRain: number;
}

export default function Page() {
  const [lat, setLat] = useState(47.0);
  const [lon, setLon] = useState(-65.0);
  const [satData, setSatData] = useState<SatData | null>(null);

  useEffect(() => {
    async function fetchData() {
      const sat = await fetchSatelliteData(lat, lon);
      if (sat) setSatData(sat);
    }
    fetchData();
  }, [lat, lon]);

  return (
    <CommonLayout>
      <div className="space-y-8">
        <Account />

        <section className="bg-white/5 p-4 rounded-xl shadow space-y-4">
          <div className="flex flex-col gap-2">
            <label>
              Latitude:
              <input
                type="number"
                value={lat}
                onChange={(e) => setLat(parseFloat(e.target.value))}
                className="ml-2 p-1 rounded bg-gray-100 text-black"
              />
            </label>
            <label>
              Longitude:
              <input
                type="number"
                value={lon}
                onChange={(e) => setLon(parseFloat(e.target.value))}
                className="ml-2 p-1 rounded bg-gray-100 text-black"
              />
            </label>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">Advice</h2>
            {satData ? (
              <AdviceCard
                et0={satData.et0 ?? 0}
                rainfall={satData.rainfall ?? 0}
                forecastRain={satData.forecastRain ?? 0}
                lat={lat}
                lon={lon}
              />
            ) : (
              <p>Loading satellite data...</p>
            )}
          </div>
        </section>
      </div>
    </CommonLayout>
  );
}
