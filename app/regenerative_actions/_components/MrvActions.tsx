"use client";

import { useState, useEffect, useMemo } from "react";
import { MrvProgress } from "./MrvProgress";

/* =========================
   Carbon credit ranges (t CO2e / acre / year)
   ========================= */
type CropKey =
  | "managed_forest"
  | "wetlands_restored"
  | "grasslands"
  | "croplands"
  | "corn"
  | "vegetables_other"
  | "hemp";

type CropInfo = {
  key: CropKey;
  label: string;
  glyph: string;
  range: { min: number; max: number };
};

const CROP_OPTIONS: CropInfo[] = [
  { key: "managed_forest",    label: "Managed Forest",           glyph: "🌲", range: { min: 1,    max: 4   } },
  { key: "wetlands_restored", label: "Wetlands (Restored)",      glyph: "🪵", range: { min: 2,    max: 5   } },
  { key: "grasslands",        label: "Grasslands",               glyph: "🌾", range: { min: 0.5,  max: 1.5 } },
  { key: "croplands",         label: "Croplands (General)",      glyph: "🚜", range: { min: 0.04, max: 0.4 } },
  { key: "corn",              label: "Corn (separate)",          glyph: "🌽", range: { min: 0.3,  max: 0.4 } },
  { key: "vegetables_other",  label: "Vegetables / Other Crops", glyph: "🥕", range: { min: 0.1,  max: 0.3 } },
  { key: "hemp",              label: "Hemp (Industrial)",        glyph: "🧵", range: { min: 3,    max: 10  } },
];

const formatRange = (min: number, max: number) =>
  `${min}–${max} t CO₂e / acre / year`;

// MRV timeline component
function HempMrvTimeline({
  acreage,
  crop,
  carbonPotential,
}: {
  acreage: string;
  crop: string;
  carbonPotential: string;
}) {
  const steps = [
    {
      title: "Monitoring",
      description: `Satellites & sensors measure biomass/carbon on ${acreage || "___"} acres of ${crop || "___"}.`,
      icon: "🌍",
    },
    {
      title: "Reporting",
      description: `Farmer reports annual sequestration: ${carbonPotential || "___"}.`,
      icon: "📊",
    },
    {
      title: "Verification",
      description: "AI/oracle verifies data against standards & methodology.",
      icon: "✅",
    },
    {
      title: "Minting $HEMP",
      description: "Once verified, $HEMP is minted, tying tokens to regenerative value.",
      icon: "🌿",
    },
  ];

  return (
    <div className="space-y-6">
      {steps.map((step, idx) => (
        <div key={idx} className="flex items-start space-x-3">
          <div className="text-2xl">{step.icon}</div>
          <div>
            <h3 className="font-bold">{step.title}</h3>
            <p className="text-gray-600">{step.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export const MrvActions = () => {
  const [acreage, setAcreage] = useState("");
  const [crop, setCrop] = useState<CropKey | "">("");
  const [carbonPotential, setCarbonPotential] = useState("");

  // auto-fill carbon potential when crop changes
  useEffect(() => {
    if (!crop) {
      setCarbonPotential("");
      return;
    }
    const info = CROP_OPTIONS.find((c) => c.key === crop);
    if (info) {
      setCarbonPotential(formatRange(info.range.min, info.range.max));
    }
  }, [crop]);

  // derived preview of credits
  const creditsPreview = useMemo(() => {
    const acres = parseFloat(acreage || "0");
    if (!crop || !acres || acres <= 0) return "";
    const info = CROP_OPTIONS.find((c) => c.key === crop);
    if (!info) return "";
    const min = +(info.range.min * acres).toFixed(2);
    const max = +(info.range.max * acres).toFixed(2);
    return `${min}–${max} credits / year (at ${acres} acres)`;
  }, [acreage, crop]);

  return (
    <div className="space-y-6">
      <HempMrvTimeline
        acreage={acreage}
        crop={crop}
        carbonPotential={carbonPotential}
      />

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Report Offset Carbon Potential</h2>

        {/* Acreage (kept as free input) */}
        <input
          type="text"
          placeholder="Acreage (e.g. 1 acre)"
          value={acreage}
          onChange={(e) => setAcreage(e.target.value)}
          className="w-full px-3 py-2 border rounded"
        />

        {/* Crop Type dropdown */}
        <select
          value={crop}
          onChange={(e) => setCrop(e.target.value as CropKey)}
          className="w-full px-3 py-2 border rounded"
        >
          <option value="" disabled>
            Select a crop / land type…
          </option>
          {CROP_OPTIONS.map((opt) => (
            <option key={opt.key} value={opt.key}>
              {opt.glyph} {opt.label}
            </option>
          ))}
        </select>

        {/* Auto-filled Carbon Potential */}
        <input
          type="text"
          value={carbonPotential}
          readOnly
          placeholder="Annual sequestration auto-filled"
          className="w-full px-3 py-2 border rounded bg-gray-50"
        />

        {/* Optional credits preview */}
        {creditsPreview && (
          <div className="p-3 border rounded bg-green-50 text-green-700">
            <div className="font-medium">Estimated Credits</div>
            <div>{creditsPreview}</div>
          </div>
        )}

        <MrvProgress />
      </div>
    </div>
  );
};
