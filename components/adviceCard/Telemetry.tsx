"use client";

import { useEffect } from "react";
import { useActiveAccount } from "thirdweb/react";

type TelemetryProps = {
  onConnect?: (data: { address: string; timestamp: string }) => void;
};

export function Telemetry({ onConnect }: TelemetryProps) {
  const account = useActiveAccount();

  useEffect(() => {
    if (account) {
      const timestamp = new Date().toISOString();
      const payload = { address: account.address, timestamp };

      // 🔹 Always log & save locally
      console.log("Wallet connected:", payload);
      localStorage.setItem("walletConnection", JSON.stringify(payload));

      // 🔹 Optional: allow external devs to hook in their logic
      if (onConnect) {
        onConnect(payload);
      }
    }
  }, [account, onConnect]);

  return (
    <div className="p-4 bg-white/5 rounded-md">
      {account ? (
        <p className="text-green-500">✅ Connected: {account.address}</p>
      ) : (
        <p className="text-gray-400">Not connected</p>
      )}
    </div>
  );
}
