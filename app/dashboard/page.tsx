"use client";

import { useState, useEffect, useRef } from "react";
import { fetchSatelliteData } from "@/services/satelliteService";
import AdviceCard from "@/components/adviceCard/AdviceCard";
import { Account } from "@/components/Account";
import { CommonLayout } from "@/components/commons/CommonLayout";
import Image from "next/image";

interface SatData {
  et0: number;
  rainfall: number;
  forecastRain: number;
}

// ✅ Define modal types
type ActiveGUI = "weather" | "soil" | "sat" | null;

export default function Page() {
  const [lat, setLat] = useState(47.0);
  const [lon, setLon] = useState(-65.0);
  const [satData, setSatData] = useState<SatData | null>(null);

  const [activeGUI, setActiveGUI] = useState<ActiveGUI>(null);
  const guiRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchData() {
      const sat = await fetchSatelliteData(lat, lon);
      if (sat) setSatData(sat);
    }
    fetchData();
  }, [lat, lon]);

  // ✅ Close GUI when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (guiRef.current && !guiRef.current.contains(event.target as Node)) {
        setActiveGUI(null);
      }
    }

    if (activeGUI) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [activeGUI]);

  return (
    <CommonLayout>
      <div className="space-y-8">
        <Account />

        {/* ✅ Header with clickable icons */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Hempsat Dashboard</h1>
          <div className="flex gap-6">
            {/* Weather */}
            <button onClick={() => setActiveGUI(activeGUI === "weather" ? null : "weather")}>
              <Image
                src="/WeatherIcon.png"
                alt="Weather Icon"
                width={50}
                height={50}
                className="cursor-pointer"
              />
            </button>

            {/* Soil Health */}
            <button onClick={() => setActiveGUI(activeGUI === "soil" ? null : "soil")}>
              <Image
                src="/SoilHealthIcon.png"
                alt="Soil Health Icon"
                width={50}
                height={50}
                className="cursor-pointer"
              />
            </button>

            {/* Satellite Weather */}
            <button onClick={() => setActiveGUI(activeGUI === "sat" ? null : "sat")}>
              <Image
                src="/SatWeatherInfo.png"
                alt="Satellite Weather Icon"
                width={50}
                height={50}
                className="cursor-pointer"
              />
            </button>
          </div>
        </div>

        {/* ✅ GUI Overlay */}
        {activeGUI && (
          <div
            ref={guiRef}
            className="absolute top-24 right-6 bg-black/70 rounded-lg p-4 shadow-lg z-50"
          >
            {activeGUI === "weather" && (
              <Image
                src="/WeatherGUI.png"
                alt="Weather Details"
                width={400}
                height={250}
              />
            )}
            {activeGUI === "soil" && (
              <Image
                src="/SoilHealthGUI.png"
                alt="Soil Health Details"
                width={400}
                height={250}
              />
            )}
            {activeGUI === "sat" && (
              <Image
                src="/SatWeatherGUI.png"
                alt="Satellite Weather Details"
                width={400}
                height={250}
              />
            )}
          </div>
        )}

        {/* ✅ Advice Section */}
        <section className="bg-white/5 p-4 rounded-xl shadow space-y-4">
          <div className="flex flex-col gap-2">
            <label className="test-grey-700">
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

      {/* ✅ Footer Progress Bar */}
      <footer className="fixed bottom-4 right-4">
        <Image
          src="/progress.png"
          alt="Farm Productivity Progress"
          width={1200}
          height={240}
        />
      </footer>
    </CommonLayout>
  );
}
