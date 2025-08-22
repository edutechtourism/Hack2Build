import { Account } from "@/components/Account";
import { carbonCreditTokenContracts } from "@/contracts/contracts";
import { getContractByChainAndAddress } from "@/contracts/server";
import { AppChainId } from "@/contracts/settings";
import { readContract } from "thirdweb";

export default async function Page() {
  const tokenName = await readContract({
    contract: getContractByChainAndAddress(
      AppChainId.hempLedger,
      carbonCreditTokenContracts[0].address
    ),
    method: "function name() public view returns (string)",
    params: [],
  });

  return (
    <div>
      <div>Dashboard</div>
      <div>Token: {tokenName}</div>

      <Account />
    </div>
  );
}
