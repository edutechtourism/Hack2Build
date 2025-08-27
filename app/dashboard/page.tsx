import { Account } from "@/components/Account";
import { AdviceCard } from "@/components/adviceCard/AdviceCard";
import { Telemetry } from "@/components/adviceCard/Telemetry";
import { CommonLayout } from "@/components/commons/CommonLayout";
import { fetchSatelliteData } from "@/services/satelliteService";

export default async function Page() {
  const satData = await fetchSatelliteData(47.0, -65.0); // example coords

  return (
    <CommonLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Hempsat Dashboard</h1>
        </div>

        <Account />

        <section className="bg-white/5 p-4 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-2">Advice</h2>
          <AdviceCard et0={5} rainfall={12} forecastRain={8} />
        </section>

        <section className="bg-white/5 p-4 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-2">Telemetry</h2>
          <Telemetry />
        </section>
      </div>
    </CommonLayout>
  );
}
