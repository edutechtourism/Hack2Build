'use client'

import { ConnectWallet } from "../components/commons/ConnectWallet";
import { AdviceCard } from "../components/AdviceCard"
import { Telemetry } from "../components/Telemetry"

export default function Page() {
  return (
    <main className="p-6 space-y-8">
      {/* Page Title & Wallet Connect */}
      <header className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Hempsat Dashboard</h1>
        <ConnectWallet />
      </header>

      {/* Advice Section */}
      <section className="bg-white/5 p-4 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-2">Advice</h2>
        <AdviceCard et0={5} rainfall={12} forecastRain={8} />
      </section>

      {/* Telemetry Section */}
      <section className="bg-white/5 p-4 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-2">Telemetry</h2>
        <Telemetry />
      </section>
    </main>
  )
}
