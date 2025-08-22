"use client";
import { getContractByChainAndAddress } from "@/contracts/client";
import { farmerRegistryFactoryContracts } from "@/contracts/contracts";
import { AppChainId } from "@/contracts/settings";
import { useEffect, useState } from "react";
import { isAddress, readContract, ZERO_ADDRESS } from "thirdweb";
import { useActiveAccount } from "thirdweb/react";
import { RegisterAction } from "./RegisterAction";

export const ManageActions = () => {
  const activeAccount = useActiveAccount();
  const [recorder, setRecorder] = useState("");
  const [isLoading, setIsLoading] = useState(true);

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

  useEffect(() => {
    if (activeAccount) {
      setIsLoading(true);
      fetchRecorderByFarmer(activeAccount.address).then((_) => {
        setRecorder(_);
        setIsLoading(false);
      });
    }
  }, [activeAccount]);

  if (!activeAccount) return <></>;

  return (
    <div>
      <div>ManageActions</div>
      <div>{isLoading && "Loading ..."}</div>
      <>
        {isAddress(recorder) && recorder !== ZERO_ADDRESS ? (
          <RegisterAction
            farmerAddress={activeAccount.address}
            farmerRegistry={recorder}
          />
        ) : (
          <div>Need a factory</div>
        )}
      </>
    </div>
  );
};
