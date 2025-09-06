"use client";

import { useState } from "react";

export const MrvProgress = () => {
  // Track current stage
  const [stage, setStage] = useState<1 | 2 | 3 | 4>(1);

  const stages = [
    {
      id: 1,
      title: "Monitoring",
      description: "Automatic satellite & sensor monitoring.",
      icon: "🌍",
    },
    {
      id: 2,
      title: "Reporting",
      description: "Farmer submits expected biomass & carbon potential.",
      icon: "📊",
    },
    {
      id: 3,
      title: "Growth Period",
      description: "Annual Carbon Sequestration.",
      icon: "🌱",
    },
    {
      id: 4,
      title: "Verification & Payout",
      description: "Satellite-verified carbon offset → $ROOT payout.",
      icon: "💰",
    },
  ];

  return (
    <div className="w-full mt-8">
      <h2 className="text-xl font-bold mb-6">MRV Progress</h2>
      <div className="flex items-center justify-between">
        {stages.map((s, idx) => (
          <div key={s.id} className="flex-1 flex flex-col items-center relative">
            {/* Stage circle */}
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold
                ${s.id <= stage ? "bg-green-600 text-white" : "bg-gray-300 text-gray-600"}`}
            >
              {s.icon}
            </div>

            {/* Title */}
            <div className="text-center mt-2 font-semibold">{s.title}</div>

            {/* Description */}
            <p className="text-sm text-gray-500 text-center">{s.description}</p>

            {/* Connector line (except last stage) */}
            {idx < stages.length - 1 && (
              <div
                className={`absolute top-6 right-[-50%] w-full h-1 ${
                  s.id < stage ? "bg-green-600" : "bg-gray-300"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Demo buttons to simulate stage progression */}
      <div className="flex justify-center mt-6 space-x-2">
        {[1, 2, 3, 4].map((s) => (
          <button
            key={s}
            className="px-3 py-1 border rounded text-sm hover:bg-gray-100"
            onClick={() => setStage(s as 1 | 2 | 3 | 4)}
          >
            Go to {s}
          </button>
        ))}
      </div>
    </div>
  );
};
