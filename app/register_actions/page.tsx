import { readContract } from "thirdweb";
import { RegisterAction } from "./_components/RegisterAction";
import { getContractByChainAndAddress } from "@/contracts/server";
import { AppChainId } from "@/contracts/settings";
import { farmerRegistryFactoryContracts } from "@/contracts/contracts";

export default async function Page() {
  const createdContractList = await readContract({
    contract: getContractByChainAndAddress(
      AppChainId.hempLedger,
      farmerRegistryFactoryContracts[0].address
    ),
    method:
      "function getCreatedContractList() external view returns ((address,address,uint256)[] memory)",
    params: [],
  });

  console.log(`createdContractList`, createdContractList);

  return (
    <div>
      <div>Register actions page</div>
      <RegisterAction />
    </div>
  );
}
