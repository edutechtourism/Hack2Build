"use client";

import { getContractByChainAndAddress } from "@/contracts/client";
import { farmerRegistryFactoryContracts } from "@/contracts/contracts";
import { AppChainId } from "@/contracts/settings";
import { useEffect, useState } from "react";
import { isAddress, readContract, ZERO_ADDRESS } from "thirdweb";
import { useActiveAccount } from "thirdweb/react";
import { RegisterAction } from "./RegisterAction";
import { CreateFarmerRegistry } from "./CreateFarmerRegistry";
import { RootRedemption } from "./RootRedemption";

// --- main ManageActions ---
export const ManageActions = () => {
  const activeAccount = useActiveAccount();
  const [recorder, setRecorder] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // renamed to lower-camelCase
  const [pledgeLand, setPledgeLand] = useState(false);
  const [rainfall, setRainfall] = useState(false);
  const [compost, setCompost] = useState(false);
  const [irrigation, setIrrigation] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);

  // --- MRV inputs (keep as-is if you use elsewhere) ---
  const [acreage, setAcreage] = useState("");
  const [crop, setCrop] = useState("");
  const [carbonPotential, setCarbonPotential] = useState("");

  const fetchRecorderByFarmer = async (farmerAddress: string) => {
    return readContract({
      contract: getContractByChainAndAddress(
        AppChainId.hempLedger,
        farmerRegistryFactoryContracts[0].address
      ),
      method:
        "function getRecorderByFarmer(address _farmer) external view returns (address)",
      params: [farmerAddress],
    });
  };

  const onFetchRecorderByFarmer = async (wallet: string) => {
    setIsLoading(true);
    const r = await fetchRecorderByFarmer(wallet);
    setRecorder(r);
    setIsLoading(false);
  };

  useEffect(() => {
    if (activeAccount) onFetchRecorderByFarmer(activeAccount.address);
  }, [activeAccount]);

  if (!activeAccount) return <></>;

  // --- handlers ---
  const handleMint = () => {
    const timestamp = new Date().toLocaleString();
    const newLog = `✅ Log verified at ${timestamp}: Rainfall=${rainfall}, Compost=${compost}, Irrigation=${irrigation}`;
    setLogs((prev) => [...prev, newLog]);
    alert("🎉 $ROOT minted (mock)!");
  };

  const handleFetchSatellite = () => {
    const timestamp = new Date().toLocaleString();
    const mockData = { dataset: "NDVI", lat: 47, lon: -65, value: 0.72, timestamp };
    setLogs((prev) => [
      ...prev,
      `🛰 Mock Satellite Data fetched at ${timestamp}: NDVI=${mockData.value}`,
    ]);
  };

  // NEW: pledge handler
  const handlePledgeLand = () => {
    const timestamp = new Date().toLocaleString();
    setLogs((prev) => [
      ...prev,
      `📜 Land pledged at ${timestamp}: pledge=${pledgeLand}, acreage=${acreage || "n/a"}, crop=${crop || "n/a"}`,
    ]);
    alert("✅ Land pledge recorded (mock)!");
  };

  // --- button enabled states ---
  const canMint = rainfall && compost && irrigation;
  const canPledge =
    pledgeLand && !!acreage && !isNaN(Number(acreage)) && Number(acreage) > 0;

  return (
    <div className="space-y-6 mt-6">
      <div>ManageActions</div>
      <div>{isLoading && "Loading ..."}</div>

      {/* registry logic */}
      {isAddress(recorder) && recorder !== ZERO_ADDRESS ? (
        <RegisterAction
          farmerAddress={activeAccount.address}
          farmerRegistry={recorder}
        />
      ) : (
        <CreateFarmerRegistry farmerAddress={activeAccount.address} />
      )}

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
        {/* LEFT: ROOT logs */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Pledge Your Land</h2>
          <p className="text-sm text-gray-400">
            Carbon Credit brokerage is the ultimate goal of Hempsat. Farmers can pledge land
            and receive $ROOT, backed by the community with real-world seed value.
          </p>

          <div className="flex flex-col space-y-2">
            <label className="inline-flex items-center gap-2">
              <input
                type="checkbox"
                checked={pledgeLand}
                onChange={() => setPledgeLand(!pledgeLand)}
              />
              <span>Pledge Land</span>
            </label>

            <label className="inline-flex items-center gap-2">
              <input
                type="checkbox"
                checked={rainfall}
                onChange={() => setRainfall(!rainfall)}
              />
              <span>Rainfall</span>
            </label>

            <label className="inline-flex items-center gap-2">
              <input
                type="checkbox"
                checked={compost}
                onChange={() => setCompost(!compost)}
              />
              <span>Compost</span>
            </label>

            <label className="inline-flex items-center gap-2">
              <input
                type="checkbox"
                checked={irrigation}
                onChange={() => setIrrigation(!irrigation)}
              />
              <span>Irrigation</span>
            </label>
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex flex-wrap gap-3 pt-2">
            {/* NEW: Pledge Land */}
            <button
              className={`px-4 py-2 rounded text-white ${
                canPledge
                  ? "bg-emerald-600 hover:bg-emerald-700"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
              disabled={!canPledge}
              onClick={handlePledgeLand}
              title={
                canPledge
                  ? "Record pledge"
                  : "Enable 'Pledge Land' and enter valid acreage"
              }
            >
              Pledge Land
            </button>

            {/* Existing: Mint $ROOT (requires all three checks) */}
            <button
              className={`px-4 py-2 rounded text-white ${
                canMint
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
              disabled={!canMint}
              onClick={handleMint}
            >
              Submit Log → Mint $ROOT
            </button>

            {/* Fetch Satellite */}
            <button
              className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white"
              onClick={handleFetchSatellite}
            >
              Fetch Satellite Data
            </button>
          </div>

          {/* Logs */}
          <div className="mt-4">
            <h3 className="font-semibold">Event Logs</h3>
            <ul className="list-disc list-inside">
              {logs.map((log, idx) => (
                <li key={idx}>{log}</li>
              ))}
            </ul>
          </div>

          {/* Root Redemption module */}
          <RootRedemption />
        </div>
      </div>
    </div>
  );
};
