'use client';

import { useEffect } from "react";
import { useAccount } from "wagmi";

export function Telemetry() {
  const { isConnected, address } = useAccount();

  useEffect(() => {
    if (isConnected && address) {
      const timestamp = new Date().toISOString();

      // Log to console
      console.log("Wallet connected:", { address, timestamp });

      // Save to localStorage
      const logs = JSON.parse(localStorage.getItem("walletConnections") || "[]");
      logs.push({ address, timestamp });
      localStorage.setItem("walletConnections", JSON.stringify(logs));
    }
  }, [isConnected, address]);

  return null; // This component doesn't render anything
}