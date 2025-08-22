import { Account } from "@/components/Account";
import { WalletTokensBalance } from "@/components/WalletTokensBalance";
import { hempTokenContracts } from "@/contracts/contracts";
import { getContractByChainAndAddress } from "@/contracts/server";
import { AppChainId } from "@/contracts/settings";
import { isLoggedIn } from "@/server/login";
import { redirect } from "next/navigation";
import { readContract } from "thirdweb";

export default async function Page() {
  if (!(await isLoggedIn())) redirect("/");

  const tokenName = await readContract({
    contract: getContractByChainAndAddress(
      AppChainId.avalancheFuji,
      hempTokenContracts[0].address
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
